"use client";

import React from "react";
import Image from "next/image";
import { Cpu } from "lucide-react";

export default function ModelArchitecture() {
  const steps = [
    {
      step: "01",
      title: "Text Preprocessing",
      description:
        "Converts text to lowercase, removes HTML tags, strips URLs and email addresses, and discards numbers and punctuation.",
      code: "re.sub(r'<[^>]+>', ' ', text)",
    },
    {
      step: "02",
      title: "NLTK Lemmatization",
      description:
        "Words are lemmatized to their dictionary base forms using WordNetLemmatizer, and common English stopwords are removed.",
      code: "[lemmatizer.lemmatize(w) for w in words]",
    },
    {
      step: "03",
      title: "TF-IDF Vectorization",
      description:
        "Transforms cleaned text into a 6,000-feature numerical matrix capturing unigrams and bigrams weighted by term frequency-inverse document frequency.",
      code: "TfidfVectorizer(max_features=6000, ngram_range=(1,2))",
    },
    {
      step: "04",
      title: "Calibrated LinearSVC",
      description:
        "Uses a Linear Support Vector Classifier calibrated with Platt scaling (sigmoid) to output well-calibrated class probabilities.",
      code: "CalibratedClassifierCV(LinearSVC(), method='sigmoid')",
    },
    {
      step: "05",
      title: "Heuristic Red Flags",
      description:
        "Evaluates the posting for common scam phrases (wire transfer, Western Union, Telegram interviews) and missing corporate assets.",
      code: "detect_heuristic_flags(request, raw_text)",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>Architecture &amp; Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How the Detection System Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            The project uses a pipeline combining text preprocessing, feature extraction, supervised classification, and heuristic rule checking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xl font-bold text-indigo-500 font-mono block mb-1">
                  {s.step}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <code className="text-[10px] font-mono text-indigo-700 bg-indigo-50/70 p-1.5 rounded-lg block truncate">
                  {s.code}
                </code>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-6 space-y-3">
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold">
              Model Evaluation
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              Trained on 18,000 Real &amp; Fake Postings
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The model was trained on the Employment Scam Aegean Dataset (EMSAD). Since fake job postings make up only about 5% of all listings, Platt sigmoid calibration was applied to ensure the probability outputs reflect real likelihood rather than raw boundary distances.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block">Authentic Accuracy</span>
                <span className="text-xl font-bold text-emerald-600">99.4%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block">Fraud Recall</span>
                <span className="text-xl font-bold text-indigo-600">91.8%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block">Features Used</span>
                <span className="text-xl font-bold text-purple-600">6,000 TF-IDF</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block">Response Time</span>
                <span className="text-xl font-bold text-blue-600">&lt; 15 ms</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-72 sm:h-80 lg:h-96 rounded-xl overflow-hidden border border-slate-200 bg-slate-950 shadow-inner">
            <Image
              src="/images/model-evaluation.png"
              alt="LinearSVC Model Evaluation Dashboard and Confusion Matrix"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
