"use server"

import { generateText, Output } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { employees } from "@/lib/employees"
import type { AnalysisResult } from "@/lib/types"

const toNonEmptyString = (value: unknown, fallback: string): string => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim()
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }

  return fallback
}

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => toNonEmptyString(item, "")).filter(Boolean)
  }

  if (typeof value === "string") {
    return value
      .split(/[\n,;]+/g)
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

const toNumber = (value: unknown, fallback: number): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string") {
    const normalized = value.replace(/[^\d.-]/g, "")
    const parsed = Number.parseFloat(normalized)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return fallback
}

const toScore = (value: unknown): number => {
  const rounded = Math.round(toNumber(value, 0))
  return Math.min(100, Math.max(0, rounded))
}

const toVerdict = (value: unknown): "recommended" | "rejected" => {
  const normalized = toNonEmptyString(value, "").toLowerCase()
  if (
    normalized.includes("reject") ||
    normalized.includes("not fit") ||
    normalized.includes("not recommended") ||
    normalized.includes("decline")
  ) {
    return "rejected"
  }

  return "recommended"
}

const toGapSeverity = (value: unknown): "low" | "medium" | "high" => {
  const normalized = toNonEmptyString(value, "").toLowerCase()

  if (
    normalized.includes("high") ||
    normalized.includes("critical") ||
    normalized.includes("severe")
  ) {
    return "high"
  }

  if (normalized.includes("low") || normalized.includes("minor")) {
    return "low"
  }

  return "medium"
}

const analysisSchema = z.preprocess((value) => {
  if (value && typeof value === "object") {
    return value
  }

  return {}
}, z.object({
  recommendations: z.array(
    z.object({
      roleName: z.preprocess((v) => toNonEmptyString(v, "Recommended Role"), z.string()),
      department: z.preprocess((v) => toNonEmptyString(v, "General"), z.string()),
      matchScore: z.preprocess((v) => toScore(v), z.number().int().min(0).max(100)),
      verdict: z.preprocess((v) => toVerdict(v), z.enum(["recommended", "rejected"])),
      rationale: z.preprocess((v) => toNonEmptyString(v, "No rationale provided."), z.string()),
      alignedSkills: z.preprocess((v) => toStringArray(v), z.array(z.string())),
      gapSkills: z.preprocess((v) => toStringArray(v), z.array(z.string())),
      transitionFeasibility: z.preprocess((v) => toNonEmptyString(v, "Needs further assessment."), z.string()),
    })
  ).default([]),
  skillGaps: z.array(
    z.object({
      skill: z.preprocess((v) => toNonEmptyString(v, "Unspecified skill"), z.string()),
      currentLevel: z.preprocess((v) => toNonEmptyString(v, "Current"), z.string()),
      requiredLevel: z.preprocess((v) => toNonEmptyString(v, "Target"), z.string()),
      gapSeverity: z.preprocess((v) => toGapSeverity(v), z.enum(["low", "medium", "high"])),
      explanation: z.preprocess((v) => toNonEmptyString(v, "No explanation provided."), z.string()),
    })
  ).default([]),
  upskillPlan: z.array(
    z.object({
      phase: z.preprocess((v) => Math.max(1, Math.round(toNumber(v, 1))), z.number().int().min(1)),
      title: z.preprocess((v) => toNonEmptyString(v, "Upskilling Phase"), z.string()),
      description: z.preprocess((v) => toNonEmptyString(v, "Description not provided."), z.string()),
      skills: z.preprocess((v) => toStringArray(v), z.array(z.string())),
      estimatedWeeks: z.preprocess((v) => Math.max(1, Math.round(toNumber(v, 4))), z.number().int().min(1)),
      estimatedCost: z.preprocess((v) => toNonEmptyString(v, "TBD"), z.string()),
      resources: z.preprocess((v) => toStringArray(v), z.array(z.string())),
      milestone: z.preprocess((v) => toNonEmptyString(v, "Milestone not specified."), z.string()),
    })
  ).default([]),
  governance: z.object({
    decisionLog: z.array(
      z.object({
        timestamp: z.preprocess((v) => toNonEmptyString(v, new Date().toISOString()), z.string()),
        action: z.preprocess((v) => toNonEmptyString(v, "Analysis step"), z.string()),
        detail: z.preprocess((v) => toNonEmptyString(v, "No details provided."), z.string()),
      })
    ).default([]),
    biasChecks: z.preprocess((v) => toStringArray(v), z.array(z.string())).default([]),
    privacySafeguards: z.preprocess((v) => toStringArray(v), z.array(z.string())).default([]),
    modelDisclosure: z.preprocess(
      (v) =>
        toNonEmptyString(
          v,
          "This AI output is advisory and should support, not replace, human decision-making."
        ),
      z.string()
    ),
  }).default({
    decisionLog: [],
    biasChecks: [],
    privacySafeguards: [],
    modelDisclosure:
      "This AI output is advisory and should support, not replace, human decision-making.",
  }),
}))

