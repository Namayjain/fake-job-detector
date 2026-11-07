"use client";

import React from "react";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  ExternalLink,
  Code2,
} from "lucide-react";

export default function AcademicSection() {
  return (
    <section id="academic-research" className="py-16 bg-slate-50/70 border-t border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Research Image & Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <Image
                src="/images/lab-research.jpg"
                alt="SCSCIT Academic Computing Lab"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-3 py-1 rounded-full bg-indigo-600/90 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center space-x-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>SCSCIT Academic Project</span>
                </span>
                <h4 className="text-lg font-bold text-white mt-2">
                  Applied Machine Learning &amp; NLP Lab
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  School of Computer Science &amp; Information Technology
                </p>
              </div>
            </div>
          </div>

          {/* Right: Academic Specifications */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Academic Curriculum &amp; Evaluation</span>
            </div>

            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              School of Computer Science &amp; Information Technology
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              This end-to-end full-stack software system was engineered as a comprehensive subject project under the <strong>AI &amp; Machine Learning curriculum</strong>. It bridges the gap between theoretical Natural Language Processing models trained in Google Colab notebooks and production-ready web services.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>Colab Model Serialization:</strong> Saved via <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">joblib</code> and served with FastAPI running pinned scikit-learn 1.6.1.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>Deterministic Preprocessing:</strong> Strict reproduction of lowercase, HTML tag stripping, URL/email cleansing, WordNet lemmatization, and English stopword elimination.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  <strong>Social Good Impact:</strong> Designed to prevent financial exploitation of vulnerable graduates and remote job seekers facing predatory employment schemes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
