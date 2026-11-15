"use client";

import React from "react";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
} from "lucide-react";

export default function AcademicSection() {
  return (
    <section id="academic-project" className="py-16 bg-slate-50 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src="/images/lab-research.jpg"
                alt="SCSCIT Academic Computing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded bg-indigo-600 text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>SCSCIT Project</span>
                </span>
                <h4 className="text-base font-bold text-white mt-1.5">
                  Applied Machine Learning &amp; NLP
                </h4>
                <p className="text-xs text-slate-300">
                  School of Computer Science &amp; Information Technology
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Project Scope &amp; Methodology</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              School of Computer Science &amp; Information Technology
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              This end-to-end full-stack application was built as an academic subject project. It demonstrates how machine learning models developed in Google Colab can be integrated into a functional, user-facing web application with a FastAPI backend and a Next.js frontend.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700">
                  <strong>Model Export:</strong> Trained models (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">best_fake_job_model.joblib</code> and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">tfidf_vectorizer.joblib</code>) are loaded into memory on server startup.
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700">
                  <strong>Text Cleaning:</strong> Reproduces exact preprocessing steps including HTML stripping, regex URL removal, WordNet lemmatization, and English stopword filtering.
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700">
                  <strong>Hybrid Architecture:</strong> Combines statistical ML predictions with rule-based heuristics to flag wire transfer scams, unverified chat interviews, and missing logos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
