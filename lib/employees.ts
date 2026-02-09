export interface Employee {
  id: string
  name: string
  currentRole: string
  department: string
  yearsAtCompany: number
  skills: Skill[]
  certifications: string[]
  educationLevel: string
  performanceRating: number
  careerGoals: string
}

export interface Skill {
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  yearsOfExperience: number
}

export const employees: Employee[] = [
  {
    id: "emp-001",
    name: "Sarah Chen",
    currentRole: "Senior Data Analyst",
    department: "Business Intelligence",
    yearsAtCompany: 4,
    skills: [
      { name: "SQL", level: "expert", yearsOfExperience: 6 },
      { name: "Python", level: "advanced", yearsOfExperience: 4 },
      { name: "Tableau", level: "expert", yearsOfExperience: 5 },
      { name: "Statistical Analysis", level: "advanced", yearsOfExperience: 4 },
      { name: "Data Modeling", level: "intermediate", yearsOfExperience: 2 },
      { name: "Stakeholder Communication", level: "advanced", yearsOfExperience: 4 },
    ],
    certifications: ["Google Data Analytics Professional", "Tableau Desktop Specialist"],
    educationLevel: "M.S. Statistics",
    performanceRating: 4.5,
    careerGoals: "Transition into a machine learning or data science leadership role",
  },
  {
    id: "emp-002",
    name: "Marcus Johnson",
    currentRole: "Product Marketing Manager",
    department: "Marketing",
    yearsAtCompany: 6,
    skills: [
      { name: "Go-to-Market Strategy", level: "expert", yearsOfExperience: 8 },
      { name: "Market Research", level: "advanced", yearsOfExperience: 6 },
      { name: "Content Strategy", level: "advanced", yearsOfExperience: 5 },
      { name: "Cross-functional Collaboration", level: "expert", yearsOfExperience: 7 },
      { name: "Data-Driven Decision Making", level: "intermediate", yearsOfExperience: 3 },
      { name: "Budget Management", level: "intermediate", yearsOfExperience: 3 },
    ],
    certifications: ["HubSpot Inbound Marketing", "Google Analytics Certified"],
    educationLevel: "MBA",
    performanceRating: 4.2,
    careerGoals: "Move into a general management or strategy role within the organization",
  },
  {
    id: "emp-003",
    name: "Priya Patel",
    currentRole: "Software Engineer II",
    department: "Engineering",
    yearsAtCompany: 3,
    skills: [
      { name: "React", level: "advanced", yearsOfExperience: 4 },
      { name: "TypeScript", level: "advanced", yearsOfExperience: 3 },
      { name: "Node.js", level: "advanced", yearsOfExperience: 4 },
      { name: "System Design", level: "intermediate", yearsOfExperience: 2 },
      { name: "CI/CD", level: "intermediate", yearsOfExperience: 2 },
      { name: "Agile/Scrum", level: "advanced", yearsOfExperience: 3 },
    ],
    certifications: ["AWS Cloud Practitioner"],
    educationLevel: "B.S. Computer Science",
    performanceRating: 4.0,
    careerGoals: "Grow into a senior engineering or technical architect position",
  },
  {
    id: "emp-004",
    name: "David Kim",
    currentRole: "HR Business Partner",
    department: "Human Resources",
    yearsAtCompany: 5,
    skills: [
      { name: "Employee Relations", level: "expert", yearsOfExperience: 7 },
      { name: "Talent Development", level: "advanced", yearsOfExperience: 5 },
      { name: "Organizational Design", level: "intermediate", yearsOfExperience: 3 },
      { name: "Change Management", level: "advanced", yearsOfExperience: 4 },
      { name: "HRIS Systems", level: "intermediate", yearsOfExperience: 3 },
      { name: "Data Analysis", level: "beginner", yearsOfExperience: 1 },
    ],
    certifications: ["SHRM-CP", "Prosci Change Management Practitioner"],
    educationLevel: "M.A. Organizational Psychology",
    performanceRating: 4.3,
    careerGoals: "Lead a people analytics or workforce strategy function",
  },
  {
    id: "emp-005",
    name: "Elena Rodriguez",
    currentRole: "Financial Analyst",
    department: "Finance",
    yearsAtCompany: 2,
    skills: [
      { name: "Financial Modeling", level: "advanced", yearsOfExperience: 4 },
      { name: "Excel/VBA", level: "expert", yearsOfExperience: 5 },
      { name: "Forecasting", level: "advanced", yearsOfExperience: 3 },
      { name: "Accounting Principles", level: "advanced", yearsOfExperience: 4 },
      { name: "Presentation Skills", level: "intermediate", yearsOfExperience: 2 },
      { name: "Python", level: "beginner", yearsOfExperience: 1 },
    ],
    certifications: ["CFA Level II Candidate"],
    educationLevel: "B.S. Finance, Minor in Economics",
    performanceRating: 3.9,
    careerGoals: "Transition into corporate strategy, FP&A leadership, or a fintech product role",
  },
]
