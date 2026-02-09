"use client"

import { useState, useTransition } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { EmployeeSelector } from "@/components/employee-selector"
import { EmployeeProfile } from "@/components/employee-profile"
import { RecommendationsTab } from "@/components/tabs/recommendations-tab"
import { SkillGapsTab } from "@/components/tabs/skill-gaps-tab"
import { UpskillingTab } from "@/components/tabs/upskilling-tab"
import { GovernanceTab } from "@/components/tabs/governance-tab"
import { analyzeEmployee } from "@/app/actions/analyze"
import { employees } from "@/lib/employees"
import type { AnalysisResult } from "@/lib/types"
import { Loader2, Sparkles, BarChart3, BookOpen, ShieldCheck, BrainCircuit } from "lucide-react"

export function Dashboard() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId)

  function handleAnalyze() {
    if (!selectedEmployeeId) return
    setError(null)
    startTransition(async () => {
      try {
        const result = await analyzeEmployee(selectedEmployeeId)
        setAnalysis(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Analysis failed. Please try again.")
        setAnalysis(null)
      }
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BrainCircuit className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-foreground">SkillBridge AI</h1>
                <p className="text-xs text-muted-foreground">Talent Optimization Agent</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>AI-Assisted Decision Support</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {/* Page Title */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-balance">Internal Mobility Analysis</h2>
            <p className="text-muted-foreground mt-1 leading-relaxed max-w-2xl">
              Select an employee profile below to generate AI-powered role recommendations, identify skill gaps, and create a personalized upskilling roadmap. All recommendations include full explainability and governance documentation.
            </p>
          </div>

          {/* Employee Selection */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="grid gap-2 w-full sm:w-auto">
              <label htmlFor="employee-select" className="text-sm font-medium text-foreground">
                Employee Profile
              </label>
              <EmployeeSelector
                value={selectedEmployeeId}
                onValueChange={(val) => {
                  setSelectedEmployeeId(val)
                  setAnalysis(null)
                  setError(null)
                }}
                disabled={isPending}
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={!selectedEmployeeId || isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>

          {/* Employee Profile Card */}
          {selectedEmployee && <EmployeeProfile employee={selectedEmployee} />}

          {/* Error State */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isPending && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-muted" />
                <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Analyzing employee profile</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The AI agent is evaluating skills, role alignment, and generating recommendations...
                </p>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && !isPending && (
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="w-full justify-start h-auto flex-wrap gap-1 bg-muted/50 p-1">
                <TabsTrigger value="recommendations" className="gap-1.5 data-[state=active]:bg-card">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Role Recommendations</span>
                  <span className="sm:hidden">Roles</span>
                </TabsTrigger>
                <TabsTrigger value="skill-gaps" className="gap-1.5 data-[state=active]:bg-card">
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">Skill Gap Analysis</span>
                  <span className="sm:hidden">Gaps</span>
                </TabsTrigger>
                <TabsTrigger value="upskilling" className="gap-1.5 data-[state=active]:bg-card">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Upskilling Roadmap</span>
                  <span className="sm:hidden">Upskill</span>
                </TabsTrigger>
                <TabsTrigger value="governance" className="gap-1.5 data-[state=active]:bg-card">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Explainability & Governance</span>
                  <span className="sm:hidden">Governance</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="mt-6">
                <RecommendationsTab recommendations={analysis.recommendations} />
              </TabsContent>

              <TabsContent value="skill-gaps" className="mt-6">
                <SkillGapsTab skillGaps={analysis.skillGaps} />
              </TabsContent>

              <TabsContent value="upskilling" className="mt-6">
                <UpskillingTab upskillPlan={analysis.upskillPlan} />
              </TabsContent>

              <TabsContent value="governance" className="mt-6">
                <GovernanceTab governance={analysis.governance} />
              </TabsContent>
            </Tabs>
          )}

          {/* Empty State */}
          {!selectedEmployeeId && !isPending && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <BrainCircuit className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Select an Employee</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                Choose an employee profile from the dropdown above to begin the AI-powered talent optimization analysis.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>SkillBridge AI -- Enterprise Talent Optimization Platform</p>
            <p>AI-generated recommendations are advisory only. Final decisions require human review and approval.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
