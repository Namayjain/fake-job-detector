"use client";

import React from "react";
import {
  ShieldCheck,
  Github,
  BookOpen,
  ExternalLink,
  Code2,
  Terminal,
} from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2 text-white font-extrabold text-base">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>SCSCIT AUTHENTICATOR</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              School of Computer Science &amp; Information Technology subject thesis project for automated job fraud prediction.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <button onClick={() => scrollTo("detector")} className="hover:text-white transition-colors">
                  Live Detector Terminal
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("threat-intelligence")} className="hover:text-white transition-colors">
                  Threat Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("architecture")} className="hover:text-white transition-colors">
                  ML Architecture
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("academic-research")} className="hover:text-white transition-colors">
                  SCSCIT Research
                </button>
              </li>
            </ul>
          </div>

          {/* Machine Learning Pipeline */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Engine Stack
            </h4>
            <ul className="space-y-1.5 font-medium text-slate-400">
              <li>Scikit-Learn 1.6.1 (Calibrated LinearSVC)</li>
              <li>NLTK WordNet Lemmatizer</li>
              <li>6,000-D TF-IDF Vectorizer</li>
              <li>FastAPI Async Engine</li>
              <li>Next.js 14 App Router + Tailwind</li>
              <li>Three.js 3D Holographic Canvas</li>
            </ul>
          </div>

          {/* Developer / Project Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Source &amp; Documentation
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <a
                  href="https://github.com/Namayjain/fake-job-detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Github className="w-3.5 h-3.5 text-slate-300" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Terminal className="w-3.5 h-3.5 text-slate-300" />
                  <span>Interactive Swagger API Docs</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8000/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Code2 className="w-3.5 h-3.5 text-slate-300" />
                  <span>Backend Health Probe</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>&copy; {new Date().getFullYear()} SCSCIT JOB-AUTHENTICATOR &bull; All Rights Reserved.</p>
          <p className="font-medium">
            Engineered with Scikit-Learn, FastAPI, Next.js, and Three.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
