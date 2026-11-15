"use client";

import React from "react";
import Image from "next/image";
import {
  CreditCard,
  Send,
  Building,
  Mail,
  AlertOctagon,
} from "lucide-react";

export default function ThreatIntelligence() {
  const commonScams = [
    {
      icon: CreditCard,
      title: "Fake Checks & Wire Transfers",
      color: "text-rose-600 bg-rose-50 border-rose-200",
      description:
        "Scammers send fake cashier checks to applicants, asking them to deposit the check and wire a portion back to a 'vendor' for equipment. The check later bounces, leaving the applicant liable.",
      example: "Example: 'We will mail you a $3,500 check to purchase office supplies from our approved vendor.'",
    },
    {
      icon: Send,
      title: "Telegram & Unverified Chat Interviews",
      color: "text-amber-600 bg-amber-50 border-amber-200",
      description:
        "Legitimate employers use verified applicant tracking systems or video calls. Fraudulent listings often redirect candidates to Telegram or WhatsApp text chats.",
      example: "Example: 'Contact our hiring manager on Telegram at @fast_recruit to start your text interview.'",
    },
    {
      icon: Building,
      title: "Missing Company Profile & Logo",
      color: "text-purple-600 bg-purple-50 border-purple-200",
      description:
        "Scam listings frequently omit company background information, use generic descriptions without official registration details, or lack a verified corporate logo.",
      example: "Example: Completely empty company profile with vague claims of fast, unlimited earnings.",
    },
    {
      icon: Mail,
      title: "Free Public Email Domains",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      description:
        "Official recruiters send correspondence from corporate domains (e.g., name@company.com), not free webmail providers like Gmail or Yahoo.",
      example: "Example: 'Submit your resume and bank details to hr-careers-dept@gmail.com.'",
    },
  ];

  return (
    <section id="threat-intelligence" className="py-16 bg-slate-50 border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-3">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Fraud Patterns</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Common Online Recruitment Scams
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Understanding how fake job postings operate helps both human job seekers and machine learning classifiers identify red flags.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-12">
          
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/cyber-threat.jpg"
                alt="Cyber Threat & Fraud"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-semibold text-[10px] uppercase tracking-wider">
                  Warning Sign
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1 text-white">
                  Phishing &amp; Financial Exploitation
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Luring remote applicants with high weekly pay for minimal work to collect banking details and transfer illicit funds.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/authentic-office.jpg"
                alt="Authentic Workplace"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-semibold text-[10px] uppercase tracking-wider">
                  Authentic Posting
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1 text-white">
                  Legitimate Corporate Postings
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Detailed job requirements, clear compensation structure, official company email, and an active business presence.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {commonScams.map((scam, idx) => {
            const Icon = scam.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${scam.color} border flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                    {scam.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {scam.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 leading-snug">
                    {scam.example}
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
