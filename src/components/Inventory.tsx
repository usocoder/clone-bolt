import React, { useState } from 'react';
import { Wallet, X, Send } from 'lucide-react';

interface InventoryProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (items: any[], address: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ isOpen, onClose, onWithdraw }) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [inventory] = useState(() => {
    return JSON.parse(localStorage.getItem('inventory') || '[]');
  });

  if (!isOpen) return null;

  const handleItemClick = (item: any) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleWithdraw = () => {
    if (selectedItems.length > 0 && withdrawAddress) {
      onWithdraw(selectedItems, withdrawAddress);
      setSelectedItems([]);
      setWithdrawAddress('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Wallet className="text-purple-500" />
          Your Inventory
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {inventory.map((item: any, index: number) => (
            <div
              key={`${item.id}-${item.obtainedAt}-${index}`}
              onClick={() => handleItemClick(item)}
              className={`
                bg-gray-800 p-4 rounded-lg cursor-pointer transition-all
                ${selectedItems.includes(item) ? 'ring-2 ring-purple-500' : ''}
                hover:bg-gray-700
              `}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-contain mb-2"
              />
              <p className="text-white text-center truncate">{item.name}</p>
              <p className="text-gray-400 text-center text-sm">
                {item.multiplier}x
              </p>
              <p className="text-gray-500 text-center text-xs">
                {new Date(item.obtainedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {inventory.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Withdraw Items ({selectedItems.length} selected)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Withdrawal Address
                </label>
                <input
                  type="text"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
                  placeholder="Enter your crypto address"
                />
              </div>
              <button
                onClick={handleWithdraw}
                disabled={selectedItems.length === 0 || !withdrawAddress}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Withdraw {selectedItems.length} Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;