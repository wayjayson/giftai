import React from 'react';
import { ExternalLink } from 'lucide-react';

interface PlatformLinksProps {
  platforms: {
    taobao: string;
    jd: string;
    pdd: string;
  };
}

export const PlatformLinks: React.FC<PlatformLinksProps> = ({ platforms }) => {
  return (
    <div className="flex gap-2 mt-4">
      <a
        href={platforms.taobao}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1 bg-[#FF5000] text-white text-xs py-2 px-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        <span>淘宝</span>
        <ExternalLink size={12} />
      </a>
      <a
        href={platforms.jd}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1 bg-[#E1251B] text-white text-xs py-2 px-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        <span>京东</span>
        <ExternalLink size={12} />
      </a>
      <a
        href={platforms.pdd}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1 bg-[#E02E24] text-white text-xs py-2 px-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        <span>拼多多</span>
        <ExternalLink size={12} />
      </a>
    </div>
  );
};
