import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AuthenticatorApp from "@/components/AuthenticatorApp";
import ThreatIntelligence from "@/components/ThreatIntelligence";
import ModelArchitecture from "@/components/ModelArchitecture";
import AcademicSection from "@/components/AcademicSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Sticky Modern Navbar */}
      <Navbar />

      {/* 3D Interactive Hero Experience */}
      <HeroSection />

      {/* Core Live Job Authenticator Inquest Terminal */}
      <AuthenticatorApp />

      {/* Deep Threat Intelligence & Deception Taxonomy */}
      <ThreatIntelligence />

      {/* Mathematical & NLP Machine Learning Architecture */}
      <ModelArchitecture />

      {/* Academic Research & Curriculum Scope */}
      <AcademicSection />

      {/* Enterprise SaaS Footer */}
      <Footer />
    </div>
  );
}
