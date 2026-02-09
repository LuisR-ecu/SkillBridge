export interface RoleRecommendation {
  roleName: string
  department: string
  matchScore: number
  verdict: "recommended" | "rejected"
  rationale: string
  alignedSkills: string[]
  gapSkills: string[]
  transitionFeasibility: string
}

export interface SkillGap {
  skill: string
  currentLevel: string
  requiredLevel: string
  gapSeverity: "low" | "medium" | "high"
  explanation: string
}

export interface UpskillStep {
  phase: number
  title: string
  description: string
  skills: string[]
  estimatedWeeks: number
  estimatedCost: string
  resources: string[]
  milestone: string
}

export interface GovernanceLog {
  timestamp: string
  action: string
  detail: string
}

export interface AnalysisResult {
  employeeId: string
  employeeName: string
  currentRole: string
  recommendations: RoleRecommendation[]
  skillGaps: SkillGap[]
  upskillPlan: UpskillStep[]
  governance: {
    decisionLog: GovernanceLog[]
    biasChecks: string[]
    privacySafeguards: string[]
    modelDisclosure: string
  }
}
