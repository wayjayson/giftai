import React from 'react';
import { cn } from '../lib/utils';
import { Heart, Gift, Sparkles } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: '开始', icon: Heart },
    { id: 2, label: '定制', icon: Gift },
    { id: 3, label: '惊喜', icon: Sparkles },
  ];

  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isActive || isCompleted
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-200 text-gray-400"
                )}
              >
                <Icon size={20} />
              </div>
              <span
                className={cn(
                  "text-xs mt-2 font-medium absolute -bottom-6 w-max transition-colors duration-300",
                  isActive || isCompleted ? "text-primary-dark" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1 flex-1 mx-2 rounded-full transition-all duration-300",
                  isCompleted ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
