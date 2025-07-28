"use client";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { BookOpen } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";

interface Course {
  _id: string;
  title: string;
  code: string;
  description?: string;
}

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/student/courses");
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['student']} redirectTo="/student/login">
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>

        {loading ? (
          <p className="text-gray-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">No enrolled courses found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
                    <p className="text-sm text-gray-600">{course.code}</p>
                  </div>
                </div>
                {course.description && (
                  <p className="text-sm text-gray-700 mt-4">{course.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
