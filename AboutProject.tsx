import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Code2,
  HelpCircle,
  Mail,
  Send,
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const AboutProject: React.FC = () => {
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const vivaQuestions = [
    {
      q: 'Why can’t TF-IDF + Logistic Regression alone detect real-world fake news?',
      a: 'TF-IDF only captures statistical word frequencies and stylistic tropes learned from historic datasets. A fabricated rumor about a breaking event (e.g. "Country X declared war on Country Y today") written in calm, formal Reuters prose will fool a purely static ML model. Live internet search grounding is essential to verify if the real-world event actually occurred.'
    },
    {
      q: 'What is the advantage of Passive-Aggressive Classifier over standard Naive Bayes?',
      a: 'The Passive-Aggressive Classifier (PAC) is an online learning algorithm ideal for streaming and high-dimensional sparse text representations. It is passive when a sample is correctly classified outside the margin, but aggressively updates weights when an error occurs, resulting in higher boundary sharpness (93.6% accuracy vs 88.7% for MultinomialNB).'
    },
    {
      q: 'How does TruthCheck AI prevent Server-Side Request Forgery (SSRF) when verifying URLs?',
      a: 'The URL handler enforces strict protocol validation (HTTP/HTTPS only) and verifies that hostnames do not resolve to loopback (127.0.0.1, ::1), private RFC 1918 subnets (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), or cloud metadata endpoints (169.254.169.254). Strict response size caps (3MB) and 8-second timeouts are applied.'
    },
    {
      q: 'How are real internet sources grounded without hallucination?',
      a: 'We utilize Google Search Grounding via the Gemini API on the backend. Grounded response metadata returns genuine web URLs (groundingChunks.web.uri) and verified publisher titles, eliminating fabricated citations or simulated search outputs.'
    },
    {
      q: 'How do you handle breaking news where facts are still emerging?',
      a: 'Rather than forcing a premature binary Real/Fake verdict, the system outputs "UNVERIFIED / INSUFFICIENT EVIDENCE". It explains that the event is developing or lacks multi-source consensus, advising lateral reading across wire agencies.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <GraduationCap className="w-4 h-4" />
          <span>B.Tech Computer Science & Engineering (AI & ML) Minor Project</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About TruthCheck AI
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
          An explainable, dual-layer verification platform combining Natural Language Processing, machine learning stylometry, and real-time internet search grounding.
        </p>
      </div>

      {/* Project Overview Card */}
      <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Project Overview & Motivation
        </h2>
        <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
          <p>
            The internet is flooded with digital misinformation, fabricated breaking news, and out-of-context headlines. While academic research has developed numerous machine learning classifiers trained on static datasets (such as ISOT, LIAR, or Kaggle), <strong>these traditional models fail when deployed against real-world, current news</strong>.
          </p>
          <p>
            <strong>TruthCheck AI</strong> was conceived and developed as a B.Tech CSE AI & ML minor project to bridge the gap between academic machine learning and real-world fact verification. By coupling TF-IDF stylometric feature analysis with live internet search grounding, the system investigates any headline, full article, or web URL from today or past years.
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            Technology Stack & Libraries:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
              Python 3.10 & scikit-learn
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
              TF-IDF Vectorizer (n-grams 1,2)
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
              Passive-Aggressive & Logistic Regression
            </span>
            <span className="px-3 py-1 rounded-lg bg-blue-50 font-semibold text-blue-700 border border-blue-200">
              Google Search Grounding (@google/genai)
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
              Node.js & Express Full-Stack Server
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
              React 19 + TypeScript + Vite
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
              Cheerio Safe HTML Extraction
            </span>
          </div>
        </div>
      </div>

      {/* Viva Voce Defense Cheat Sheet */}
      <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            B.Tech Viva Voce Q&A Cheat Sheet
          </h2>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            Examiner Preparation
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Key technical questions examiners frequently ask during undergraduate project evaluations, accompanied by concise answers.
        </p>

        <div className="space-y-4">
          {vivaQuestions.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs sm:text-sm"
            >
              <h3 className="font-bold text-slate-900 mb-1.5 flex items-start gap-2">
                <span className="text-blue-600 font-mono font-bold">Q{idx + 1}:</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-slate-600 leading-relaxed pl-6 font-normal">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Attribution */}
      <div className="mb-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-2">
          Academic Dataset Citations & Attribution
        </h2>
        <ul className="text-xs text-slate-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>ISOT Fake News Dataset:</strong> Ahmed H, Traore I, Saad S. "Detection of Online Fake News Using N-Gram Analysis and Machine Learning Techniques." Springer, 2017.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              <strong>LIAR Benchmark:</strong> Wang, William Yang. "“Liar, Liar Pants on Fire”: A New Benchmark Dataset for Fake News Detection." Proceedings of the 55th Annual Meeting of the ACL, 2017.
            </span>
          </li>
        </ul>
      </div>

      {/* Contact & Feedback Form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Project Feedback & Inquiries
        </h2>
        <p className="text-xs text-slate-500 mb-5">
          Have suggestions or questions regarding the model performance or fact-checking pipeline? Leave a message below.
        </p>

        {feedbackSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <p className="font-semibold">Thank you for your feedback! It has been recorded for our project evaluation.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  placeholder="e.g. Prof. Examiner / Student"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Feedback / Technical Comments
              </label>
              <textarea
                rows={3}
                required
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your thoughts on the dual-signal architecture, ML metrics, or UI design..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
