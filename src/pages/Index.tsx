
import React from 'react';
import Tamagotchi from '@/components/Tamagotchi';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-tamagotchi-pink via-tamagotchi-blue to-tamagotchi-purple p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Tamagotchi />
        <div className="text-center mt-8 text-xs text-gray-600">
          <p>Take care of your virtual pet! Feed it, play with it, and make sure it gets enough rest.</p>
          <p className="mt-2">© 2025 Tamagotchi Revival</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
