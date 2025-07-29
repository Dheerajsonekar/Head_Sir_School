"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Define a type-safe icon map
const iconMap: Record<string, React.ElementType> = {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
};

interface Stat {
  title: string;
  value: string | number;
  change: string;
  color: string;
  icon: string;
}

interface Activity {
  action: string;
  time: string;
  status: "success" | "info" | "warning";
}

export default function PrincipalDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState<Stat[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/principal/dashboard");

        const formattedStats: Stat[] = [
          {
            title: "Total Teachers",
            value: res.data.totalTeachers,
            change: "+5%",
            icon: "Users",
            color: "bg-blue-500",
          },
          {
            title: "Total Students",
            value: res.data.totalStudents,
            change: "+12%",
            icon: "GraduationCap",
            color: "bg-green-500",
          },
          {
            title: "Active Classes",
            value: res.data.activeClasses,
            change: "+2%",
            icon: "BookOpen",
            color: "bg-purple-500",
          },
          {
            title: "Performance Rate",
            value: `${res.data.performanceRate || 0}%`,
            change: "+8%",
            icon: "TrendingUp",
            color: "bg-orange-500",
          },
        ];

        setStats(formattedStats);
        setActivities(res.data.recentActivities || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchDashboard();
  }, []);

  const quickActions = [
    { title: "Manage Teachers", href: "/principal/teachers", description: "Add, edit or remove teacher accounts" },
    { title: "Manage Students", href: "/principal/students", description: "View and manage student records" },
    { title: "View Reports", href: "/principal/reports", description: "Access detailed analytics and reports" },
    { title: "System Settings", href: "/principal/settings", description: "Configure system preferences" },
  ];

  return (
    <ProtectedRoute allowedRoles={["principal"]} redirectTo="/principal/login">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Here's what's happening at your school today
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || AlertTriangle;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className="text-green-600 text-sm font-medium mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions + Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <a
                      key={index}
                      href={action.href}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{action.description}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-sm text-blue-600 font-medium capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium text-sm">{activity.action}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View All Activities
                </button>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-bold text-gray-900">System Status: All Good</h3>
                  <p className="text-gray-600 text-sm">All systems are running smoothly</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">99.9%</p>
                <p className="text-green-700 text-sm">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
