import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  image: string;
  rarity: string;
  multiplier: number;
}

interface CaseOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  winningItem: Item;
  onComplete?: (item: Item) => void;
}

const CaseOpeningModal: React.FC<CaseOpeningModalProps> = ({
  isOpen,
  onClose,
  items,
  winningItem,
  onComplete
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setIsSpinning(true);
      startTimeRef.current = performance.now();
      
      // Animation configuration
      const totalDuration = 6000; // 6 seconds total
      const itemWidth = 200;
      const containerWidth = 800;
      const spinnerItems = Math.ceil(containerWidth / itemWidth) * 3; // Show 3 sets of items
      const spinnerWidth = spinnerItems * itemWidth;
      
      // Calculate final position to ensure winning item is centered
      const centerPosition = containerWidth / 2 - itemWidth / 2;
      const finalOffset = -(spinnerWidth - centerPosition);
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTimeRef.current;
        
        if (elapsed < totalDuration) {
          // Use easeOutQuint for smooth deceleration
          const progress = elapsed / totalDuration;
          const t = progress - 1;
          const easing = 1 + (t * t * t * t * t);
          
          const currentOffset = finalOffset * easing;
          setOffset(currentOffset);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsSpinning(false);
          setOffset(finalOffset);
          
          if (onComplete) {
            onComplete(winningItem);
          }
          
          // Add item to inventory
          const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
          inventory.push({
            ...winningItem,
            obtainedAt: new Date().toISOString()
          });
          localStorage.setItem('inventory', JSON.stringify(inventory));
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isOpen, items.length, winningItem, onComplete]);

  // Generate spinner items with padding
  const spinnerItems = [
    ...items,
    ...items,
    ...items,
    winningItem,
    ...items.slice(0, 3)
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-[800px] relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="overflow-hidden relative h-[200px] mb-4">
          {/* Center marker */}
          <div className="absolute left-1/2 w-0.5 h-full bg-purple-500 z-10">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rotate-45" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-purple-500 rotate-45" />
          </div>
          
          {/* Items container */}
          <div
            className="flex will-change-transform"
            style={{
              transform: `translateX(${offset}px)`,
              transition: isSpinning ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {spinnerItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-[200px] p-4 transform transition-transform duration-200"
                style={{
                  transform: isSpinning ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                <div className={`
                  bg-gray-800 p-4 rounded-lg border-2 transform transition-all duration-200
                  hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20
                  ${item.rarity === 'common' && 'border-gray-500'}
                  ${item.rarity === 'uncommon' && 'border-blue-500'}
                  ${item.rarity === 'rare' && 'border-purple-500'}
                  ${item.rarity === 'legendary' && 'border-yellow-500 shadow-lg shadow-yellow-500/20'}
                `}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[100px] object-contain mb-2"
                    loading="eager"
                  />
                  <p className="text-white text-center truncate font-medium">{item.name}</p>
                  <p className={`text-center text-sm font-bold
                    ${item.rarity === 'common' && 'text-gray-400'}
                    ${item.rarity === 'uncommon' && 'text-blue-400'}
                    ${item.rarity === 'rare' && 'text-purple-400'}
                    ${item.rarity === 'legendary' && 'text-yellow-400'}
                  `}>
                    {item.multiplier}x
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {!isSpinning && (
          <div className="text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-2">
              You won: {winningItem.name}!
            </h3>
            <p className={`text-lg font-bold
              ${winningItem.rarity === 'common' && 'text-gray-400'}
              ${winningItem.rarity === 'uncommon' && 'text-blue-400'}
              ${winningItem.rarity === 'rare' && 'text-purple-400'}
              ${winningItem.rarity === 'legendary' && 'text-yellow-400'}
            `}>
              {winningItem.multiplier}x Multiplier
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseOpeningModal;