import React, { useState } from 'react';
import { Copy, Check, Wallet, X } from 'lucide-react';

interface CryptoDepositProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

interface CryptoAddress {
  currency: string;
  address: string;
  icon: string;
}

const CRYPTO_ADDRESSES: CryptoAddress[] = [
  {
    currency: 'ETH/USDT',
    address: '0xe5052AE7cA12bd144362cB33ca6BB7a0C2c5Cf4F',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
  },
  {
    currency: 'BTC',
    address: 'bc1qhl5rsa5yhpqhh8du47579k2fd96erj2htyjn25',
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
  },
  {
    currency: 'LTC',
    address: 'ltc1q3efa77t36fhvln7kv0cukxdwum582k9atkm0ur',
    icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg',
  },
  {
    currency: 'SOLANA',
    address: 'AswWDkR1mXoC1ZhYaJx8yQvv6f8hfz2ZJD6fyJ81Mmxb',
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
  },
];

const CryptoDeposit: React.FC<CryptoDepositProps> = ({ isOpen, onClose, onDeposit }) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const handleCopy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      onDeposit(depositAmount);
      setAmount('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Wallet className="text-purple-500" size={24} />
          <h2 className="text-2xl font-bold text-white">Deposit Crypto</h2>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter deposit amount"
              className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-md"
              step="0.01"
              min="0"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Add Balance
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {CRYPTO_ADDRESSES.map(({ currency, address, icon }) => (
            <div
              key={currency}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={icon} alt={currency} className="w-6 h-6" />
                <span className="text-white font-medium">{currency}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={address}
                  readOnly
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-mono"
                />
                <button
                  onClick={() => handleCopy(address)}
                  className={`p-2 rounded-md transition-colors ${
                    copiedAddress === address
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {copiedAddress === address ? (
                    <Check size={20} />
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-yellow-500/20">
          <p className="text-yellow-500 text-sm">
            Important: Deposits will be confirmed after 5 minutes (required confirmations).
            Please ensure you send the exact amount you wish to deposit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoDeposit;