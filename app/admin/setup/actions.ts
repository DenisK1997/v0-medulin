"use server"

import { createAdminClient } from "@/lib/supabase/server"

export async function createAdminUser() {
  try {
    const supabase = await createAdminClient()

    const { data, error } = await supabase.auth.admin.createUser({
      email: "admin@majstoric.com",
      password: "admin123",
      email_confirm: true,
      user_metadata: {
        role: "admin",
      },
    })

    if (error) {
      // Check if user already exists
      if (error.message.includes("already registered") || error.message.includes("already exists")) {
        return {
          success: false,
          message: "Admin user already exists. You can log in at /admin/login",
        }
      }
      throw error
    }

    return {
      success: true,
      message: "Admin user created successfully! Email: admin@majstoric.com, Password: admin123",
    }
  } catch (error: any) {
    console.error("[v0] Admin user creation error:", error)
    return {
      success: false,
      message: error.message || "Failed to create admin user",
    }
  }
}
