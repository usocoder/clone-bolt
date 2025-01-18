import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import type { Case } from '../types/case';

interface CaseCardProps {
  case: Case;
  onOpen: (caseData: Case) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ case: caseData, onOpen }) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform">
      <img
        src={caseData.image}
        alt={caseData.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{caseData.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-purple-400">${caseData.price.toFixed(2)}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowItems(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Eye size={16} />
              View Items
            </button>
            <button
              onClick={() => onOpen(caseData)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Open Case
            </button>
          </div>
        </div>
      </div>

      {/* Items Modal */}
      {showItems && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowItems(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">{caseData.name} Items</h2>

            <div className="grid grid-cols-2 gap-4">
              {caseData.items.map((item) => (
                <div
                  key={item.id}
                  className={`
                    bg-gray-800 p-4 rounded-lg border-2
                    ${item.rarity === 'common' && 'border-gray-500'}
                    ${item.rarity === 'uncommon' && 'border-blue-500'}
                    ${item.rarity === 'rare' && 'border-purple-500'}
                    ${item.rarity === 'legendary' && 'border-yellow-500'}
                  `}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <h3 className="text-white font-medium text-lg mb-1">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className={`
                      font-bold
                      ${item.rarity === 'common' && 'text-gray-400'}
                      ${item.rarity === 'uncommon' && 'text-blue-400'}
                      ${item.rarity === 'rare' && 'text-purple-400'}
                      ${item.rarity === 'legendary' && 'text-yellow-400'}
                    `}>
                      {item.multiplier}x
                    </span>
                    <span className="text-gray-400 text-sm">
                      {(item.odds * 100).toFixed(3)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseCard;