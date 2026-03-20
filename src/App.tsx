import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useGiftStore } from './store/useGiftStore';
import { StepIndicator } from './components/StepIndicator';
import { Loader2 } from 'lucide-react';

const Home = React.lazy(() => import('./pages/Home'));
const FormPage = React.lazy(() => import('./pages/FormPage'));
const ResultPage = React.lazy(() => import('./pages/ResultPage'));

const App: React.FC = () => {
  const { step } = useGiftStore();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-cream font-sans text-gray-800">
      <header className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary tracking-tight">GiftAI</span>
            <span className="text-xs bg-primary/10 text-primary-dark px-2 py-1 rounded-full font-medium">Beta</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!isHome && <StepIndicator currentStep={step} />}
        
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>© 2025 GiftAI - 为爱定制温暖惊喜</p>
      </footer>
    </div>
  );
};

export default App;
