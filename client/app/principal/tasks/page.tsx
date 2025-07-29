"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { Trash } from "lucide-react";

export default function AssignTasks() {
  const [tasks, setTasks] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    category: "General",
    status: "assigned",
    dueDate: "",
  });

  const fetchTasks = async () => {
    const res = await api.get("principal/tasks");
    setTasks(res.data);
  };

  const fetchTeachers = async () => {
    const res = await api.get("principal/teachers"); // assumes this route returns teachers
    setTeachers(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("principal/tasks", form);
      setForm({
        title: "",
        description: "",
        assignedTo: "",
        category: "General",
        status: "assigned",
        dueDate: "",
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to assign task", err);
    }
  };

  const handleDelete = async (id: string) => {
    await api.delete(`principal/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
    fetchTeachers();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Assign Tasks to Teachers</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-xl space-y-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((t: any) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="assigned">Assigned</option>
          <option value="started">Started</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Assign Task</button>
      </form>

      {/* Task List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Task List</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th className="py-2">Assigned To</th>
              <th className="py-2">Status</th>
              <th className="py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any) => (
              <tr key={task._id} className="border-b">
                <td className="py-2">{task.title}</td>
                <td className="py-2">{task.assignedTo?.name || "Unknown"}</td>
                <td className="py-2">{task.status}</td>
                <td className="py-2 text-right">
                  <button onClick={() => handleDelete(task._id)} className="text-red-600 hover:text-red-800">
                    <Trash className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr><td colSpan={4} className="text-center text-gray-500 py-4">No tasks found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
