"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/utils/axios";
import { UserCheck } from "lucide-react";

interface AttendanceRecord {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  courseId: {
    name: string;
  };
  totalClasses: number;
  attendedClasses: number;
}

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/teacher/attendance");
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["teacher"]} redirectTo="/teacher/login">
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Attendance</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : records.length === 0 ? (
          <p className="text-red-500">No attendance records found.</p>
        ) : (
          <div className="space-y-4">
            {records.map((record) => {
              const percentage = ((record.attendedClasses / record.totalClasses) * 100).toFixed(1);
              return (
                <div key={record._id} className="bg-white p-6 rounded-xl shadow-sm border flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{record.userId.name}</p>
                    <p className="text-sm text-gray-600">{record.userId.email}</p>
                    <p className="text-sm text-gray-500">
                      Course: <span className="font-medium">{record.courseId.name}</span>
                    </p>
                    <p className="text-sm text-gray-700">
                      Attended: {record.attendedClasses}/{record.totalClasses} classes (
                      <span className="font-bold text-green-600">{percentage}%</span>)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
