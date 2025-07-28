"use client";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import { FileText } from "lucide-react";

interface Result {
  _id: string;
  assignmentName: string;
  grade: string;
  date: string;
  courseId: {
    title: string;
  };
}

export default function StudentResultsPage() {
  const { user } = useAuth();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get("/student/results");
        setResults(res.data.results || []);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['student']} redirectTo="/student/login">
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6">My Results</h1>

        {loading ? (
          <p className="text-gray-500">Loading results...</p>
        ) : results.length === 0 ? (
          <p className="text-gray-500">No results found.</p>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result._id} className="bg-white border rounded-lg shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{result.assignmentName}</p>
                    <p className="text-sm text-gray-600">Course: {result.courseId?.title}</p>
                    <p className="text-xs text-gray-500">Date: {new Date(result.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                  result.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {result.grade}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
