import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { AnalysisResult } from "@/lib/types"
import { ScrollText, ShieldCheck, Lock, Info } from "lucide-react"

interface GovernanceTabProps {
  governance: AnalysisResult["governance"]
}

export function GovernanceTab({ governance }: GovernanceTabProps) {
  return (
    <div className="grid gap-6">
      {/* Decision Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Decision Audit Log</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Chronological record of reasoning steps taken by the AI agent during analysis.
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
            <div className="grid gap-4">
              {governance.decisionLog.map((entry, i) => (
                <div key={i} className="relative flex gap-3">
                  <div className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-primary bg-card" />
                  <div className="flex-1">
                    <p className="font-mono text-xs text-muted-foreground">{entry.timestamp}</p>
                    <p className="text-sm font-medium mt-0.5">{entry.action}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{entry.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bias & Fairness */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <CardTitle className="text-base">Bias & Fairness Checks</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Safeguards applied to ensure equitable and unbiased recommendations.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3">
              {governance.biasChecks.map((check, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <p className="text-sm leading-relaxed">{check}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Privacy Safeguards */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Data Privacy Safeguards</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Measures ensuring sensitive employee data is protected throughout the analysis.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3">
              {governance.privacySafeguards.map((safeguard, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Lock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed">{safeguard}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Model Disclosure */}
      <Card className="bg-muted/30 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold mb-1">AI Model Disclosure</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {governance.modelDisclosure}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
