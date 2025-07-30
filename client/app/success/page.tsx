import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Download, Calendar, Phone, Mail, MapPin, 
  Clock, FileText, Users, Home, Share2, Printer, ArrowRight,
  Award, BookOpen, Bell, Info
} from 'lucide-react';

export default function AdmissionSuccessPage() {
  const [applicationId] = useState('DRPPV2025001234');
  const [currentTime] = useState(new Date().toLocaleString());
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleDownloadReceipt = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.href = '#';
    element.download = `admission-receipt-${applicationId}.pdf`;
    element.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Admission Application Submitted',
        text: `Application submitted successfully! Application ID: ${applicationId}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Success Animation */}
        <div className={`text-center mb-8 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Application Submitted Successfully! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Thank you for applying to Dr. Rajendra Prasad Purva Madhyamik Vidyalaya
          </p>
        </div>

        {/* Main Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-white">
              <div>
                <h2 className="text-2xl font-bold mb-2">Application Confirmation</h2>
                <p className="text-green-100">Your application has been received and is being processed</p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-sm opacity-90">Application ID</div>
                <div className="text-2xl font-mono font-bold">{applicationId}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Submission Details</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Submitted on: <span className="font-medium text-gray-900">{currentTime}</span></div>
                  <div>Status: <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Under Review</span></div>
                  <div>Processing Time: <span className="font-medium text-gray-900">5-7 working days</span></div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Bell className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Document verification within 3 days</div>
                  <div>• Admission test date will be notified</div>
                  <div>• Final result announcement</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Receipt
              </button>
              
              <button
                onClick={handlePrint}
                className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Printer className="w-5 h-5 mr-2" />
                Print
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>

            {/* Important Information */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Information</h3>
                  <div className="text-sm text-amber-800 space-y-1">
                    <p>• Keep your Application ID safe for future reference</p>
                    <p>• You will receive SMS and email updates on your registered contact details</p>
                    <p>• Ensure all documents are available for verification when called</p>
                    <p>• Admission is subject to document verification and entrance test (if applicable)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                Admission Process Timeline
              </h3>
              
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-green-500 rounded-full mt-2 mr-6 relative z-10"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Application Submitted</h4>
                      <p className="text-sm text-gray-600">Today - Application received successfully</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-blue-300 rounded-full mt-2 mr-6 relative z-10"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Document Verification</h4>
                      <p className="text-sm text-gray-600">Within 3 working days - We'll verify your documents</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mt-2 mr-6 relative z-10"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Entrance Test (if applicable)</h4>
                      <p className="text-sm text-gray-600">Date will be communicated via SMS/Email</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mt-2 mr-6 relative z-10"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Final Result</h4>
                      <p className="text-sm text-gray-600">Within 7 working days - Admission decision</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-3 text-green-600" />
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For Admission Queries</h4>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-blue-600" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-blue-600" />
                  <span>admissions@drppschool.edu.in</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 text-blue-600 mt-0.5" />
                  <span>Dr. Rajendra Prasad Purva Madhyamik Vidyalaya<br />
                    Education City, Lucknow, UP 226001</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Office Hours</h4>
              <div className="space-y-2 text-gray-600">
                <div>Monday - Friday: 9:00 AM - 5:00 PM</div>
                <div>Saturday: 9:00 AM - 2:00 PM</div>
                <div>Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white cursor-pointer hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
            <BookOpen className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">School Website</h3>
            <p className="text-sm opacity-90">Visit our official website for more information</p>
            <ArrowRight className="w-5 h-5 mt-4" />
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white cursor-pointer hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
            <Users className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Parent Portal</h3>
            <p className="text-sm opacity-90">Access parent portal for updates</p>
            <ArrowRight className="w-5 h-5 mt-4" />
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white cursor-pointer hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
            <Award className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fee Structure</h3>
            <p className="text-sm opacity-90">View detailed fee information</p>
            <ArrowRight className="w-5 h-5 mt-4" />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Thank you for choosing Dr. Rajendra Prasad Purva Madhyamik Vidyalaya. 
            We look forward to welcoming your child to our school family! 🎓
          </p>
        </div>
      </div>
    </div>
  );
}