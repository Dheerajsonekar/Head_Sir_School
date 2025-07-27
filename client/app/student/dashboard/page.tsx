"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
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

export default function StudentDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Enrolled Courses', value: '8', icon: BookOpen, color: 'bg-purple-500', change: '+2 new' },
    { title: 'Attendance Rate', value: '94%', icon: Calendar, color: 'bg-green-500', change: '+2%' },
    { title: 'Average Grade', value: 'A-', icon: Award, color: 'bg-blue-500', change: '+0.3' },
    { title: 'Pending Fees', value: '$1,200', icon: DollarSign, color: 'bg-orange-500', change: 'Due Soon' },
  ];

  const upcomingClasses = [
    { subject: 'Mathematics', teacher: 'Mr. Johnson', time: '9:00 AM', room: 'Room 101' },
    { subject: 'Physics', teacher: 'Dr. Smith', time: '11:00 AM', room: 'Lab 203' },
    { subject: 'English', teacher: 'Ms. Davis', time: '2:00 PM', room: 'Room 205' },
  ];

  const recentGrades = [
    { subject: 'Mathematics', assignment: 'Quiz 3', grade: 'A', date: '2 days ago' },
    { subject: 'Physics', assignment: 'Lab Report', grade: 'B+', date: '5 days ago' },
    { subject: 'Chemistry', assignment: 'Midterm', grade: 'A-', date: '1 week ago' },
    { subject: 'English', assignment: 'Essay', grade: 'A', date: '1 week ago' },
  ];

  const quickActions = [
    { title: 'View Fees', href: '/student/fees', description: 'Check fee status and payment history' },
    { title: 'Check Results', href: '/student/results', description: 'View grades and academic performance' },
    { title: 'View Attendance', href: '/student/attendance', description: 'Track your attendance record' },
    { title: 'Course Materials', href: '/student/materials', description: 'Access study materials and resources' },
  ];

  const assignments = [
    { subject: 'Mathematics', title: 'Calculus Problem Set', due: 'Tomorrow', status: 'pending' },
    { subject: 'Physics', title: 'Lab Report #4', due: 'In 3 days', status: 'in-progress' },
    { subject: 'English', title: 'Literature Essay', due: 'Next week', status: 'completed' },
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
                  Welcome back, {user?.name}!
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
                        stat.title === 'Pending Fees' ? 'text-orange-600' : 'text-green-600'
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
                  <h2 className="text-xl font-bold text-gray-900">Today's Classes</h2>
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{classItem.subject}</h3>
                          <p className="text-sm text-gray-600">{classItem.teacher}</p>
                          <p className="text-xs text-gray-500">{classItem.room}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{classItem.time}</p>
                        <button className="text-xs text-purple-600 hover:text-purple-700 font-medium mt-1">
                          Join Class
                        </button>
                      </div>
                    </div>
                  ))}
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
                  {assignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          assignment.status === 'completed' ? 'bg-green-500' :
                          assignment.status === 'in-progress' ? 'bg-orange-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                          <p className="text-sm text-gray-600">{assignment.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Due {assignment.due}</p>
                        <p className={`text-xs font-medium capitalize ${
                          assignment.status === 'completed' ? 'text-green-600' :
                          assignment.status === 'in-progress' ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {assignment.status.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                  ))}
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
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-sm text-purple-600 font-medium capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>

              {/* Recent Grades */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Grades</h2>
                <div className="space-y-4">
                  {recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{grade.assignment}</p>
                        <p className="text-gray-600 text-xs">{grade.subject}</p>
                        <p className="text-gray-500 text-xs">{grade.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        grade.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                        grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {grade.grade}
                      </div>
                    </div>
                  ))}
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
                  <h3 className="font-bold text-gray-900">Excellent Progress!</h3>
                  <p className="text-gray-600 text-sm">You're maintaining great academic performance</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">3.8</p>
                <p className="text-purple-700 text-sm">Current GPA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}