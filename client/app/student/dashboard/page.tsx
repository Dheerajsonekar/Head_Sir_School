"use client";
import {useEffect, useState} from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import api from "@/utils/axios";
import { 
  BookOpen, 
  DollarSign, 
  FileText, 
  Calendar,
  Award,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

// Define interfaces for type safety
interface DashboardStats {
  enrolledCourses: number;
  attendanceRate: string;
  averageGrade: string;
  pendingFees: string;
}

interface UpcomingClass {
  _id: string;
  course: {
    name: string;
    instructor: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  room: string;
}

interface Assignment {
  _id: string;
  title: string;
  courseId: {
    name: string;
  };
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface RecentGrade {
  _id: string;
  courseId: {
    name: string;
  };
  assignment: string;
  grade: string;
  date: string;
}

interface DashboardData {
  student: {
    name: string;
    email: string;
    role: string;
  };
  stats: DashboardStats;
  upcomingClasses: UpcomingClass[];
  assignments: Assignment[];
  recentGrades: RecentGrade[];
}

export default function StudentDashboard() {
  const { user, isLoggingOut } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1) return `In ${diffDays} days`;
    if (diffDays === -1) return 'Yesterday';
    return `${Math.abs(diffDays)} days ago`;
  };

  // Helper function to format time
  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper function to get assignment status
  const getAssignmentStatus = (dueDate: string): 'pending' | 'in-progress' | 'completed' => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'completed';
    if (diffDays <= 3) return 'in-progress';
    return 'pending';
  };

  // Helper function to convert numeric GPA to letter grade
  const getLetterGrade = (numericGrade: string): string => {
    const gpa = parseFloat(numericGrade);
    if (gpa >= 3.7) return 'A';
    if (gpa >= 3.3) return 'A-';
    if (gpa >= 3.0) return 'B+';
    if (gpa >= 2.7) return 'B';
    if (gpa >= 2.3) return 'B-';
    if (gpa >= 2.0) return 'C+';
    if (gpa >= 1.7) return 'C';
    if (gpa >= 1.3) return 'C-';
    if (gpa >= 1.0) return 'D';
    return 'F';
  };

  const quickActions = [
    { title: 'View Fees', href: '/student/fees', description: 'Check fee status and payment history' },
    { title: 'Check Results', href: '/student/results', description: 'View grades and academic performance' },
    { title: 'View Attendance', href: '/student/attendance', description: 'Track your attendance record' },
    { title: 'Course Materials', href: '/student/materials', description: 'Access study materials and resources' },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      // Don't fetch data if user is logging out
      if (isLoggingOut || !user) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/student/dashboard");
        setDashboard(res.data);
      } catch (err: any) {
        console.error("Failed to fetch dashboard:", err);
        
        // Don't show error if we're logging out or if it's a 401 (handled by auth context)
        if (!isLoggingOut && err.response?.status !== 401) {
          setError(err.response?.data?.message || "Failed to load dashboard data");
        }
      } finally {
        // Only set loading to false if we're not logging out
        if (!isLoggingOut) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();
  }, [user, isLoggingOut]);

  // Show loading while logging out
  if (isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Signing out...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboard) return null;

  // Create stats array from real data
  const stats = [
    { 
      title: 'Enrolled Courses', 
      value: dashboard.stats.enrolledCourses.toString(), 
      icon: BookOpen, 
      color: 'bg-purple-500', 
      change: `${dashboard.stats.enrolledCourses} active` 
    },
    { 
      title: 'Attendance Rate', 
      value: dashboard.stats.attendanceRate, 
      icon: Calendar, 
      color: 'bg-green-500', 
      change: 'This semester' 
    },
    { 
      title: 'Average Grade', 
      value: dashboard.stats.averageGrade !== 'N/A' ? getLetterGrade(dashboard.stats.averageGrade) : 'N/A', 
      icon: Award, 
      color: 'bg-blue-500', 
      change: `GPA: ${dashboard.stats.averageGrade}` 
    },
    { 
      title: 'Pending Fees', 
      value: dashboard.stats.pendingFees, 
      icon: DollarSign, 
      color: 'bg-orange-500', 
      change: dashboard.stats.pendingFees === '₹0' ? 'All paid' : 'Due Soon' 
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['student']} redirectTo="/student/login">
      <div className="min-h-screen bg-gray-50">
        {/* Welcome Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {dashboard.student.name}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Let's continue your learning journey
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-medium">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className={`text-sm font-medium mt-1 ${
                        stat.title === 'Pending Fees' && dashboard.stats.pendingFees !== '₹0' 
                          ? 'text-orange-600' 
                          : 'text-green-600'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Schedule */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Upcoming Classes</h2>
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {dashboard.upcomingClasses.length > 0 ? (
                    dashboard.upcomingClasses.map((classItem) => (
                      <div key={classItem._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{classItem.course.name}</h3>
                            <p className="text-sm text-gray-600">{classItem.course.instructor}</p>
                            <p className="text-xs text-gray-500">{classItem.room}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatTime(classItem.startTime)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(classItem.date)}
                          </p>
                          <button className="text-xs text-purple-600 hover:text-purple-700 font-medium mt-1">
                            Join Class
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No upcoming classes scheduled</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <a
                      key={index}
                      href={action.href}
                      className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                    >
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-700">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{action.description}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Assignments */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Assignments</h2>
                <div className="space-y-4">
                  {dashboard.assignments.length > 0 ? (
                    dashboard.assignments.map((assignment) => {
                      const status = getAssignmentStatus(assignment.dueDate);
                      return (
                        <div key={assignment._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              status === 'completed' ? 'bg-green-500' :
                              status === 'in-progress' ? 'bg-orange-500' : 'bg-red-500'
                            }`}></div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                              <p className="text-sm text-gray-600">{assignment.courseId.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              Due {formatDate(assignment.dueDate)}
                            </p>
                            <p className={`text-xs font-medium capitalize ${
                              status === 'completed' ? 'text-green-600' :
                              status === 'in-progress' ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {status.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No assignments due</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{dashboard.student.name}</p>
                    <p className="text-gray-600">{dashboard.student.email}</p>
                    <p className="text-sm text-purple-600 font-medium capitalize">{dashboard.student.role}</p>
                  </div>
                </div>
              </div>

              {/* Recent Grades */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Grades</h2>
                <div className="space-y-4">
                  {dashboard.recentGrades.length > 0 ? (
                    dashboard.recentGrades.map((grade) => (
                      <div key={grade._id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{grade.assignment}</p>
                          <p className="text-gray-600 text-xs">{grade.courseId.name}</p>
                          <p className="text-gray-500 text-xs">{formatDate(grade.date)}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          grade.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                          grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {grade.grade}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <p>No grades available</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button className="w-full text-purple-600 hover:text-purple-700 font-medium text-sm">
                    View All Grades
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Banner */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-bold text-gray-900">Academic Progress!</h3>
                  <p className="text-gray-600 text-sm">
                    {dashboard.stats.averageGrade !== 'N/A' 
                      ? "You're maintaining great academic performance" 
                      : "Keep working towards your academic goals"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">
                  {dashboard.stats.averageGrade !== 'N/A' ? dashboard.stats.averageGrade : '--'}
                </p>
                <p className="text-purple-700 text-sm">Current GPA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}