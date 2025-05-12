"use client"
import React, { useEffect, useState } from "react"
import { fetchEmployees } from "@/../services/employeeService"
import EmployeeTable from "@/../components/EmployeeTable"
import Link from "next/link"

const Home: React.FC = () => {
  const [employees, setEmployees] = useState([]);

  const refetchData = async () => {
    const data = await fetchEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    refetchData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Employee Management</h1>
      <Link href="/add">
        <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
          + Add User
        </button>
      </Link>
      <EmployeeTable data={employees} refetchData={refetchData} />
    </main>
  );
};

export default Home;
