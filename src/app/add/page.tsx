"use client"

import React from "react"
import EmployeeForm from "@/../components/EmployeeForm"

export default function AddUserPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <EmployeeForm />
    </div>
  )
}
