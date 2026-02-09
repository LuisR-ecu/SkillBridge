import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { UpskillStep } from "@/lib/types"
import { BookOpen, Clock, DollarSign, Flag } from "lucide-react"

interface UpskillingTabProps {
  upskillPlan: UpskillStep[]
}

export function UpskillingTab({ upskillPlan }: UpskillingTabProps) {
  const totalWeeks = upskillPlan.reduce((sum, step) => sum + step.estimatedWeeks, 0)

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Estimated Timeline</p>
              <p className="text-2xl font-bold text-foreground">{totalWeeks} weeks</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Phases</p>
              <p className="text-2xl font-bold text-foreground">{upskillPlan.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" aria-hidden="true" />

        <div className="grid gap-6">
          {upskillPlan.map((step, i) => (
            <div key={i} className="relative flex gap-4">
              <div
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold"
                aria-label={`Phase ${step.phase}`}
              >
                {step.phase}
              </div>
              <Card className="flex-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{step.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {step.estimatedWeeks} weeks
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {step.estimatedCost}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <p className="text-sm leading-relaxed">{step.description}</p>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                      Target Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                      Resources
                    </p>
                    <ul className="grid gap-1">
                      {step.resources.map((resource, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-2 rounded-md bg-muted/50 p-3">
                    <Flag className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
                        Milestone
                      </p>
                      <p className="text-sm leading-relaxed">{step.milestone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
