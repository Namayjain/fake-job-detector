"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, ArrowRight, Activity, Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-3.5 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 text-indigo-400 group-hover:text-pink-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                SCSCIT JOB-AUTHENTICATOR
              </span>
              <span className="hidden md:inline-flex text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 tracking-wider">
                v2.4 ML
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
              School of Computer Science &amp; IT &bull; AI Fraud Inquest Lab
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <button
            onClick={() => scrollTo("detector")}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Live Detector
          </button>
          <button
            onClick={() => scrollTo("threat-intelligence")}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Threat Intel
          </button>
          <button
            onClick={() => scrollTo("architecture")}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            ML Architecture
          </button>
          <button
            onClick={() => scrollTo("academic-research")}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            SCSCIT Research
          </button>
        </nav>

        {/* Status Pill & Action CTA */}
        <div className="hidden sm:flex items-center space-x-3.5">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-semibold">
            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline === true
                  ? "bg-emerald-500 animate-pulse"
                  : backendOnline === false
                  ? "bg-rose-500"
                  : "bg-amber-400"
              }`}
            ></span>
            <span className="text-slate-600">FastAPI ML:</span>
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
                ? "Active"
                : backendOnline === false
                ? "Offline"
                : "Checking"}
            </strong>
          </div>

          <button
            onClick={() => scrollTo("detector")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 shadow-md shadow-indigo-500/25 transition-all flex items-center space-x-1.5"
          >
            <span>Scan Specimen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <button
            onClick={() => scrollTo("detector")}
            className="block w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-indigo-600"
          >
            Live Detector
          </button>
          <button
            onClick={() => scrollTo("threat-intelligence")}
            className="block w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-indigo-600"
          >
            Threat Intelligence
          </button>
          <button
            onClick={() => scrollTo("architecture")}
            className="block w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-indigo-600"
          >
            ML Architecture
          </button>
          <button
            onClick={() => scrollTo("academic-research")}
            className="block w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-indigo-600"
          >
            SCSCIT Research
          </button>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">API Status:</span>
            <span className={`text-xs font-bold ${backendOnline ? "text-emerald-600" : "text-rose-600"}`}>
              {backendOnline ? "Online (8000)" : "Offline"}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
