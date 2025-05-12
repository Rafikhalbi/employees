import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addEmployee, updateEmployee } from "@/../services/employeeService";
import { Employee } from "@/types/employee";

export default function EmployeeForm({
  initialData,
  onSuccess,
  isEdit = false,
}: {
  initialData?: Partial<Employee>;
  onSuccess?: () => void;
  isEdit?: boolean;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    position: initialData?.position || "",
    salary: initialData?.salary || 0,
    paid_status: initialData?.paid_status || "unpaid",
    picture: null as File | null,
    existingPicture: initialData?.picture || "",
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData((prev) => ({
        ...prev,
        name: initialData.name || "",
        position: initialData.position || "",
        salary: initialData.salary || 0,
        paid_status: initialData.paid_status || "unpaid",
        existingPicture: initialData.picture || "",
      }));
    }
  }, [initialData, isEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        picture: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let picturePath = formData.existingPicture;

    if (formData.picture) {
      const uploadForm = new FormData();
      uploadForm.append("picture", formData.picture);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: uploadForm,
      });

      if (!uploadRes.ok) {
        alert("Failed to upload image");
        return;
      }

      const uploadData = await uploadRes.json();
      picturePath = uploadData.picturePath;
    }

    const employeePayload = {
      name: formData.name,
      position: formData.position,
      salary: formData.salary,
      paid_status: formData.paid_status,
      picture: picturePath,
    };

    try {
      if (isEdit && initialData?.id) {
        console.log("Updating employee with ID:", initialData.id);
        await updateEmployee(initialData.id, employeePayload);
      } else {
        console.log("Adding new employee");
        await addEmployee(employeePayload);
      }

      onSuccess ? onSuccess() : router.push("/");
    } catch (err) {
      console.error("Error in submitting form", err);
      alert("Failed to submit form");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md"
      encType="multipart/form-data"
    >
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full border p-2 rounded"
        required={!isEdit}
      />
      <input
        type="text"
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        className="w-full border p-2 rounded"
        required={!isEdit}
      />
      <input
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={(e) =>
          setFormData({
            ...formData,
            salary: parseFloat(e.target.value) || 0,
          })
        }
        className="w-full border p-2 rounded"
        required={!isEdit}
      />
      <select
        value={formData.paid_status}
        onChange={(e) =>
          setFormData({ ...formData, paid_status: e.target.value })
        }
        className="w-full border p-2 rounded"
      >
        <option value="unpaid">Unpaid</option>
        <option value="paid">Paid</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isEdit ? "Update User" : "Add User"}
      </button>
    </form>
  );
}
