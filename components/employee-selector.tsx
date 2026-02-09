"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { employees } from "@/lib/employees"

interface EmployeeSelectorProps {
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export function EmployeeSelector({ value, onValueChange, disabled }: EmployeeSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full md:w-80 bg-card text-card-foreground">
        <SelectValue placeholder="Select an employee to analyze" />
      </SelectTrigger>
      <SelectContent>
        {employees.map((emp) => (
          <SelectItem key={emp.id} value={emp.id}>
            <span className="font-medium">{emp.name}</span>
            <span className="ml-2 text-muted-foreground">
              {" -- "}{emp.currentRole}, {emp.department}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
