
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  onClick, 
  color = "bg-tamagotchi-accent", 
  disabled = false 
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl transition-all",
        color,
        disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
      )}
    >
      <div className="text-lg">{icon}</div>
    </Button>
  );
};

export default ActionButton;
