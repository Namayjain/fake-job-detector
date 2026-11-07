"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  Send,
  CreditCard,
  Building,
  Mail,
  HelpCircle,
  Eye,
  CheckCircle,
} from "lucide-react";

export default function ThreatIntelligence() {
  const [activeTab, setActiveTab] = useState<"scams" | "authentic">("scams");

  const scamTactics = [
    {
      icon: CreditCard,
      title: "Check Overpayment & Wire Transfer",
      color: "text-rose-600 bg-rose-50 border-rose-200",
      description:
        "Scammers mail counterfeit cashier checks asking you to deposit them and wire back 'vendor equipment fees' via Western Union or Zelle before the check bounces.",
      example: "'You will receive a $3,500 check to purchase your home equipment from our accredited supplier.'",
    },
    {
      icon: Send,
      title: "Unverified Telegram Interviews",
      color: "text-amber-600 bg-amber-50 border-amber-200",
      description:
        "Legitimate corporations use enterprise applicant systems or video tools. Fraudulent rings route candidates to encrypted messaging to bypass corporate fraud filters.",
      example: "'Download Telegram immediately and message @hr_global_director for your instant 10-minute text interview.'",
    },
    {
      icon: Building,
      title: "Missing Corporate Footprint",
      color: "text-purple-600 bg-purple-50 border-purple-200",
      description:
        "Scammers often leave company profiles blank or copy vague buzzwords without real corporate address, charter number, or verified enterprise logo.",
      example: "'A multinational enterprise with limitless expansion in high-yield operations.'",
    },
    {
      icon: Mail,
      title: "Public Webmail Domains",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      description:
        "Official recruiting never operates through personal free email providers such as @gmail.com, @yahoo.com, or @outlook.com.",
      example: "'Submit all resumes and identity documents directly to amazoncareers.recruiter2024@gmail.com'",
    },
  ];

  return (
    <section id="threat-intelligence" className="py-16 bg-slate-50/70 border-y border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-3">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Threat Intelligence Repository</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Anatomy of Modern Recruitment Deception
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            The FBI and FTC report over $367M lost annually to online job recruitment scams. Here is how predatory rings operate and how our dual-layer model intercepts them.
          </p>
        </div>

        {/* Visual Showcase Card with Scraped/Downloaded Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Cyber Deception Image Card */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
            <div className="relative h-72 sm:h-80 w-full">
              <Image
                src="/images/cyber-threat.jpg"
                alt="Cyber Threat Deception"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-2.5 py-1 rounded-md bg-rose-500/90 text-white font-bold text-[11px] uppercase tracking-wider">
                  High Risk Vector
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-2 text-white">
                  Wire Transfer &amp; Phishing Syndicates
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Luring remote applicants with unrealistic salaries ($6,000/week) to extract banking credentials and transfer illicit funds.
                </p>
              </div>
            </div>
          </div>

          {/* Authentic Corporate Image Card */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
            <div className="relative h-72 sm:h-80 w-full">
              <Image
                src="/images/authentic-office.jpg"
                alt="Authentic Corporate Workspace"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-white font-bold text-[11px] uppercase tracking-wider">
                  Verified Standard
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-2 text-white">
                  Legitimate Institutional Vacancies
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Clear qualification benchmarks, verified corporate registration, competitive market-standard salaries, and official branded domains.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Deep Dive Scam Vector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scamTactics.map((tactic, idx) => {
            const Icon = tactic.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${tactic.color} border flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    {tactic.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tactic.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Signature Trigger:
                  </span>
                  <p className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-200/80 leading-snug">
                    {tactic.example}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
