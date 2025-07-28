'use client';

import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, User, MessageSquare,
  Calendar, Star, Award, CheckCircle, AlertCircle, Info,
  Facebook, Twitter, Instagram, Youtube, ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "Main Office: +91 9876543210",
        "Admissions: +91 9876543211",
        "Transport: +91 9876543212"
      ],
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@drrajendraprasad.edu",
        "admissions@drrajendraprasad.edu",
        "principal@drrajendraprasad.edu"
      ],
      color: "green"
    },
    {
      icon: MapPin,
      title: "School Address",
      details: [
        "Dr. Rajendra Prasad Purva Madhyamik Vidyalaya",
        "Education Lane, Learning District",
        "Lucknow, Uttar Pradesh - 226001"
      ],
      color: "purple"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed"
      ],
      color: "orange"
    }
  ];

  const departments = [
    {
      name: "Admissions Office",
      head: "Ms. Priya Sharma",
      phone: "+91 9876543211",
      email: "admissions@drrajendraprasad.edu",
      hours: "Mon-Sat: 9:00 AM - 4:00 PM"
    },
    {
      name: "Academic Office",
      head: "Dr. Rajesh Kumar",
      phone: "+91 9876543210",
      email: "academic@drrajendraprasad.edu",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM"
    },
    {
      name: "Transport Department",
      head: "Mr. Amit Singh",
      phone: "+91 9876543212",
      email: "transport@drrajendraprasad.edu",
      hours: "Mon-Fri: 7:00 AM - 6:00 PM"
    },
    {
      name: "Finance Office",
      head: "Mrs. Sunita Gupta",
      phone: "+91 9876543213",
      email: "finance@drrajendraprasad.edu",
      hours: "Mon-Fri: 9:00 AM - 4:00 PM"
    }
  ];

  const faqs = [
    {
      question: "What are the school timings?",
      answer: "School hours are from 8:00 AM to 2:30 PM for all classes. Extended day care is available until 5:00 PM."
    },
    {
      question: "Is transportation provided?",
      answer: "Yes, we provide safe and reliable school bus service covering major areas of the city. Transportation is optional and charged separately."
    },
    {
      question: "What is the admission age criteria?",
      answer: "We admit children from age 3 years for Nursery. The age criteria varies by class as per educational board guidelines."
    },
    {
      question: "Are scholarships available?",
      answer: "Yes, we offer merit-based scholarships and need-based financial assistance for deserving students. Contact our admissions office for details."
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", link: "#", color: "blue" },
    { icon: Twitter, name: "Twitter", link: "#", color: "sky" },
    { icon: Instagram, name: "Instagram", link: "#", color: "pink" },
    { icon: Youtube, name: "YouTube", link: "#", color: "red" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 pt-38">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='80' cy='30' r='1.5'/%3E%3Ccircle cx='30' cy='80' r='1'/%3E%3Ccircle cx='70' cy='70' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us. Choose the most convenient option for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-gray-100 group hover:transform hover:scale-105">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
                  info.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  info.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                  info.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  'bg-gradient-to-br from-orange-500 to-orange-600'
                }`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="admissions">Admissions</option>
                    <option value="academic">Academic Information</option>
                    <option value="transport">Transportation</option>
                    <option value="fees">Fees & Payment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter the subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 flex items-center justify-center"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-green-800">Your message has been sent successfully! We'll get back to you soon.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Google Maps */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">Google Maps integration would go here</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Visit Our Campus</h3>
                  <p className="text-gray-600 mb-4">
                    Dr. Rajendra Prasad Purva Madhyamik Vidyalaya<br />
                    Education Lane, Learning District<br />
                    Lucknow, Uttar Pradesh - 226001
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Get Directions <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-6">Stay connected with our school community on social media</p>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className={`flex items-center p-3 rounded-xl transition-colors duration-300 group ${
                        social.color === 'blue' ? 'bg-blue-50 hover:bg-blue-100' :
                        social.color === 'sky' ? 'bg-sky-50 hover:bg-sky-100' :
                        social.color === 'pink' ? 'bg-pink-50 hover:bg-pink-100' :
                        'bg-red-50 hover:bg-red-100'
                      }`}
                    >
                      <social.icon className={`w-5 h-5 mr-3 ${
                        social.color === 'blue' ? 'text-blue-600' :
                        social.color === 'sky' ? 'text-sky-600' :
                        social.color === 'pink' ? 'text-pink-600' :
                        'text-red-600'
                      }`} />
                      <span className={`font-medium ${
                        social.color === 'blue' ? 'text-blue-900' :
                        social.color === 'sky' ? 'text-sky-900' :
                        social.color === 'pink' ? 'text-pink-900' :
                        'text-red-900'
                      }`}>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Information</h3>
                <div className="space-y-3 text-blue-100">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>Admissions Open: November - February</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3" />
                    <span>School Hours: 8:00 AM - 2:30 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-3" />
                    <span>CBSE Affiliated School</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-3" />
                    <span>15+ Years of Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Department Contacts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Direct contact information for specific departments and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{dept.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-3 text-blue-600" />
                    <span className="font-medium">{dept.head}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-green-600" />
                    <span>{dept.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3 text-purple-600" />
                    <span>{dept.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-3 text-orange-600" />
                    <span>{dept.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our school
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Contact Us Directly
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Schedule a Visit
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Experience our campus firsthand. Schedule a personal tour and see why 
            Dr. Rajendra Prasad Purva Madhyamik Vidyalaya is the right choice for your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center">
              Book Campus Tour
              <Calendar className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Call Now
              <Phone className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}