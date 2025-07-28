"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BookOpen, Clock } from "lucide-react";

interface ClassItem {
  _id: string;
  course: {
    name: string;
  };
  time: string;
  room: string;
  date: string;
  students: {
    name: string;
  }[];
}

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/teacher/classes");
        setClasses(res.data);
      } catch (err) {
        console.error("Failed to fetch classes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["teacher"]} redirectTo="/teacher/login">
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Today's Classes</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : classes.length === 0 ? (
          <p className="text-red-500">No classes scheduled for today.</p>
        ) : (
          <div className="grid gap-6">
            {classes.map((cls) => (
              <div
                key={cls._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {cls.course?.name || "Unnamed Course"}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <p className="text-sm text-gray-700">{cls.time}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Room:</strong> {cls.room || "Not Assigned"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Students:</strong> {cls.students?.length || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
