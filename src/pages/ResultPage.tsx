import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGiftStore } from '../store/useGiftStore';
import { GiftCard } from '../components/GiftCard';
import { Button } from '../components/common/Button';
import { Loader2, RefreshCw, ChevronLeft } from 'lucide-react';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { recommendations, isLoading, error, setStep } = useGiftStore();

  const handleBack = () => {
    setStep(2);
    navigate('/form');
  };

  const handleRetry = () => {
      // In a real app, this might trigger a re-fetch with the same params or slightly modified ones.
      // For now, we just go back to form to submit again easily.
      handleBack();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
            <Loader2 size={60} className="text-primary animate-spin relative z-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">正在为您精心挑选...</h2>
        <p className="text-gray-500 animate-pulse">AI正在分析TA的喜好，寻找最温暖的惊喜</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-50 p-6 rounded-2xl mb-6">
            <p className="text-red-500 text-lg mb-2">哎呀，出了一点小状况</p>
            <p className="text-gray-600">{error}</p>
        </div>
        <Button onClick={handleRetry} variant="outline">
          <RefreshCw size={18} className="mr-2" /> 重试
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={handleBack}
          className="text-gray-500 hover:text-primary transition-colors flex items-center"
        >
          <ChevronLeft size={20} />
          <span>返回修改</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">为您推荐的惊喜</h2>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {recommendations.map((item, index) => (
          <GiftCard key={index} item={item} index={index} />
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-500 mb-4 text-sm">对结果不满意？</p>
        <Button onClick={handleBack} variant="secondary">
          <RefreshCw size={18} className="mr-2" /> 重新生成
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
