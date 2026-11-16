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
      <Navbar />
      <HeroSection />
      <AuthenticatorApp />
      <ThreatIntelligence />
      <ModelArchitecture />
      <AcademicSection />
      <Footer />
    </div>
  );
}
