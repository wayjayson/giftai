import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Gift, Heart } from 'lucide-react';
import { useGiftStore } from '../store/useGiftStore';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const setStep = useGiftStore((state) => state.setStep);

  const handleStart = () => {
    setStep(2);
    navigate('/form');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <Gift size={80} className="text-primary relative z-10 drop-shadow-lg" />
        <Heart 
          size={30} 
          className="text-red-400 absolute -top-2 -right-2 animate-bounce z-10" 
          fill="currentColor" 
        />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight">
        寻找那份<span className="text-primary">独一无二</span>的<br/>
        温馨礼物
      </h1>
      
      <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
        不论是送给谁，<br/>
        我们都能帮你找到最贴心、最温暖的惊喜。
      </p>
      
      <Button 
        size="lg" 
        onClick={handleStart}
        className="shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      >
        开始定制惊喜
      </Button>
    </div>
  );
};

export default Home;
