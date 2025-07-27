"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import { 
  GraduationCap, 
  BookOpen, 
  UserCheck, 
  Clock, 
  Calendar,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';

export default function TeacherDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'My Classes', value: '6', icon: BookOpen, color: 'bg-green-500', change: '+1 new' },
    { title: 'Total Students', value: '156', icon: GraduationCap, color: 'bg-blue-500', change: '+8 new' },
    { title: 'Attendance Rate', value: '92%', icon: UserCheck, color: 'bg-purple-500', change: '+3%' },
    { title: 'Avg Performance', value: '87%', icon: TrendingUp, color: 'bg-orange-500', change: '+5%' },
  ];

  const todayClasses = [
    { subject: 'Mathematics', time: '9:00 AM - 10:00 AM', room: 'Room 101', students: 28 },
    { subject: 'Physics', time: '10:30 AM - 11:30 AM', room: 'Lab 203', students: 25 },
    { subject: 'Chemistry', time: '2:00 PM - 3:00 PM', room: 'Lab 105', students: 30 },
  ];

  const recentUpdates = [
    { title: 'Assignment submitted', student: 'John Doe', time: '30 min ago', type: 'assignment' },
    { title: 'Attendance marked', class: 'Math Grade 10', time: '2 hours ago', type: 'attendance' },
    { title: 'Test results uploaded', class: 'Physics Grade 11', time: '1 day ago', type: 'results' },
    { title: 'Parent meeting scheduled', student: 'Sarah Wilson', time: '2 days ago', type: 'meeting' },
  ];

  const quickActions = [
    { title: 'Mark Attendance', href: '/teacher/attendance', description: 'Record student attendance for today' },
    { title: 'Grade Assignments', href: '/teacher/assignments', description: 'Review and grade pending assignments' },
    { title: 'View Students', href: '/teacher/students', description: 'Access student profiles and records' },
    { title: 'Class Schedule', href: '/teacher/schedule', description: 'View your complete teaching schedule' },
  ];

  return (
    <ProtectedRoute allowedRoles={['teacher']} redirectTo="/teacher/login">
      <div className="min-h-screen bg-gray-50">
        {/* Welcome Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Good morning, {user?.name}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Ready to inspire young minds today?
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">
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
                      <p className="text-green-600 text-sm font-medium mt-1">{stat.change}</p>
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
            {/* Today's Schedule */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Today's Classes</h2>
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {todayClasses.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{classItem.subject}</h3>
                          <p className="text-sm text-gray-600">{classItem.time}</p>
                          <p className="text-xs text-gray-500">{classItem.room}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{classItem.students} students</p>
                        <button className="text-xs text-green-600 hover:text-green-700 font-medium mt-1">
                          View Details
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
                      className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                    >
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{action.description}</p>
                    </a>
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
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-sm text-green-600 font-medium capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>

              {/* Recent Updates */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Updates</h2>
                <div className="space-y-4">
                  {recentUpdates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        update.type === 'assignment' ? 'bg-blue-500' :
                        update.type === 'attendance' ? 'bg-green-500' :
                        update.type === 'results' ? 'bg-purple-500' : 'bg-orange-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium text-sm">{update.title}</p>
                        <p className="text-gray-600 text-xs mt-1">
                          {update.student || update.class}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{update.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button className="w-full text-green-600 hover:text-green-700 font-medium text-sm">
                    View All Updates
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-bold text-gray-900">Great Job This Month!</h3>
                  <p className="text-gray-600 text-sm">Your students are performing excellently</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">87%</p>
                <p className="text-green-700 text-sm">Avg Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}