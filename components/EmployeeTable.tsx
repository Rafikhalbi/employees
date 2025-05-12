import React from "react";
import { Employee } from "@/types/employee";
import { deleteEmployee, togglePaidStatus } from "@/../services/employeeService";
import { useRouter } from "next/navigation";

type Props = {
  data: Employee[];
  refetchData: () => void;
};

const EmployeeTable: React.FC<Props> = ({ data, refetchData }) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    refetchData();
  };

  const handleTogglePaidStatus = async (id: number, paidStatus: string) => {
    const newStatus = paidStatus === "paid" ? "unpaid" : "paid";
    await togglePaidStatus(id, newStatus);
    refetchData();
  };

  // const handleEdit = (id: number) => {
  //   router.push(`/edit/${id}`);
  // };
  // fvck this:(

  return (
    <table className="min-w-full bg-white border">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">No</th>
          <th className="p-2 border">Picture</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Position</th>
          <th className="p-2 border">Salary</th>
          <th className="p-2 border">Status paid</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((emp, index) => (
          <tr key={emp.id} className="text-center">
            <td className="p-2 border">{index + 1}</td>
            <td className="p-2 border">
              <img src={emp.picture} alt={emp.name} className="w-12 h-12 object-cover rounded-full mx-auto" />
            </td>
            <td className="p-2 border">{emp.name}</td>
            <td className="p-2 border">{emp.position}</td>
            <td className="p-2 border">${emp.salary.toLocaleString()}</td>
            <td className="p-2 border">{emp.paid_status}</td>
            <td className="p-2 border space-x-2">
              {/* Edit Button */}
              {/* <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => handleEdit(emp.id)}
              >
                Edit
              </button> */}
              {/* Toggle Paid Status */}
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleTogglePaidStatus(emp.id, emp.paid_status)}
              >
                {emp.paid_status === "paid" ? "Mark Unpaid" : "Mark Paid"}
              </button>
              {/* Delete Button */}
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(emp.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
