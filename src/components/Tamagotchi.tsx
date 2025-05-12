
import React, { useState, useEffect, useCallback } from 'react';
import TamagotchiPet from './TamagotchiPet';
import StatBar from './StatBar';
import ActionButton from './ActionButton';
import { useToast } from "@/components/ui/use-toast";

// Pet state type
type PetState = 'idle' | 'happy' | 'sad' | 'eating' | 'sleeping';

const Tamagotchi: React.FC = () => {
  // Core stats
  const [hunger, setHunger] = useState(80);
  const [happiness, setHappiness] = useState(70);
  const [energy, setEnergy] = useState(90);
  const [petState, setPetState] = useState<PetState>('idle');
  const [isSleeping, setIsSleeping] = useState(false);
  
  const { toast } = useToast();
  
  const MAX_STAT = 100;
  const TIME_DECREMENT_MS = 10000; // 10 seconds
  
  // Decrease stats over time
  useEffect(() => {
    if (isSleeping) return; // Don't decrease stats while sleeping
    
    const interval = setInterval(() => {
      setHunger(prev => Math.max(prev - 2, 0));
      setHappiness(prev => Math.max(prev - 1, 0));
      setEnergy(prev => Math.max(prev - 3, 0));
    }, TIME_DECREMENT_MS);
    
    return () => clearInterval(interval);
  }, [isSleeping]);
  
  // Update pet state based on stats
  useEffect(() => {
    if (isSleeping) {
      setPetState('sleeping');
      return;
    }
    
    const avgStats = (hunger + happiness + energy) / 3;
    
    if (avgStats < 30) {
      setPetState('sad');
    } else if (avgStats > 70) {
      setPetState('happy');
    } else {
      setPetState('idle');
    }
    
    // Show warning notifications when stats are low
    if (hunger <= 20) {
      toast({
        title: "Your pet is hungry!",
        description: "Feed your pet before it gets too hungry.",
      });
    }
    
    if (happiness <= 20) {
      toast({
        title: "Your pet is unhappy!",
        description: "Play with your pet to improve its mood.",
      });
    }
    
    if (energy <= 20) {
      toast({
        title: "Your pet is tired!",
        description: "Let your pet sleep to restore its energy.",
      });
    }
    
  }, [hunger, happiness, energy, isSleeping, toast]);
  
  // Actions
  const feedPet = useCallback(() => {
    if (isSleeping) return;
    
    setPetState('eating');
    setHunger(prev => Math.min(prev + 15, MAX_STAT));
    setHappiness(prev => Math.min(prev + 5, MAX_STAT));
    
    toast({
      title: "Yum yum!",
      description: "Your pet enjoyed the food.",
    });
    
    // Return to normal state after eating animation
    setTimeout(() => {
      setPetState('idle');
    }, 2000);
  }, [isSleeping, toast]);
  
  const playWithPet = useCallback(() => {
    if (isSleeping) return;
    
    if (energy < 10) {
      toast({
        title: "Too tired to play",
        description: "Your pet needs to rest first.",
        variant: "destructive",
      });
      return;
    }
    
    setPetState('happy');
    setHappiness(prev => Math.min(prev + 15, MAX_STAT));
    setEnergy(prev => Math.max(prev - 10, 0));
    setHunger(prev => Math.max(prev - 5, 0));
    
    toast({
      title: "So fun!",
      description: "Your pet had a great time playing.",
    });
    
    // Return to normal state after play animation
    setTimeout(() => {
      setPetState('idle');
    }, 2000);
  }, [energy, isSleeping, toast]);
  
  const toggleSleep = useCallback(() => {
    setIsSleeping(prev => !prev);
    
    if (!isSleeping) {
      toast({
        title: "Sweet dreams!",
        description: "Your pet is now sleeping and will recover energy.",
      });
      
      // Increase energy while sleeping
      const sleepInterval = setInterval(() => {
        setEnergy(prev => Math.min(prev + 5, MAX_STAT));
      }, 3000);
      
      // Clean up interval
      return () => clearInterval(sleepInterval);
    } else {
      toast({
        title: "Rise and shine!",
        description: "Your pet woke up feeling refreshed.",
      });
    }
  }, [isSleeping, toast]);
  
  return (
    <div className="pet-container w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-tamagotchi-dark">My Tamagotchi</h1>
        <p className="text-sm text-gray-500">Take care of your virtual pet!</p>
      </div>
      
      <div className="mb-6 aspect-square bg-tamagotchi-pink rounded-2xl p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-grid-pattern"></div>
        </div>
        <TamagotchiPet state={petState} />
      </div>
      
      <div className="mb-6">
        <StatBar label="Hunger" value={hunger} maxValue={MAX_STAT} color="#FEF7CD" />
        <StatBar label="Happiness" value={happiness} maxValue={MAX_STAT} color="#E5DEFF" />
        <StatBar label="Energy" value={energy} maxValue={MAX_STAT} color="#F2FCE2" />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <ActionButton
          icon="🍔"
          label="Feed"
          onClick={feedPet}
          color="bg-tamagotchi-yellow"
          disabled={isSleeping}
        />
        <ActionButton
          icon="🎮"
          label="Play"
          onClick={playWithPet}
          color="bg-tamagotchi-purple"
          disabled={isSleeping || energy < 10}
        />
        <ActionButton
          icon={isSleeping ? "⏰" : "😴"}
          label={isSleeping ? "Wake" : "Sleep"}
          onClick={toggleSleep}
          color="bg-tamagotchi-blue"
        />
      </div>
    </div>
  );
};

export default Tamagotchi;
