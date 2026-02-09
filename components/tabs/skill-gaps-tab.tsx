import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SkillGap } from "@/lib/types"
import { AlertTriangle, ArrowRight } from "lucide-react"

interface SkillGapsTabProps {
  skillGaps: SkillGap[]
}

const severityConfig = {
  low: { label: "Low", className: "bg-chart-2/15 text-accent border-accent/30" },
  medium: { label: "Medium", className: "bg-chart-5/15 text-chart-5 border-chart-5/30" },
  high: { label: "High", className: "bg-destructive/15 text-destructive border-destructive/30" },
}

export function SkillGapsTab({ skillGaps }: SkillGapsTabProps) {
  const sortedGaps = [...skillGaps].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.gapSeverity] - order[b.gapSeverity]
  })

  const highCount = sortedGaps.filter((g) => g.gapSeverity === "high").length
  const mediumCount = sortedGaps.filter((g) => g.gapSeverity === "medium").length
  const lowCount = sortedGaps.filter((g) => g.gapSeverity === "low").length

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6 pb-4">
            <p className="text-2xl font-bold text-destructive">{highCount}</p>
            <p className="text-xs text-muted-foreground mt-1">High Severity</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6 pb-4">
            <p className="text-2xl font-bold text-chart-5">{mediumCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Medium Severity</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6 pb-4">
            <p className="text-2xl font-bold text-accent">{lowCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Low Severity</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3">
        {sortedGaps.map((gap, i) => {
          const config = severityConfig[gap.gapSeverity]
          return (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 grid gap-2">
                    <div className="flex items-center gap-2">
                      {gap.gapSeverity === "high" && (
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                      )}
                      <h4 className="font-medium text-sm">{gap.skill}</h4>
                      <Badge variant="outline" className={`text-xs ${config.className}`}>
                        {config.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{gap.currentLevel}</span>
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      <span className="font-mono text-xs bg-primary/10 px-1.5 py-0.5 rounded text-primary">{gap.requiredLevel}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{gap.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
