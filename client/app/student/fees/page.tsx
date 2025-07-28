"use client";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import { DollarSign } from "lucide-react";

interface Fee {
  _id: string;
  amountDue: number;
  dueDate: string;
  isPaid: boolean;
}

export default function StudentFeesPage() {
  const { user } = useAuth();
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await api.get("/student/fees");
        setFees(res.data.fees || []);
      } catch (err) {
        console.error("Failed to fetch fees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['student']} redirectTo="/student/login">
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6">My Fees</h1>

        {loading ? (
          <p className="text-gray-500">Loading fee details...</p>
        ) : fees.length === 0 ? (
          <p className="text-gray-500">No fee records found.</p>
        ) : (
          <div className="space-y-4">
            {fees.map((fee) => (
              <div key={fee._id} className="bg-white border rounded-lg shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">₹{fee.amountDue}</p>
                    <p className="text-sm text-gray-600">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                    <p className={`text-sm font-medium ${fee.isPaid ? "text-green-600" : "text-red-600"}`}>
                      {fee.isPaid ? "Paid" : "Unpaid"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
