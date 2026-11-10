/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { VerifierPage } from './pages/VerifierPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { HistoryPage } from './pages/HistoryPage';
import { ModelPerformance } from './components/ModelPerformance';
import { AboutProject } from './components/AboutProject';
import { SampleNewsItem, VerificationResult } from './lib/types';
import { SAMPLE_NEWS_ITEMS } from './lib/sample-data';
import { SupportedLanguage } from './lib/i18n';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('truthcheck_lang') as SupportedLanguage) || 'en';
  });

  const [samples, setSamples] = useState<SampleNewsItem[]>(SAMPLE_NEWS_ITEMS);
  const [activeResult, setActiveResult] = useState<VerificationResult | null>(null);
  const [pendingClaim, setPendingClaim] = useState<string | null>(null);

  // Persistent History
  const [history, setHistory] = useState<VerificationResult[]>(() => {
    try {
      const saved = localStorage.getItem('truthcheck_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('truthcheck_lang', language);
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('truthcheck_history', JSON.stringify(history.slice(0, 30)));
    } catch {
      // ignore
    }
  }, [history]);

  useEffect(() => {
    // Sync sample test cases from backend
    fetch('/api/samples')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSamples(data);
      })
      .catch(() => {});
  }, []);

  const handleVerifyComplete = (result: VerificationResult) => {
    setActiveResult(result);
    setHistory((prev) => [result, ...prev.filter((h) => h.id !== result.id)].slice(0, 30));
    setActivePage('verifier');
    setTimeout(() => {
      const el = document.getElementById('verification-result');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSelectHistoryItem = (item: VerificationResult) => {
    setActiveResult(item);
    setActivePage('verifier');
    setTimeout(() => {
      const el = document.getElementById('verification-result');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleClaimFromExplorer = (headline: string) => {
    setActiveResult(null);
    setPendingClaim(headline);
    setActivePage('verifier');
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('truthcheck_history');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
        setLanguage={setLanguage}
        historyCount={history.length}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={(page) => setActivePage(page)}
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {activePage === 'verifier' && (
          <VerifierPage
            samples={samples}
            activeResult={activeResult}
            onVerifyComplete={handleVerifyComplete}
            onClearResult={() => setActiveResult(null)}
            language={language}
            setLanguage={setLanguage}
            pendingClaim={pendingClaim}
            onClearPendingClaim={() => setPendingClaim(null)}
          />
        )}

        {activePage === 'explorer' && (
          <ExplorerPage
            onSelectClaim={handleClaimFromExplorer}
            language={language}
          />
        )}

        {activePage === 'metrics' && (
          <ModelPerformance />
        )}

        {activePage === 'history' && (
          <HistoryPage
            history={history}
            onSelectResult={handleSelectHistoryItem}
            onClearHistory={handleClearHistory}
            language={language}
          />
        )}

        {activePage === 'about' && (
          <AboutProject />
        )}
      </main>

      <Footer onNavigate={(page) => setActivePage(page)} />
    </div>
  );
}
