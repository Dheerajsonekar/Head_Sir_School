"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/utils/axios";
import { GraduationCap } from "lucide-react";

interface Student {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/teacher/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["teacher"]} redirectTo="/teacher/login">
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Students</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-red-500">No students found.</p>
        ) : (
          <div className="grid gap-4">
            {students.map((student) => (
              <div key={student._id} className="bg-white border rounded-xl p-6 shadow-sm flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{student.name}</p>
                  <p className="text-gray-600 text-sm">{student.email}</p>
                  <p className="text-xs text-gray-500">Joined on {new Date(student.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
