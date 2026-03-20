import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGiftStore } from '../store/useGiftStore';
import { Button } from '../components/common/Button';
import { Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';

const PREDEFINED_HOBBIES = [
  '摄影', '旅行', '阅读', '美食', '运动', '音乐', 
  '电影', '绘画', '手工', '科技', '游戏', '宠物',
  '时尚', '美妆', '园艺', '烹饪'
];

const PREDEFINED_OCCASIONS = [
  '生日', '纪念日', '情人节', '圣诞节', '新年', 
  '表白', '道歉', '感谢', '乔迁', '毕业', '惊喜', '其他'
];

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const { userInput, setUserInput, setStep, setIsLoading, setRecommendations, setError } = useGiftStore();
  
  const [customHobby, setCustomHobby] = useState('');
  const [customOccasion, setCustomOccasion] = useState('');
  const [showCustomOccasionInput, setShowCustomOccasionInput] = useState(false);

  const handleGenderSelect = (gender: string) => {
    setUserInput({ gender });
  };

  const handleOccasionSelect = (occasion: string) => {
    if (occasion === '其他') {
      setShowCustomOccasionInput(true);
      setUserInput({ occasion: customOccasion || '其他' });
    } else {
      setShowCustomOccasionInput(false);
      setUserInput({ occasion });
    }
  };

  const handleCustomOccasionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomOccasion(value);
    setUserInput({ occasion: value });
  };

  const handleHobbyToggle = (hobby: string) => {
    const currentHobbies = userInput.hobbies;
    if (currentHobbies.includes(hobby)) {
      setUserInput({ hobbies: currentHobbies.filter(h => h !== hobby) });
    } else {
      setUserInput({ hobbies: [...currentHobbies, hobby] });
    }
  };

  const handleAddCustomHobby = () => {
    if (customHobby && !userInput.hobbies.includes(customHobby)) {
      setUserInput({ hobbies: [...userInput.hobbies, customHobby] });
      setCustomHobby('');
    }
  };

  const handleSubmit = async () => {
    if (!userInput.gender || userInput.hobbies.length === 0 || !userInput.occasion) {
      alert('请填写完整信息哦~');
      return;
    }

    setStep(3);
    setIsLoading(true);
    setError(null);
    navigate('/result');

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });

      const data = await response.json();

      if (data.success) {
        setRecommendations(data.data);
      } else {
        setError(data.message || '获取推荐失败，请稍后再试');
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('网络连接出现问题，请检查您的网络设置');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">告诉我们关于TA的细节</h2>

      {/* Gender Selection */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-3">TA是...</label>
        <div className="flex gap-4 justify-center">
          {['男生', '女生', '其他'].map((option) => (
            <button
              key={option}
              onClick={() => handleGenderSelect(option)}
              className={cn(
                "px-6 py-2 rounded-full border-2 transition-all",
                userInput.gender === option
                  ? "border-primary bg-primary/10 text-primary-dark font-bold"
                  : "border-gray-200 text-gray-500 hover:border-primary/50"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Age Slider */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-3">
          TA的年龄: <span className="text-primary text-xl font-bold">{userInput.age}</span> 岁
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={userInput.age}
          onChange={(e) => setUserInput({ age: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      {/* Hobbies Tag Cloud */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-3">TA的兴趣爱好 (可多选)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {PREDEFINED_HOBBIES.map((hobby) => (
            <button
              key={hobby}
              onClick={() => handleHobbyToggle(hobby)}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition-all",
                userInput.hobbies.includes(hobby)
                  ? "bg-primary text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {hobby}
            </button>
          ))}
        </div>
        
        {/* Custom Hobby Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customHobby}
            onChange={(e) => setCustomHobby(e.target.value)}
            placeholder="详细说明或增加其他爱好..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomHobby()}
          />
          <button
            onClick={handleAddCustomHobby}
            className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        
        {/* Selected Custom Hobbies display (if not in predefined) */}
        <div className="flex flex-wrap gap-2 mt-2">
            {userInput.hobbies.filter(h => !PREDEFINED_HOBBIES.includes(h)).map(hobby => (
                <span key={hobby} className="px-3 py-1 rounded-full text-sm bg-primary text-white shadow-md flex items-center gap-1">
                    {hobby}
                    <X size={12} className="cursor-pointer" onClick={() => handleHobbyToggle(hobby)}/>
                </span>
            ))}
        </div>
      </div>

      {/* Occasion Selection */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-3">送礼场景</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {PREDEFINED_OCCASIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleOccasionSelect(option)}
              className={cn(
                "px-4 py-2 rounded-full border-2 transition-all text-sm",
                (userInput.occasion === option || (option === '其他' && showCustomOccasionInput))
                  ? "border-primary bg-primary/10 text-primary-dark font-bold"
                  : "border-gray-200 text-gray-500 hover:border-primary/50"
              )}
            >
              {option}
            </button>
          ))}
        </div>
        {showCustomOccasionInput && (
          <input
            type="text"
            value={customOccasion}
            onChange={handleCustomOccasionChange}
            placeholder="请输入具体的送礼场景..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm animate-fade-in"
          />
        )}
      </div>

      {/* Additional Info */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-3">其他补充内容 (选填)</label>
        <textarea
          value={userInput.additionalInfo || ''}
          onChange={(e) => setUserInput({ additionalInfo: e.target.value })}
          placeholder="例如：TA最近在准备考试、喜欢复古风格、家里养了两只猫..."
          className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm min-h-[100px] resize-none"
        />
      </div>

      {/* Budget Slider */}
      <div className="mb-10">
        <label className="block text-gray-700 font-medium mb-3">
          预算范围: <span className="text-primary font-bold">¥{userInput.budgetMin} - ¥{userInput.budgetMax}</span>
        </label>
        <div className="flex items-center gap-4">
           <div className="flex-1">
             <label className="text-xs text-gray-400">最低预算</label>
             <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={userInput.budgetMin}
                onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val < userInput.budgetMax) setUserInput({ budgetMin: val });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
           </div>
           <div className="flex-1">
             <label className="text-xs text-gray-400">最高预算</label>
             <input
                type="range"
                min="0"
                max="10000"
                step="50"
                value={userInput.budgetMax}
                onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val > userInput.budgetMin) setUserInput({ budgetMax: val });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
           </div>
        </div>
      </div>

      <div className="text-center">
        <Button size="lg" onClick={handleSubmit} className="w-full md:w-auto min-w-[200px] shadow-lg">
          生成推荐
        </Button>
      </div>
    </div>
  );
};

export default FormPage;
