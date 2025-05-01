import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ZodError } from "zod"

export interface ApiErrorResponse {
  error: string
  details?: Record<string, string[]>
}

export const withValidation = <T>(
  handler: (req: NextRequest, data: T) => Promise<NextResponse>,
  schema: any
) => {
  return async (req: NextRequest) => {
    try {
      const body = await req.json()
      const data = schema.parse(body)
      return await handler(req, data)
    } catch (error) {
      if (error instanceof ZodError) {
        const details: Record<string, string[]> = {}
        error.errors.forEach((err) => {
          const path = err.path.join(".")
          if (!details[path]) {
            details[path] = []
          }
          details[path].push(err.message)
        })
        
        return NextResponse.json(
          {
            error: "Validation error",
            details,
          } as ApiErrorResponse,
          { status: 400 }
        )
      }

      console.error("API Error:", error)
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      )
    }
  }
}

export const withErrorHandler = (
  handler: (req: NextRequest) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error("API Error:", error)
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      )
    }
  }
}
