import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Employee } from "@/lib/employees"
import { Briefcase, GraduationCap, Star, Clock, Target } from "lucide-react"

interface EmployeeProfileProps {
  employee: Employee
}

export function EmployeeProfile({ employee }: EmployeeProfileProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{employee.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {employee.currentRole} -- {employee.department}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-primary">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-sm font-semibold">{employee.performanceRating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{employee.yearsAtCompany} years at company</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span>{employee.educationLevel}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="h-4 w-4 shrink-0" />
            <span>{employee.certifications.length} certification{employee.certifications.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {employee.skills.map((skill) => (
              <Badge key={skill.name} variant="secondary" className="text-xs font-normal">
                {skill.name}
                <span className="ml-1 text-muted-foreground">({skill.level})</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-md bg-muted/50 p-3">
          <Target className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">Career Goals</p>
            <p className="text-sm leading-relaxed">{employee.careerGoals}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
