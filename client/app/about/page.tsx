"use client";

import React, { useState, useEffect } from 'react';
import {
    Phone, Mail, MapPin, Calendar, Bell, Users, BookOpen, Award,
    GraduationCap, Trophy, Star, Clock, CheckCircle, ArrowRight,
    ChevronLeft, ChevronRight, Target, Eye, Heart, Lightbulb,
    Globe, Shield, Zap, Compass
} from 'lucide-react';

export default function AboutPage() {
    const [currentGallerySlide, setCurrentGallerySlide] = useState(0);

    const galleryImages = [
        {
            id: 1,
            title: "Modern Classrooms",
            description: "State-of-the-art digital classrooms with smart boards",
            image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 2,
            title: "Science Laboratory",
            description: "Well-equipped science labs for hands-on learning",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 3,
            title: "Library & Study Area",
            description: "Extensive library with digital resources and quiet study spaces",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 4,
            title: "Sports Complex",
            description: "Indoor and outdoor sports facilities for physical development",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 5,
            title: "School Events",
            description: "Cultural programs and annual celebrations",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 6,
            title: "Student Activities",
            description: "Extracurricular activities and student engagement",
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
    ];

    const coreValues = [
        {
            icon: Target,
            title: "Excellence",
            description: "Striving for academic and personal excellence in all endeavors"
        },
        {
            icon: Heart,
            title: "Compassion",
            description: "Fostering empathy, kindness, and care for others"
        },
        {
            icon: Shield,
            title: "Integrity",
            description: "Building character through honesty, responsibility, and ethical behavior"
        },
        {
            icon: Lightbulb,
            title: "Innovation",
            description: "Encouraging creativity, critical thinking, and problem-solving"
        },
        {
            icon: Globe,
            title: "Global Perspective",
            description: "Preparing students to be responsible global citizens"
        },
        {
            icon: Zap,
            title: "Leadership",
            description: "Developing future leaders with confidence and vision"
        }
    ];

    const achievements = [
        {
            year: "2024",
            title: "State Excellence Award",
            description: "Recognized as the Best School in Academic Performance"
        },
        {
            year: "2023",
            title: "Digital Innovation Award",
            description: "Outstanding implementation of technology in education"
        },
        {
            year: "2022",
            title: "Green School Certification",
            description: "Environmentally sustainable practices and eco-friendly initiatives"
        },
        {
            year: "2021",
            title: "Sports Championship",
            description: "Inter-school sports competition winners"
        }
    ];

    const nextGallerySlide = () => {
        setCurrentGallerySlide((prev) => (prev + 1) % galleryImages.length);
    };

    const prevGallerySlide = () => {
        setCurrentGallerySlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    useEffect(() => {
        const galleryTimer = setInterval(() => {
            setCurrentGallerySlide((prev) => (prev + 1) % galleryImages.length);
        }, 4000);

        return () => clearInterval(galleryTimer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
            {/* Gallery Section */}
            <section className="py-5 bg-white  pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                    <div className="relative">
                        {/* Main Gallery Carousel */}
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentGallerySlide * 100}%)` }}
                            >
                                {galleryImages.map((image, index) => (
                                    <div key={image.id} className="w-full flex-shrink-0 relative">
                                        <div className="aspect-video relative">
                                            <img
                                                src={image.image}
                                                alt={image.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{image.title}</h3>
                                                <p className="text-blue-100 text-lg">{image.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevGallerySlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextGallerySlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Slide Indicators */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {galleryImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentGallerySlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentGallerySlide === index
                                            ? 'bg-white scale-125'
                                            : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {galleryImages.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setCurrentGallerySlide(index)}
                                    className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${currentGallerySlide === index
                                        ? 'ring-4 ring-blue-500 ring-offset-2'
                                        : 'hover:ring-2 hover:ring-blue-300'
                                        }`}
                                >
                                    <img
                                        src={image.image}
                                        alt={image.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 transition-opacity duration-300 ${currentGallerySlide === index ? 'bg-blue-500/20' : 'bg-black/0 hover:bg-black/20'
                                        }`}></div>
                                </button>
                            ))}
                        </div>

                        {/* Facility Stats */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-2">50+</h3>
                                <p className="text-blue-700">Modern Classrooms</p>
                            </div>

                            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-900 mb-2">10,000+</h3>
                                <p className="text-green-700">Books in Library</p>
                            </div>

                            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Trophy className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-purple-900 mb-2">15+</h3>
                                <p className="text-purple-700">Sports Facilities</p>
                            </div>

                            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-orange-900 mb-2">100%</h3>
                                <p className="text-orange-700">Pass Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* School History & Overview */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Our Story
                            </h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Established in 2010, Dr. Rajendra Prasad Purva Madhyamik Vidyalaya was founded with a vision
                                to provide quality education that combines traditional values with modern teaching methodologies.
                                Named after India's first President, our school embodies the principles of knowledge, integrity,
                                and service to society.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Over the past 15 years, we have grown from a small institution to a leading educational center,
                                serving over 500 students and maintaining a 100% pass rate. Our commitment to excellence has
                                earned us recognition as one of the top schools in the region.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-4 bg-blue-50 rounded-xl">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                                    <p className="text-gray-700 font-medium">Students</p>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-xl">
                                    <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                                    <p className="text-gray-700 font-medium">Teachers</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 text-white shadow-2xl">
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>

                                <h3 className="text-2xl font-bold mb-4 flex items-center">
                                    <Award className="mr-3 w-8 h-8 text-yellow-300" />
                                    Recognition & Awards
                                </h3>
                                <div className="space-y-3">
                                    {achievements.map((achievement, index) => (
                                        <div key={index} className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                            <div className="font-semibold text-yellow-300">{achievement.year}</div>
                                            <div className="font-medium">{achievement.title}</div>
                                            <div className="text-sm text-blue-100">{achievement.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision & Values */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Our Foundation
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles and values that guide our educational philosophy and approach
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center mb-6">
                                <Eye className="w-8 h-8 text-blue-600 mr-3" />
                                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                To be a premier educational institution that nurtures global citizens equipped with
                                knowledge, skills, and values to contribute meaningfully to society and lead with
                                integrity in an ever-changing world.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center mb-6">
                                <Target className="w-8 h-8 text-purple-600 mr-3" />
                                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                To provide comprehensive, student-centered education that fosters academic excellence,
                                character development, and lifelong learning through innovative teaching methods,
                                modern facilities, and a supportive learning environment.
                            </p>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div>
                        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Core Values</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {coreValues.map((value, index) => (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:transform hover:scale-105">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <value.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* Leadership Team */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Leadership Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Meet the dedicated professionals who guide our educational mission
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow duration-300">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Rajesh Kumar</h3>
                            <p className="text-blue-600 font-medium mb-4">Principal</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                With over 20 years in education, Dr. Kumar brings visionary leadership
                                and a passion for student development to our school community.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow duration-300">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ms. Priya Sharma</h3>
                            <p className="text-green-600 font-medium mb-4">Academic Director</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Leading our academic programs with innovative teaching methods
                                and curriculum development expertise spanning 15 years.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow duration-300">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Mr. Amit Patel</h3>
                            <p className="text-purple-600 font-medium mb-4">Student Affairs Head</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Dedicated to student welfare and extracurricular development,
                                ensuring holistic growth for every student in our care.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Join Our School Family
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Discover the difference that quality education, caring teachers, and a supportive
                        community can make in your child's future.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                            Apply Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}