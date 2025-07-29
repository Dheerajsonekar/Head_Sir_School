"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { Trash } from "lucide-react";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const fetchStudents = async () => {
    try {
      const res = await api.get("principal/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("principal/students", formData);
      setFormData({ name: "", email: "", password: "" });
      fetchStudents();
    } catch (err) {
      console.error("Create error", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`principal/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Manage Students</h1>

      {/* Add Student Form */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow mb-6 max-w-md space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Add New Student</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Student
        </button>
      </form>

      {/* Student List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Student List</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: any) => (
              <tr key={student._id} className="border-b">
                <td className="py-2">{student.name}</td>
                <td className="py-2">{student.email}</td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
