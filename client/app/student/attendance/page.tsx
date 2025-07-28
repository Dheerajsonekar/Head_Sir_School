"use client";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import { Calendar } from "lucide-react";

interface AttendanceRecord {
  courseTitle: string;
  total: number;
  attended: number;
  percentage: string;
}

export default function StudentAttendancePage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/student/attendance");
        setRecords(res.data.attendance || []);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['student']} redirectTo="/student/login">
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6">My Attendance</h1>

        {loading ? (
          <p className="text-gray-500">Loading attendance...</p>
        ) : records.length === 0 ? (
          <p className="text-gray-500">No attendance records found.</p>
        ) : (
          <div className="space-y-4">
            {records.map((record, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{record.courseTitle}</p>
                    <p className="text-sm text-gray-600">Classes: {record.attended}/{record.total}</p>
                  </div>
                </div>
                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  parseFloat(record.percentage) >= 75 ? "bg-green-100 text-green-700"
                  : parseFloat(record.percentage) >= 50 ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
                }`}>
                  {record.percentage === "N/A" ? "N/A" : `${record.percentage}%`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
