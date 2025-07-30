"use client";

import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Upload, FileText, 
  CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Save, Send,
  GraduationCap, Users, Home, BookOpen, Award, CreditCard
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Type definitions
interface DocumentsType {
  photo: File | null;
  birthCertificate: File | null;
  previousMarksheet: File | null;
  transferCertificate: File | null;
  aadharCard: File | null;
  casteCertificate: File | null;
  incomeCertificate: File | null;
}

interface FormDataType {
  // Student Information
  studentName: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  religion: string;
  nationality: string;
  bloodGroup: string;
  aadharNumber: string;
  
  // Parent/Guardian Information
  fatherName: string;
  fatherOccupation: string;
  fatherIncome: string;
  fatherPhone: string;
  fatherEmail: string;
  motherName: string;
  motherOccupation: string;
  motherIncome: string;
  motherPhone: string;
  motherEmail: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  
  // Address Information
  permanentAddress: string;
  permanentCity: string;
  permanentState: string;
  permanentPincode: string;
  currentAddress: string;
  currentCity: string;
  currentState: string;
  currentPincode: string;
  sameAddress: boolean;
  
  // Academic Information
  previousSchool: string;
  previousClass: string;
  previousPercentage: string;
  previousBoard: string;
  admissionClass: string;
  stream: string;
  subjects: string[];
  
  // Documents
  documents: DocumentsType;
  
  // Additional Information
  hasDisability: boolean;
  disabilityDetails: string;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
  transportRequired: boolean;
  hostelRequired: boolean;
  previousApplications: boolean;
  declaration: boolean;
}

