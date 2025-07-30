"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Phone, Mail, MapPin, Calendar, Bell, Users, BookOpen, Award, 
  GraduationCap, Trophy, Star, Clock, CheckCircle, ArrowRight,
  CreditCard, FileText, MessageCircle, Play, Download, ExternalLink
} from 'lucide-react';

export default function ModernSchoolHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const router = useRouter();

  const notifications = [
    { 
      id: 1, 
      title: "Holiday Announcement", 
      message: "Holiday announced on 20th July due to heavy rain. Stay safe!", 
      time: "2 hours ago",
      type: "urgent",
      icon: "📢"
    },
    { 
      id: 2, 
      title: "Exam Timetable Released", 
      message: "Final exam time-table has been uploaded to the student portal.", 
      time: "1 day ago",
      type: "academic",
      icon: "📝"
    },
    { 
      id: 3, 
      title: "Online Fee Payment", 
      message: "Q3 fee payment portal is now live. Pay securely online.", 
      time: "3 days ago",
      type: "fee",
      icon: "💳"
    },
    { 
      id: 4, 
      title: "Parent-Teacher Meeting", 
      message: "PTM scheduled for August 5th. Please book your slot online.", 
      time: "5 days ago",
      type: "meeting",
      icon: "👨‍👩‍👧‍👦"
    }
  ];

  const schoolStats = [
    { icon: Users, label: "Active Students", value: "500+", color: "text-blue-600" },
    { icon: BookOpen, label: "Expert Teachers", value: "25+", color: "text-purple-600" },
    { icon: Award, label: "Years of Excellence", value: "15+", color: "text-green-600" },
    { icon: Trophy, label: "Achievements", value: "50+", color: "text-orange-600" }
  ];

  const quickAccess = [
    {
      icon: GraduationCap,
      title: "Academic Results",
      description: "Access detailed performance reports and track progress",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      textColor: "text-blue-900",
      link: "/student/login"
    },
    {
      icon: CreditCard,
      title: "Fee Payment",
      description: "Secure and instant online payment for tuition fees",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      textColor: "text-green-900",
      link: "/student/login"
    },
    {
      icon: FileText,
      title: "Assignments & Notes",
      description: "Download assignments, study materials and important notes",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      textColor: "text-purple-900",
      link: "/student/login"
    },
    {
      icon: Calendar,
      title: "Class Schedule",
      description: "Real-time timetable updates and live class access links",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      textColor: "text-orange-900",
      link: "/student/login"
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Digital Classrooms",
      description: "Modern smart classrooms equipped with latest technology"
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Qualified and experienced teachers dedicated to student success"
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Proven track record of outstanding academic achievements"
    },
    {
      icon: Star,
      title: "Holistic Development",
      description: "Focus on overall personality and character development"
    }
  ];

  // Navigation handler
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='80' cy='30' r='1.5'/%3E%3Ccircle cx='30' cy='80' r='1'/%3E%3Ccircle cx='70' cy='70' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3s'}}></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3.5s'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-38">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
              Welcome to the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse">
                Dr. Rajendra Prasad
              </span>
            </h1>
            <div className="max-w-4xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-100">
                Purva Madhyamik Vidyalaya
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Empowering students through innovative digital learning experiences. 
                Connect, Learn, and Shape Tomorrow with excellence in education.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                onClick={() => handleNavigation('/applying')}
                className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center"
              >
                Enroll Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* School Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {schoolStats.map((stat, index) => (
                <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <stat.icon className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section - Moved after Hero */}
      <section className="py-16 bg-white" data-animate id="notifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 relative">
              Latest Updates
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
            </h2>
            <p className="text-gray-600 text-lg mt-6">Stay informed with our latest announcements and news</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* School Notifications */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-blue-600 flex items-center">
                <span className="text-2xl mr-3">📢</span>
                School Notifications
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 transition-all duration-300 hover:transform hover:translate-x-2 hover:shadow-md cursor-pointer">
                  <div className="text-blue-600 text-sm font-bold mb-2">July 15, 2025</div>
                  <div className="font-bold text-gray-900 mb-2">Summer Break Extended</div>
                  <div className="text-gray-600 leading-relaxed">Due to extreme weather conditions, summer break has been extended until July 25th. Classes will resume on July 26th.</div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 transition-all duration-300 hover:transform hover:translate-x-2 hover:shadow-md cursor-pointer">
                  <div className="text-blue-600 text-sm font-bold mb-2">July 12, 2025</div>
                  <div className="font-bold text-gray-900 mb-2">Online Fee Payment Portal</div>
                  <div className="text-gray-600 leading-relaxed">New online payment system is now live. Students can pay fees using debit/credit cards, net banking, or UPI.</div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 transition-all duration-300 hover:transform hover:translate-x-2 hover:shadow-md cursor-pointer">
                  <div className="text-blue-600 text-sm font-bold mb-2">July 10, 2025</div>
                  <div className="font-bold text-gray-900 mb-2">Parent-Teacher Meeting</div>
                  <div className="text-gray-600 leading-relaxed">PTM scheduled for July 28th from 10 AM to 4 PM. Please book your slot through the student portal.</div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold flex items-center justify-center">
                  <span className="text-2xl mr-3">🗓️</span>
                  Upcoming Events
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/20 border border-white/20">
                  <div className="text-blue-200 text-sm mb-2">July 26, 2025</div>
                  <div className="font-bold text-white mb-1">First Day of School</div>
                  <div className="text-blue-100 text-sm">New academic session begins</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/20 border border-white/20">
                  <div className="text-blue-200 text-sm mb-2">July 28, 2025</div>
                  <div className="font-bold text-white mb-1">Parent-Teacher Meeting</div>
                  <div className="text-blue-100 text-sm">10:00 AM - 4:00 PM</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/20 border border-white/20">
                  <div className="text-blue-200 text-sm mb-2">August 5, 2025</div>
                  <div className="font-bold text-white mb-1">Sports Day</div>
                  <div className="text-blue-100 text-sm">Annual sports competition</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/20 border border-white/20">
                  <div className="text-blue-200 text-sm mb-2">August 15, 2025</div>
                  <div className="font-bold text-white mb-1">Independence Day</div>
                  <div className="text-blue-100 text-sm">Flag hoisting ceremony</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-white" data-animate id="quick-access">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Portal Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your gateway to academic excellence and digital learning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickAccess.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${item.bgColor} rounded-2xl p-8 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer border border-white/50`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${item.textColor}`}>{item.title}</h3>
                <p className={`${item.textColor} opacity-80 mb-6 leading-relaxed`}>{item.description}</p>
                <button 
                  onClick={() => handleNavigation(item.link)}
                  className={`w-full bg-gradient-to-r ${item.color} text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center group-hover:scale-105`}
                >
                  Access Now
                  <ExternalLink className="ml-2 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white" data-animate id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transforming Education
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Dr. Rajendra Prasad Purva Madhyamik Vidyalaya pioneers modern education by seamlessly 
                blending traditional values with cutting-edge technology. Our digital ecosystem includes 
                smart classrooms, comprehensive online resources, and transparent communication channels.
              </p>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleNavigation('/about')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 text-white shadow-2xl transform hover:rotate-1 transition-transform duration-500 hover:scale-105">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Award className="mr-3 w-8 h-8 text-yellow-300" />
                  Our Mission
                </h3>
                <p className="text-blue-100 leading-relaxed text-lg">
                  To create an environment where every student can thrive through innovative teaching 
                  methods, state-of-the-art technology, and personalized attention that nurtures both 
                  academic excellence and character development.
                </p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-yellow-300">100%</div>
                    <div className="text-xs text-blue-200">Pass Rate</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-yellow-300">95%</div>
                    <div className="text-xs text-blue-200">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Take the first step towards excellence in education. Apply now for admission or explore our digital portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation('/applying')}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center"
            >
              Apply for Admission
              <Download className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}