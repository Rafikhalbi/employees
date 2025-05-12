import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addEmployee = async (employee: {
  name: string;
  salary: number;
  paid_status: string;
  position?: string;
  picture?: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/add_user`, employee);
    return response.data;
  } catch (err) {
    console.error("Failed to add employee:", err);
    throw err;
  }
};

export const updateEmployee = async (
  id: number,
  employee: {
    name?: string;
    salary?: number;
    paid_status?: string;
    position?: string;
    picture?: string;
  }
) => {
  try {
    const cleanData = Object.fromEntries(
      Object.entries(employee).filter(
        ([_, v]) => v !== undefined && v !== null && v !== ""
      )
    );

    const response = await axios.put(`${API_URL}/edit_user`, {
      id,
      ...cleanData,
    });

    return response.data;
  } catch (err) {
    console.error("Failed to update employee:", err);
    throw err;
  }
};


export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/fetchall`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch employees:", err);
    throw err;
  }
};

export const getEmployee = async (id: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/get_user/${id}`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch employee:", err);
    throw err;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/delete_user`, {
      data: { id },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to delete employee:", err);
    throw err;
  }
};

export const togglePaidStatus = async (id: number, paid_status: string) => {
  try {
    const response = await axios.put(`${API_URL}/edit_user`, {
      id,
      paid_status,
    });
    return response.data;
  } catch (err) {
    console.error("Failed to toggle paid status:", err);
    throw err;
  }
};
