"use client";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User, Calendar, Mail, Shield, Loader } from "lucide-react";

interface Profile {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt?: string;
}

export default function StudentProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await api.get("/student/profile");
                console.log("Full response:", res.data);

                // Handle different possible response structures
                const profileData = res.data.profile || res.data.student || res.data;
                console.log("Profile data:", profileData);

                setProfile(profileData);
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch profile:", err);
                setError(err.response?.data?.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['student']} redirectTo="/student/login">
                <div className="min-h-screen bg-gray-50 p-6">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
                            <p className="text-gray-600">Loading profile...</p>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error) {
        return (
            <ProtectedRoute allowedRoles={['student']} redirectTo="/student/login">
                <div className="min-h-screen bg-gray-50 p-6">
                    <div className="flex items-center justify-center min-h-[400px]">
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
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['student']} redirectTo="/student/login">
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    

                    {profile ? (
                        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                            {/* Header Section */}
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                                        <p className="text-purple-100 capitalize">{profile.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <User className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Full Name</p>
                                                <p className="font-medium text-gray-900">{profile.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Email Address</p>
                                                <p className="font-medium text-gray-900">{profile.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <Shield className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Role</p>
                                                <p className="font-medium text-gray-900 capitalize">{profile.role}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <Calendar className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Member Since</p>
                                                <p className="font-medium text-gray-900">
                                                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <User className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-600">Student ID</p>
                                                <p className="font-medium text-gray-900 font-mono text-sm">{profile._id}</p>
                                            </div>
                                        </div>

                                        {profile.updatedAt && (
                                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                                <Calendar className="w-5 h-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-600">Last Updated</p>
                                                    <p className="font-medium text-gray-900">
                                                        {new Date(profile.updatedAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex space-x-4">
                                        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                            Edit Profile
                                        </button>
                                        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-8 text-center">
                            <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-600">No profile data available</p>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}