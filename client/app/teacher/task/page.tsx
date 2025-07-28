"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ClipboardList, Loader2 } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description?: string;
  category: string;
  status: string;
  dueDate?: string;
  createdAt: string;
}

export default function TeacherTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/teacher/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (taskId: string, status: string) => {
    try {
      await api.put(`/teacher/tasks/${taskId}/status`, { status });
      fetchTasks(); // refresh
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["teacher"]} redirectTo="/teacher/login">
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <ClipboardList className="w-7 h-7 text-green-600" />
          My Tasks
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-6 h-6 text-gray-400" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned yet.</p>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white p-5 rounded-xl border shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "started"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <p className="text-xs text-gray-500">
                  Category: {task.category} | Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="mt-3 flex gap-2">
                  {["assigned", "started", "completed"].map((s) => (
                    <button
                      key={s}
                      className={`px-3 py-1 text-xs rounded-md ${
                        task.status === s
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => updateStatus(task._id, s)}
                    >
                      Mark {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
