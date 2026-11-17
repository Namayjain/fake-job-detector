"use client";

import React from "react";
import {
  ShieldCheck,
  Github,
  ExternalLink,
  Code2,
  Terminal,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>SCSCIT JOB-AUTHENTICATOR</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              School of Computer Science &amp; Information Technology project for automated real vs. fake job posting detection.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => scrollTo("detector")} className="hover:text-white transition-colors">
                  Job Detector
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("threat-intelligence")} className="hover:text-white transition-colors">
                  Common Scams
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("how-it-works")} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("academic-project")} className="hover:text-white transition-colors">
                  Project Details
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Technology Stack
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Python 3.12 &bull; FastAPI</li>
              <li>Scikit-Learn 1.6.1 (LinearSVC)</li>
              <li>NLTK WordNet Lemmatizer</li>
              <li>Next.js 14 App Router</li>
              <li>Tailwind CSS &bull; Three.js</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              API &amp; Source
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://github.com/Namayjain/fake-job-detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={`${API_URL}/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Swagger API Docs</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={`${API_URL}/health`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Code2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Health Check Endpoint</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>&copy; {new Date().getFullYear()} SCSCIT Job Authenticator. Academic Project.</p>
          <p>Built with FastAPI, Scikit-Learn, and Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
