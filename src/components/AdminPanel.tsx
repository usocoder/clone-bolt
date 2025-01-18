import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { Case, CaseItem } from '../types/case';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [deposits, setDeposits] = useState(() => {
    return JSON.parse(localStorage.getItem('deposits') || '[]');
  });

  const [newCase, setNewCase] = useState<Partial<Case>>({
    name: '',
    image: '',
    price: 0,
    items: []
  });

  const handleAddCase = () => {
    const cases = JSON.parse(localStorage.getItem('cases') || '[]');
    const caseWithId = {
      ...newCase,
      id: crypto.randomUUID(),
    };
    cases.push(caseWithId);
    localStorage.setItem('cases', JSON.stringify(cases));
    setNewCase({ name: '', image: '', price: 0, items: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Admin Panel</h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Recent Deposits</h3>
            <div className="space-y-2">
              {deposits.map((deposit: any) => (
                <div key={deposit.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-white">{deposit.username}</span>
                    <span className="text-purple-400">${deposit.amount}</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date(deposit.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Add New Case</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newCase.name}
                  onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newCase.image}
                  onChange={(e) => setNewCase({ ...newCase, image: e.target.value })}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={newCase.price}
                  onChange={(e) => setNewCase({ ...newCase, price: Number(e.target.value) })}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
                />
              </div>
              <button
                onClick={handleAddCase}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
              >
                <Plus size={20} />
                Add Case
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;