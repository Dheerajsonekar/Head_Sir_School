'use client';

import React, { useState } from 'react';
import { 
  Calendar, CheckCircle, Download, FileText, Users, Clock, 
  CreditCard, Star, Award, BookOpen, GraduationCap, Phone,
  Mail, MapPin, ArrowRight, AlertCircle, Info, Heart, Upload
} from 'lucide-react';

type Grade = 'nursery' | 'primary' | 'secondary';

export default function AdmissionsPage() {
  const [selectedGrade, setSelectedGrade] = useState<Grade>('nursery');

  const admissionSteps = [
    {
      step: 1,
      title: "Online Application",
      description: "Fill out the online application form with required details",
      icon: FileText,
      duration: "15 minutes"
    },
    {
      step: 2,
      title: "Document Submission",
      description: "Upload required documents and certificates",
      icon: Upload,
      duration: "10 minutes"
    },
    {
      step: 3,
      title: "Application Review",
      description: "Our admissions team reviews your application",
      icon: Clock,
      duration: "3-5 days"
    },
    {
      step: 4,
      title: "Student Assessment",
      description: "Age-appropriate assessment for academic readiness",
      icon: BookOpen,
      duration: "1 hour"
    },
    {
      step: 5,
      title: "Parent Interview",
      description: "Meeting with parents to discuss school philosophy",
      icon: Users,
      duration: "30 minutes"
    },
    {
      step: 6,
      title: "Admission Decision",
      description: "Notification of admission status via email/phone",
      icon: CheckCircle,
      duration: "2-3 days"
    }
  ];

  const feeStructure = {
    nursery: {
      admission: "₹25,000",
      tuition: "₹8,000/month",
      transport: "₹2,500/month",
      books: "₹3,000/year",
      uniform: "₹2,000/year"
    },
    primary: {
      admission: "₹30,000",
      tuition: "₹10,000/month",
      transport: "₹2,500/month",
      books: "₹4,500/year",
      uniform: "₹2,500/year"
    },
    secondary: {
      admission: "₹35,000",
      tuition: "₹12,000/month",
      transport: "₹3,000/month",
      books: "₹6,000/year",
      uniform: "₹3,000/year"
    }
  };

  const documents = [
    "Birth Certificate (Original + 2 copies)",
    "Previous School Transfer Certificate",
    "Academic Records/Report Cards",
    "Passport Size Photographs (4 copies)",
    "Address Proof (Utility Bill/Lease)",
    "Parent ID Proof (Aadhar/Passport)",
    "Medical Certificate with Vaccination Records",
    "Caste Certificate (if applicable)"
  ];

  const facilities = [
    {
      icon: BookOpen,
      title: "Digital Learning",
      description: "Smart classrooms with interactive whiteboards"
    },
    {
      icon: Users,
      title: "Small Class Size",
      description: "Maximum 25 students per class for personalized attention"
    },
    {
      icon: Award,
      title: "Certified Teachers",
      description: "Qualified and experienced faculty members"
    },
    {
      icon: Heart,
      title: "Holistic Development",
      description: "Focus on academics, sports, arts, and character building"
    },
    {
      icon: Star,
      title: "Extra-curricular",
      description: "Music, dance, sports, and various clubs and activities"
    },
    {
      icon: GraduationCap,
      title: "Academic Excellence",
      description: "Proven track record with 100% pass rate"
    }
  ];

  const importantDates = [
    {
      event: "Application Opens",
      date: "November 1, 2024",
      status: "completed"
    },
    {
      event: "Application Deadline",
      date: "February 28, 2025",
      status: "upcoming"
    },
    {
      event: "Admission Tests",
      date: "March 15-20, 2025",
      status: "upcoming"
    },
    {
      event: "Results Announcement",
      date: "April 5, 2025",
      status: "upcoming"
    },
    {
      event: "Admission Confirmation",
      date: "April 20, 2025",
      status: "upcoming"
    },
    {
      event: "New Session Begins",
      date: "June 1, 2025",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='80' cy='30' r='1.5'/%3E%3Ccircle cx='30' cy='80' r='1'/%3E%3Ccircle cx='70' cy='70' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Join Our School Family
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
            Begin your child's journey of excellence with us. Discover our simple admission process 
            and become part of a community that nurtures future leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center">
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Download Brochure
              <Download className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admission Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, transparent process designed to welcome new families into our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center group hover:transform hover:scale-105">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center text-blue-600 font-medium text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {step.duration}
                  </div>
                </div>
                
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Important Dates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mark your calendar with these key admission dates for the upcoming academic year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {importantDates.map((item, index) => (
              <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${
                item.status === 'completed' ? 'border-green-500' : 'border-blue-500'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{item.event}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start">
              <Info className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Application Deadline Reminder</h3>
                <p className="text-blue-800">
                  Applications must be submitted by February 28, 2025. Late applications will be considered 
                  only if seats are available. We recommend applying early to secure your child's admission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fee Structure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent and competitive fee structure with flexible payment options
            </p>
          </div>

          {/* Grade Selection */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-xl p-1 inline-flex">
              {Object.keys(feeStructure).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade as Grade)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedGrade === grade
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {grade.charAt(0).toUpperCase() + grade.slice(1)} Classes
                </button>
              ))}
            </div>
          </div>

          {/* Fee Table */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <h3 className="text-2xl font-bold text-white text-center">
                  {selectedGrade.charAt(0).toUpperCase() + selectedGrade.slice(1)} Classes Fee Structure
                </h3>
              </div>
              
              <div className="p-8">
                <div className="space-y-4">
                  {Object.entries(feeStructure[selectedGrade]).map(([feeType, amount]) => (
                    <div key={feeType} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-900 capitalize">
                        {feeType.replace(/([A-Z])/g, ' $1').trim()} Fee
                      </span>
                      <span className="font-bold text-xl text-blue-600">{amount}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center mb-2">
                    <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Payment Options</span>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Monthly, Quarterly, or Annual payment plans available</li>
                    <li>• 5% discount on annual payment</li>
                    <li>• Online payment through UPI, Net Banking, or Cards</li>
                    <li>• Sibling discount: 10% off on second child's fees</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Required Documents
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Please ensure you have all the following documents ready before starting your application. 
                All documents should be clear, legible, and in the specified format.
              </p>

              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">Important Note</h4>
                    <p className="text-yellow-800 text-sm">
                      All documents should be attested by a Gazetted Officer or Notary Public. 
                      Submit originals for verification along with photocopies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-7 h-7 text-blue-600 mr-3" />
                  Application Forms
                </h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                    <span className="font-medium text-blue-900">Admission Application Form</span>
                    <Download className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                    <span className="font-medium text-green-900">Medical Information Form</span>
                    <Download className="w-5 h-5 text-green-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                    <span className="font-medium text-purple-900">Transport Registration Form</span>
                    <Download className="w-5 h-5 text-purple-600" />
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
                <p className="mb-6 text-blue-100">
                  Our admissions team is here to guide you through the process. 
                  Contact us for any questions or assistance.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>+91 9876543210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>admissions@drrajendraprasad.edu</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3" />
                    <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our school the perfect choice for your child's educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:transform hover:scale-105 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <facility.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Take the first step towards your child's bright future. Apply now or schedule a school visit 
            to see our facilities and meet our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center">
              Apply Online Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
          </div>
        </div>
      </section>
    </div>
  );
}