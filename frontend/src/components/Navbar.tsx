"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch(`${apiUrl}/health`);
        setBackendOnline(res.ok);
      } catch {
        setBackendOnline(false);
      }
    }
    checkHealth();
    const interval = setInterval(checkHealth, 20000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
        
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                SCSCIT JOB-AUTHENTICATOR
              </span>
              <span className="hidden sm:inline-flex text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                AI/ML
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              School of Computer Science &amp; IT
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          <button
            onClick={() => scrollTo("detector")}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Detector
          </button>
          <button
            onClick={() => scrollTo("threat-intelligence")}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Common Scams
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo("academic-project")}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Project Details
          </button>
        </nav>

        <div className="hidden sm:flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium">
            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline === true
                  ? "bg-emerald-500"
                  : backendOnline === false
                  ? "bg-rose-500"
                  : "bg-amber-400"
              }`}
            ></span>
            <span className="text-slate-600">Backend API:</span>
            <strong
              className={
                backendOnline === true
                  ? "text-emerald-700"
                  : backendOnline === false
                  ? "text-rose-600"
                  : "text-amber-600"
              }
            >
              {backendOnline === true
                ? "Connected"
                : backendOnline === false
                ? "Offline"
                : "Checking"}
            </strong>
          </div>

          <button
            onClick={() => scrollTo("detector")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm transition-all flex items-center space-x-1.5"
          >
            <span>Scan a Job</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <button
            onClick={() => scrollTo("detector")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            Detector
          </button>
          <button
            onClick={() => scrollTo("threat-intelligence")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            Common Scams
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo("academic-project")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            Project Details
          </button>
        </div>
      )}
    </header>
  );
}
