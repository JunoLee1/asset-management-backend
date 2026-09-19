declare global {
  namespace Express {
    interface User {
      id: string
      email: string
      name: string
      role: import('../generated/prisma/enums').Role
      isOutOfOffice: boolean
      teamId: string | null
      teamName: string | null
      departmentId: string | null
      departmentName: string | null
    }
  }
}

export {}
