"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBrowserClient } from "@/lib/supabase/client"

export default function AdminSetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const supabase = createBrowserClient()

  const createAdminUser = async () => {
    setStatus("loading")
    setMessage("")

    try {
      // Create the admin user
      const { data, error } = await supabase.auth.signUp({
        email: "admin@majstoric.com",
        password: "admin123",
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
          data: {
            role: "admin",
          },
        },
      })

      if (error) {
        // Check if user already exists
        if (error.message.includes("already registered")) {
          setStatus("error")
          setMessage("Admin user already exists. You can log in at /admin/login")
        } else {
          throw error
        }
      } else {
        setStatus("success")
        setMessage("Admin user created successfully! Email: admin@majstoric.com, Password: admin123")
      }
    } catch (error: any) {
      setStatus("error")
      setMessage(error.message || "Failed to create admin user")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Admin Setup</CardTitle>
          <CardDescription>Create the admin account for your Medulin apartments website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <p className="font-medium">Admin Credentials:</p>
            <div className="bg-muted p-3 rounded-md font-mono text-xs space-y-1">
              <div>Email: admin@majstoric.com</div>
              <div>Password: admin123</div>
            </div>
          </div>

          {status === "success" && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
              <AlertDescription className="text-green-800 dark:text-green-200">{message}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert className="border-destructive bg-destructive/10">
              <AlertDescription className="text-destructive">{message}</AlertDescription>
            </Alert>
          )}

          <Button onClick={createAdminUser} disabled={status === "loading" || status === "success"} className="w-full">
            {status === "loading" ? "Creating Admin User..." : "Create Admin User"}
          </Button>

          {status === "success" && (
            <Button onClick={() => (window.location.href = "/admin/login")} variant="outline" className="w-full">
              Go to Login
            </Button>
          )}

          <p className="text-xs text-muted-foreground text-center">
            This page can only be used once to create the admin account. After creation, please log in at /admin/login
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