export async function analyzeEmployee(employeeId: string): Promise<AnalysisResult> {
  const employee = employees.find((e) => e.id === employeeId)
  if (!employee) {
    throw new Error("Employee not found")
  }

  const skillsSummary = employee.skills
    .map((s) => `${s.name} (${s.level}, ${s.yearsOfExperience}yr)`)
    .join(", ")

  const prompt = `You are an enterprise HR talent optimization AI agent. Your role is to analyze an employee's profile and recommend internal mobility opportunities. You provide transparent, explainable recommendations backed by structured reasoning.

EMPLOYEE PROFILE:
- Name: ${employee.name}
- Current Role: ${employee.currentRole}
- Department: ${employee.department}
- Years at Company: ${employee.yearsAtCompany}
- Education: ${employee.educationLevel}
- Performance Rating: ${employee.performanceRating}/5.0
- Certifications: ${employee.certifications.join(", ")}
- Skills: ${skillsSummary}
- Career Goals: ${employee.careerGoals}

INSTRUCTIONS:
1. Recommend exactly 2 internal roles this employee would be a strong candidate for, and 1 role that should be explicitly REJECTED (not a fit). For each, provide a match score (0-100), a clear rationale, aligned skills, gap skills, and a transition feasibility assessment.

2. For the recommended roles, identify all specific skill gaps with current vs. required levels, gap severity, and explanation.

3. Create a time-sequenced upskilling plan with 3-4 phases that closes the identified skill gaps. Each phase should have estimated weeks, estimated cost (realistic ranges), specific resources (courses, mentorships, projects), and a clear milestone.

4. Provide governance data:
   - A decision log with 4-6 entries describing the reasoning steps taken (use ISO timestamps starting from today's date)
   - 3-4 specific bias and fairness checks performed (e.g., "Verified recommendations are based solely on skill alignment and not influenced by demographic attributes")
   - 3-4 data privacy safeguards (e.g., "Age, gender, ethnicity, and disability status excluded from analysis inputs")
   - A model disclosure statement explaining that this AI provides interpretive analysis to support human decision-makers, not replace them

Return the analysis as structured JSON and use strict value formats:
- matchScore and estimatedWeeks must be numbers (not strings)
- verdict must be exactly "recommended" or "rejected"
- gapSeverity must be exactly "low", "medium", or "high"
Be specific, realistic, and professional. The recommendations should reflect genuine workforce mobility patterns in large enterprises.`

  const { output } = await generateText({
    model: openai("gpt-4o-mini"),
    output: Output.object({
      name: "employee_mobility_analysis",
      description: "Internal mobility recommendations, skill gaps, upskilling plan, and governance details.",
      schema: analysisSchema,
    }),
    prompt,
    temperature: 0.2,
    maxOutputTokens: 4000,
  })

  if (!output) {
    throw new Error("Failed to generate analysis")
  }

  return {
    employeeId: employee.id,
    employeeName: employee.name,
    currentRole: employee.currentRole,
    ...output,
  }
}
