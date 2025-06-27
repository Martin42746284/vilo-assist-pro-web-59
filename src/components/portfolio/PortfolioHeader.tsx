
import { useState, useEffect } from 'react';

interface PortfolioHeaderProps {
  isVisible: boolean;
}

const PortfolioHeader = ({ isVisible }: PortfolioHeaderProps) => {
  return (
    <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
        Études de Cas
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs
      </p>
    </div>
  );
};

export default PortfolioHeader;
