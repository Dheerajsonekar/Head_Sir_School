"use client";

import { Phone, Mail, MapPin, BookOpen, Calendar, FileText, Users, Award, Clock, ExternalLink, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='20' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* School Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl leading-tight">Dr. Rajendra Prasad</h3>
                <p className="text-blue-200 text-sm font-medium">Purva Madhyamik Vidyalaya</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Nurturing minds and building character through quality education for over 15 years. 
              Committed to excellence in learning and holistic development.
            </p>
            <div className="flex items-center space-x-2 text-sm mb-6">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300 font-medium">Recognized Excellence in Education</span>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group">
                <Youtube className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></span>
                  About School
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#academics" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></span>
                  Academic Programs
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#admissions" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></span>
                  Admissions 2025-26
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#notifications" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-purple-500 transition-colors"></span>
                  News & Events
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/student/login" className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <Users className="w-3 h-3 mr-3 group-hover:scale-110 transition-transform" />
                  Student Portal
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Important Information */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative">
              Important
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <Calendar className="w-3 h-3 mr-3 group-hover:scale-110 transition-transform" />
                  Academic Calendar
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <FileText className="w-3 h-3 mr-3 group-hover:scale-110 transition-transform" />
                  Admission Forms
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <BookOpen className="w-3 h-3 mr-3 group-hover:scale-110 transition-transform" />
                  School Prospectus
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <Users className="w-3 h-3 mr-3 group-hover:scale-110 transition-transform" />
                  Faculty Information
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center group hover:translate-x-2">
                  <Award className="w-3 h-3 mr-3 group-hover:scale-110 transition-transform" />
                  School Policies
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-4 h-4 text-red-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Visit Our Campus</p>
                  <p className="text-gray-400 text-sm">123 Education Street</p>
                  <p className="text-gray-400 text-sm">City, State - 123456</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <Phone className="w-4 h-4 text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Call Us</p>
                  <p className="text-gray-400 text-sm">+91 XXXXX XXXXX</p>
                  <p className="text-gray-400 text-sm">+91 XXXXX XXXXX</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <Mail className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Email Us</p>
                  <p className="text-gray-400 text-sm">info@drrajendraprasad.edu</p>
                  <p className="text-gray-400 text-sm">admin@drrajendraprasad.edu</p>
                </div>
              </div>
            </div>

            {/* School Hours */}
            
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-center">
             <p className="text-gray-500 text-center text-sm">
                Designed & Developed by{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold hover:from-blue-300 hover:to-purple-300 transition-all duration-300 cursor-pointer">
                  Dheeraj Sonekar & Co.
                </span>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}