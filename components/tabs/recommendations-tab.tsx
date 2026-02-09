import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import type { RoleRecommendation } from "@/lib/types"
import { CheckCircle2, XCircle, ArrowRight, TrendingUp } from "lucide-react"

interface RecommendationsTabProps {
  recommendations: RoleRecommendation[]
}

export function RecommendationsTab({ recommendations }: RecommendationsTabProps) {
  const recommended = recommendations.filter((r) => r.verdict === "recommended")
  const rejected = recommendations.filter((r) => r.verdict === "rejected")

  return (
    <div className="grid gap-6">
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
          Recommended Roles
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {recommended.map((rec, i) => (
            <Card key={i} className="border-l-4 border-l-accent">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <CardTitle className="text-base">{rec.roleName}</CardTitle>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">Match {rec.matchScore}%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.department}</p>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <p className="text-sm leading-relaxed">{rec.rationale}</p>
                </div>
                <Separator />
                <div className="grid gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                      Match Score
                    </p>
                    <Progress value={rec.matchScore} className="h-2" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                      Aligned Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.alignedSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {rec.gapSkills.length > 0 && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                        Skills to Develop
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.gapSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs font-normal border-destructive/40 text-destructive">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex items-start gap-2 rounded-md bg-muted/50 p-3">
                  <TrendingUp className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
                      Transition Feasibility
                    </p>
                    <p className="text-sm leading-relaxed">{rec.transitionFeasibility}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {rejected.length > 0 && (
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Not Recommended
          </h3>
          {rejected.map((rec, i) => (
            <Card key={i} className="border-l-4 border-l-destructive bg-destructive/5">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <CardTitle className="text-base">{rec.roleName}</CardTitle>
                  </div>
                  <Badge variant="destructive">Match {rec.matchScore}%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.department}</p>
              </CardHeader>
              <CardContent className="grid gap-3">
                <p className="text-sm leading-relaxed">{rec.rationale}</p>
                {rec.gapSkills.length > 0 && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                      Critical Gaps
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.gapSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs font-normal border-destructive/40 text-destructive">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2 rounded-md bg-muted/50 p-3">
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{rec.transitionFeasibility}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