export default function AdmissionApplicationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  const [formData, setFormData] = useState<FormDataType>({
    // Student Information
    studentName: '',
    dateOfBirth: '',
    gender: '',
    category: '',
    religion: '',
    nationality: '',
    bloodGroup: '',
    aadharNumber: '',
    
    // Parent/Guardian Information
    fatherName: '',
    fatherOccupation: '',
    fatherIncome: '',
    fatherPhone: '',
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherIncome: '',
    motherPhone: '',
    motherEmail: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    
    // Address Information
    permanentAddress: '',
    permanentCity: '',
    permanentState: '',
    permanentPincode: '',
    currentAddress: '',
    currentCity: '',
    currentState: '',
    currentPincode: '',
    sameAddress: false,
    
    // Academic Information
    previousSchool: '',
    previousClass: '',
    previousPercentage: '',
    previousBoard: '',
    admissionClass: '',
    stream: '',
    subjects: [],
    
    // Documents
    documents: {
      photo: null,
      birthCertificate: null,
      previousMarksheet: null,
      transferCertificate: null,
      aadharCard: null,
      casteCertificate: null,
      incomeCertificate: null
    },
    
    // Additional Information
    hasDisability: false,
    disabilityDetails: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    transportRequired: false,
    hostelRequired: false,
    previousApplications: false,
    declaration: false
  });

  const steps = [
    { id: 1, title: 'Student Info', icon: User },
    { id: 2, title: 'Parent/Guardian', icon: Users },
    { id: 3, title: 'Address', icon: Home },
    { id: 4, title: 'Academic', icon: BookOpen },
    { id: 5, title: 'Documents', icon: FileText },
    { id: 6, title: 'Additional', icon: Award },
    { id: 7, title: 'Review', icon: CheckCircle }
  ];

  const handleInputChange = (field: keyof FormDataType, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDocumentUpload = (docType: keyof DocumentsType, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file
      }
    }));
  };

  const handleFileChange = (docType: keyof DocumentsType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleDocumentUpload(docType, file);
    }
  };

  const handleSameAddress = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sameAddress: checked,
      ...(checked && {
        currentAddress: prev.permanentAddress,
        currentCity: prev.permanentCity,
        currentState: prev.permanentState,
        currentPincode: prev.permanentPincode
      })
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.studentName && formData.dateOfBirth && formData.gender;
      case 2:
        return formData.fatherName && formData.motherName && formData.fatherPhone;
      case 3:
        return formData.permanentAddress && formData.permanentCity && formData.permanentState;
      case 4:
        return formData.previousSchool && formData.admissionClass;
      case 5:
        return formData.documents.photo && formData.documents.birthCertificate;
      case 6:
        return formData.emergencyContact && formData.emergencyPhone;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!formData.declaration) {
      alert('Please accept the declaration to proceed.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      
      // Type-safe form data appending
      (Object.keys(formData) as Array<keyof FormDataType>).forEach(key => {
        if (key === 'documents') {
          (Object.keys(formData.documents) as Array<keyof DocumentsType>).forEach(docKey => {
            const file = formData.documents[docKey];
            if (file) {
              submitData.append(docKey, file);
            }
          });
        } else if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, String(formData[key]));
        }
      });

      const response = await fetch('/api/admissions/apply', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          router.push('/admissions/success?applicationId=' + result.applicationId);
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('Submission failed:', result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="ews">EWS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion
                </label>
                <input
                  type="text"
                  value={formData.religion}
                  onChange={(e) => handleInputChange('religion', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter religion"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Indian"
                  defaultValue="Indian"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  value={formData.aadharNumber}
                  onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength={12}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Parent/Guardian Information</h3>
            
            {/* Father's Information */}
            <div>
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Father's Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter father's full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.fatherOccupation}
                    onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter occupation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    value={formData.fatherIncome}
                    onChange={(e) => handleInputChange('fatherIncome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter annual income"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.fatherPhone}
                    onChange={(e) => handleInputChange('fatherPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.fatherEmail}
                    onChange={(e) => handleInputChange('fatherEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>

            {/* Mother's Information */}
            <div>
              <h4 className="text-lg font-semibold text-purple-600 mb-4">Mother's Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => handleInputChange('motherName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter mother's full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.motherOccupation}
                    onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter occupation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    value={formData.motherIncome}
                    onChange={(e) => handleInputChange('motherIncome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter annual income"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.motherPhone}
                    onChange={(e) => handleInputChange('motherPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.motherEmail}
                    onChange={(e) => handleInputChange('motherEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div>
              <h4 className="text-lg font-semibold text-green-600 mb-4">Guardian Information (if different)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter guardian name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relation
                  </label>
                  <input
                    type="text"
                    value={formData.guardianRelation}
                    onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Uncle, Aunt, Grandfather"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Information</h3>
            
            {/* Permanent Address */}
            <div>
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Permanent Address</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <textarea
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter complete address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.permanentCity}
                      onChange={(e) => handleInputChange('permanentCity', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.permanentState}
                      onChange={(e) => handleInputChange('permanentState', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter state"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={formData.permanentPincode}
                      onChange={(e) => handleInputChange('permanentPincode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Current Address */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-purple-600">Current Address</h4>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.sameAddress}
                    onChange={(e) => handleSameAddress(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Same as permanent address</span>
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address
                  </label>
                  <textarea
                    value={formData.currentAddress}
                    onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter complete address"
                    disabled={formData.sameAddress}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.currentCity}
                      onChange={(e) => handleInputChange('currentCity', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter city"
                      disabled={formData.sameAddress}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.currentState}
                      onChange={(e) => handleInputChange('currentState', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter state"
                      disabled={formData.sameAddress}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={formData.currentPincode}
                      onChange={(e) => handleInputChange('currentPincode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pincode"
                      maxLength={6}
                      disabled={formData.sameAddress}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Academic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous School Name *
                </label>
                <input
                  type="text"
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter previous school name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Class Completed
                </label>
                <select
                  value={formData.previousClass}
                  onChange={(e) => handleInputChange('previousClass', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Class</option>
                  <option value="nursery">Nursery</option>
                  <option value="lkg">LKG</option>
                  <option value="ukg">UKG</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Class Percentage
                </label>
                <input
                  type="number"
                  value={formData.previousPercentage}
                  onChange={(e) => handleInputChange('previousPercentage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter percentage"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Board of Previous School
                </label>
                <select
                  value={formData.previousBoard}
                  onChange={(e) => handleInputChange('previousBoard', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Board</option>
                  <option value="cbse">CBSE</option>
                  <option value="icse">ICSE</option>
                  <option value="state">State Board</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admission Seeking for Class *
                </label>
                <select
                  value={formData.admissionClass}
                  onChange={(e) => handleInputChange('admissionClass', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="nursery">Nursery</option>
                  <option value="lkg">LKG</option>
                  <option value="ukg">UKG</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Document Upload</h3>
            <p className="text-gray-600 mb-6">Please upload the following documents (PDF/JPG/PNG, max 5MB each):</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'photo', label: 'Student Photograph', required: true },
                { key: 'birthCertificate', label: 'Birth Certificate', required: true },
                { key: 'previousMarksheet', label: 'Previous Class Marksheet', required: false },
                { key: 'transferCertificate', label: 'Transfer Certificate', required: false },
                { key: 'aadharCard', label: 'Aadhar Card', required: false },
                { key: 'casteCertificate', label: 'Caste Certificate', required: false },
                { key: 'incomeCertificate', label: 'Income Certificate', required: false }
              ].map((doc) => (
                <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {doc.label} {doc.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange(doc.key as keyof DocumentsType)}
                    className="hidden"
                    id={doc.key}
                  />
                  <label
                    htmlFor={doc.key}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </label>
                  {formData.documents[doc.key as keyof DocumentsType] && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.documents[doc.key as keyof DocumentsType]?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter emergency contact name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Phone *
                </label>
                <input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter emergency contact phone"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hasDisability"
                  checked={formData.hasDisability}
                  onChange={(e) => handleInputChange('hasDisability', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="hasDisability" className="text-gray-700">
                  Student has any physical/learning disability
                </label>
              </div>

              {formData.hasDisability && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disability Details
                  </label>
                  <textarea
                    value={formData.disabilityDetails}
                    onChange={(e) => handleInputChange('disabilityDetails', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Please describe the disability and any special requirements"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Conditions (if any)
                </label>
                <textarea
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Mention any allergies, chronic conditions, or medical history"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="transportRequired"
                    checked={formData.transportRequired}
                    onChange={(e) => handleInputChange('transportRequired', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="transportRequired" className="text-gray-700">
                    School transport required
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hostelRequired"
                    checked={formData.hostelRequired}
                    onChange={(e) => handleInputChange('hostelRequired', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="hostelRequired" className="text-gray-700">
                    Hostel accommodation required
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="previousApplications"
                  checked={formData.previousApplications}
                  onChange={(e) => handleInputChange('previousApplications', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="previousApplications" className="text-gray-700">
                  Previously applied to this school
                </label>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Application Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Student Name:</span>
                  <span className="ml-2 text-gray-900">{formData.studentName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date of Birth:</span>
                  <span className="ml-2 text-gray-900">{formData.dateOfBirth}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Father's Name:</span>
                  <span className="ml-2 text-gray-900">{formData.fatherName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Mother's Name:</span>
                  <span className="ml-2 text-gray-900">{formData.motherName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Admission Class:</span>
                  <span className="ml-2 text-gray-900">{formData.admissionClass}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Contact:</span>
                  <span className="ml-2 text-gray-900">{formData.fatherPhone}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">Declaration</h4>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="declaration"
                  checked={formData.declaration}
                  onChange={(e) => handleInputChange('declaration', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="declaration" className="text-sm text-blue-900 leading-relaxed">
                  I hereby declare that all the information provided in this application form is true and correct to the best of my knowledge. 
                  I understand that any false information may lead to rejection of the application or cancellation of admission. 
                  I agree to abide by the rules and regulations of Dr. Rajendra Prasad Purva Madhyamik Vidyalaya.
                </label>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-800">Application submitted successfully! Redirecting...</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-red-800">Failed to submit application. Please try again.</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 pt-20">
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Online Admission Application</h1>
          <p className="text-gray-600">Dr. Rajendra Prasad Purva Madhyamik Vidyalaya</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 rounded-full w-full"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentStep === 1
                ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-105'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-4">
            <button
              onClick={() => {/* Save as draft logic */}}
              className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </button>

            {currentStep < 7 ? (
              <button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  validateStep(currentStep)
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    : 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!formData.declaration || isSubmitting}
                className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  formData.declaration && !isSubmitting
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                    : 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}