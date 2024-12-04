'use client';

import { useEffect, useState } from 'react';
import { Textarea } from "./ui/textarea";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function AutoResizeTextarea({ 
  value, 
  onChange, 
  disabled,
  placeholder 
}: AutoResizeTextareaProps) {
  const [height, setHeight] = useState("auto");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const textarea = document.createElement('textarea');
    textarea.style.visibility = 'hidden';
    textarea.style.position = 'absolute';
    textarea.style.width = '100%';
    textarea.style.padding = '8px';
    textarea.value = value;
    document.body.appendChild(textarea);
    
    const scrollHeight = textarea.scrollHeight;
    document.body.removeChild(textarea);
    
    const baseHeight = 36; // Base height for one line
    const maxHeight = 120; // Maximum height when not expanded
    
    setHeight(isExpanded ? `${scrollHeight}px` : `${Math.min(scrollHeight, maxHeight)}px`);
  }, [value, isExpanded]);

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        style={{ height }}
        className={`w-full transition-all duration-200 overflow-y-auto ${
          isExpanded ? 'max-h-[300px]' : 'max-h-[120px]'
        }`}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      />
      {!isExpanded && value.length > 50 && (
        <div className="absolute bottom-1 right-1 text-xs text-gray-400">
          Click to expand
        </div>
      )}
    </div>
  );
}