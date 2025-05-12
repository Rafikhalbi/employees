'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getEmployee } from '@/../services/employeeService'
import EmployeeForm from '@/../components/EmployeeForm'
import { Employee } from '@/types/employee'

export default function EditPage() {
  const { id } = useParams()
  const [initialData, setInitialData] = useState<Employee | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployee(id as string)
      setInitialData(data)
    }
    fetchData()
  }, [id])

  if (!initialData) return <p>Loading...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Edit Employee</h1>
      <EmployeeForm
        initialData={initialData}
        isEdit={true}
        onSuccess={() => window.location.href = '/'}
      />
    </div>
  )
}
