import React from 'react';
import { GiftItem } from '../store/useGiftStore';
import { PlatformLinks } from './PlatformLinks';
import { Tag } from 'lucide-react';

interface GiftCardProps {
  item: GiftItem;
  index: number;
}

export const GiftCard: React.FC<GiftCardProps> = ({ item, index }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-primary/20 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
        <span className="flex items-center gap-1 text-primary-dark font-medium bg-primary/10 px-3 py-1 rounded-full text-sm">
          <Tag size={14} />
          {item.priceRange}
        </span>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {item.reason}
      </p>

      {item.highlight && (
        <div className="bg-primary/5 p-3 rounded-lg mb-6">
          <p className="text-xs font-bold text-primary mb-1">✨ 点睛之笔：</p>
          <p className="text-sm text-gray-700">{item.highlight}</p>
        </div>
      )}
      
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-400 mb-2">去购买：</p>
        <PlatformLinks platforms={item.platforms} />
      </div>
    </div>
  );
};
