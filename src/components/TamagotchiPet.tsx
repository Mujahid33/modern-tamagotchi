
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

type PetState = 'idle' | 'happy' | 'sad' | 'eating' | 'sleeping';

interface TamagotchiPetProps {
  state: PetState;
}

const TamagotchiPet: React.FC<TamagotchiPetProps> = ({ state }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={cn(
        "relative w-32 h-32 md:w-40 md:h-40 transition-all duration-300", 
        state === 'happy' && "animate-bounce-slight", 
        state === 'sad' && "animate-wiggle", 
        state === 'eating' && "animate-pulse", 
        state === 'sleeping' && "opacity-80"
      )}>
        {/* Pet Body */}
        <div className={cn(
          "absolute inset-0 rounded-full",
          isDark ? "bg-tamagotchi-purple/70" : "bg-tamagotchi-purple"
        )}></div>
        
        {/* Eyes */}
        <div className={cn(
          "absolute top-1/4 left-1/4 w-5 h-5 md:w-6 md:h-6 rounded-full", 
          isDark ? "bg-white" : "bg-black",
          state === 'sleeping' && "h-1 rounded-full translate-y-2",
          state === 'happy' && "h-5 md:h-6"
        )}></div>
        <div className={cn(
          "absolute top-1/4 right-1/4 w-5 h-5 md:w-6 md:h-6 rounded-full",
          isDark ? "bg-white" : "bg-black",
          state === 'sleeping' && "h-1 rounded-full translate-y-2",
          state === 'happy' && "h-5 md:h-6"
        )}></div>
        
        {/* Mouth */}
        <div className={cn(
          "absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-8 h-4 md:w-10 md:h-5",
          state === 'happy' && (isDark ? "bg-white" : "bg-black") + " rounded-b-full",
          state === 'sad' && (isDark ? "bg-white" : "bg-black") + " rounded-t-full translate-y-2",
          state === 'eating' && (isDark ? "bg-white" : "bg-black") + " rounded-full animate-pulse",
          state === 'sleeping' && "hidden"
        )}></div>
        
        {/* Z's when sleeping */}
        {state === 'sleeping' && (
          <>
            <div className="absolute -top-2 right-0 text-lg font-bold dark:text-white">z</div>
            <div className="absolute -top-6 right-2 text-xl font-bold dark:text-white">Z</div>
            <div className="absolute -top-10 right-4 text-2xl font-bold dark:text-white">Z</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TamagotchiPet;
