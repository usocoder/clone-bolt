import React, { useState, useEffect } from 'react';
import { X, Swords, Trophy, Users, Skull } from 'lucide-react';
import type { Case, CaseItem } from '../types/case';
import CaseOpeningModal from './CaseOpeningModal';

interface BattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  cases: Case[];
  highRollerCases: Case[];
  userBalance: number;
  onBalanceUpdate: (newBalance: number) => void;
}

type BattleMode = '1v1' | '1v1v1' | '1v1v1v1' | '2v2' | 'normal' | 'crazy' | 'share';
type BotName = 'RushBot' | 'RushBot1' | 'RushBot2' | 'RushBot3' | 'RushBot4';

interface BattlePlayer {
  name: string;
  isBot: boolean;
  selectedCase?: Case;
  winningItem?: CaseItem;
}

const BattleModal: React.FC<BattleModalProps> = ({
  isOpen,
  onClose,
  cases,
  highRollerCases,
  userBalance,
  onBalanceUpdate
}) => {
  const [selectedMode, setSelectedMode] = useState<BattleMode>('1v1');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [players, setPlayers] = useState<BattlePlayer[]>([]);
  const [showCaseOpening, setShowCaseOpening] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [battleStarted, setBattleStarted] = useState(false);
  const [winner, setWinner] = useState<BattlePlayer | null>(null);

  const allCases = [...cases, ...highRollerCases];
  const botNames: BotName[] = ['RushBot', 'RushBot1', 'RushBot2', 'RushBot3', 'RushBot4'];

  const getRandomBot = () => {
    const randomIndex = Math.floor(Math.random() * botNames.length);
    return botNames[randomIndex];
  };

  const setupPlayers = (mode: BattleMode) => {
    let newPlayers: BattlePlayer[] = [];
    
    switch (mode) {
      case '1v1':
        newPlayers = [
          { name: 'You', isBot: false },
          { name: getRandomBot(), isBot: true }
        ];
        break;
      case '1v1v1':
        newPlayers = [
          { name: 'You', isBot: false },
          { name: getRandomBot(), isBot: true },
          { name: getRandomBot(), isBot: true }
        ];
        break;
      case '1v1v1v1':
        newPlayers = [
          { name: 'You', isBot: false },
          { name: getRandomBot(), isBot: true },
          { name: getRandomBot(), isBot: true },
          { name: getRandomBot(), isBot: true }
        ];
        break;
      case '2v2':
        newPlayers = [
          { name: 'You', isBot: false },
          { name: getRandomBot(), isBot: true },
          { name: getRandomBot(), isBot: true },
          { name: getRandomBot(), isBot: true }
        ];
        break;
      default:
        newPlayers = [
          { name: 'You', isBot: false },
          { name: getRandomBot(), isBot: true }
        ];
    }
    
    setPlayers(newPlayers);
  };

  useEffect(() => {
    if (isOpen) {
      setupPlayers('1v1');
    }
  }, [isOpen]);

  const handleModeSelect = (mode: BattleMode) => {
    setSelectedMode(mode);
    setupPlayers(mode);
    setBattleStarted(false);
    setWinner(null);
  };

  const handleCaseSelect = (selectedCase: Case) => {
    if (userBalance < selectedCase.price) {
      alert('Insufficient balance!');
      return;
    }

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].selectedCase = selectedCase;
    setPlayers(updatedPlayers);

    // Automatically select cases for bots
    if (currentPlayerIndex === 0) {
      for (let i = 1; i < players.length; i++) {
        const randomCase = allCases[Math.floor(Math.random() * allCases.length)];
        updatedPlayers[i].selectedCase = randomCase;
      }
      setPlayers(updatedPlayers);
      setBattleStarted(true);
      startBattle();
    }
  };

  const determineWinner = () => {
    if (selectedMode === 'crazy') {
      // In crazy mode, lowest multiplier wins
      const sortedPlayers = [...players].sort((a, b) => 
        (a.winningItem?.multiplier || 0) - (b.winningItem?.multiplier || 0)
      );
      setWinner(sortedPlayers[0]);
    } else if (selectedMode === 'share') {
      // In share mode, everyone wins their own items
      setWinner(null);
    } else {
      // Normal mode - highest multiplier wins
      const sortedPlayers = [...players].sort((a, b) => 
        (b.winningItem?.multiplier || 0) - (a.winningItem?.multiplier || 0)
      );
      setWinner(sortedPlayers[0]);
    }
  };

  const startBattle = () => {
    setCurrentPlayerIndex(0);
    setShowCaseOpening(true);
  };

  const handleCaseOpeningComplete = (winningItem: CaseItem) => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].winningItem = winningItem;
    setPlayers(updatedPlayers);

    if (currentPlayerIndex === 0) {
      // Deduct case price from user's balance
      const casePrice = players[0].selectedCase?.price || 0;
      onBalanceUpdate(userBalance - casePrice);
    }

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setShowCaseOpening(false);
      determineWinner();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-[1000px] max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Swords className="text-purple-500" size={24} />
          <h2 className="text-2xl font-bold text-white">Battle Arena</h2>
        </div>

        {!battleStarted ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => handleModeSelect('1v1')}
                className={`p-4 rounded-lg border-2 ${
                  selectedMode === '1v1' ? 'border-purple-500' : 'border-gray-700'
                } hover:border-purple-500 transition-colors`}
              >
                <Users className="mx-auto mb-2 text-purple-500" />
                <p className="text-white font-medium">1v1</p>
              </button>
              <button
                onClick={() => handleModeSelect('1v1v1')}
                className={`p-4 rounded-lg border-2 ${
                  selectedMode === '1v1v1' ? 'border-purple-500' : 'border-gray-700'
                } hover:border-purple-500 transition-colors`}
              >
                <Users className="mx-auto mb-2 text-purple-500" />
                <p className="text-white font-medium">1v1v1</p>
              </button>
              <button
                onClick={() => handleModeSelect('1v1v1v1')}
                className={`p-4 rounded-lg border-2 ${
                  selectedMode === '1v1v1v1' ? 'border-purple-500' : 'border-gray-700'
                } hover:border-purple-500 transition-colors`}
              >
                <Users className="mx-auto mb-2 text-purple-500" />
                <p className="text-white font-medium">1v1v1v1</p>
              </button>
              <button
                onClick={() => handleModeSelect('2v2')}
                className={`p-4 rounded-lg border-2 ${
                  selectedMode === '2v2' ? 'border-purple-500' : 'border-gray-700'
                } hover:border-purple-500 transition-colors`}
              >
                <Users className="mx-auto mb-2 text-purple-500" />
                <p className="text-white font-medium">2v2</p>
              </button>
              <button
                onClick={() => handleModeSelect('crazy')}
                className={`p-4 rounded-lg border-2 ${
                  selectedMode === 'crazy' ? 'border-purple-500' : 'border-gray-700'
                } hover:border-purple-500 transition-colors`}
              >
                <Skull className="mx-auto mb-2 text-purple-500" />
                <p className="text-white font-medium">Crazy Mode</p>
              </button>
              <button
                onClick={() => handleModeSelect('share')}
                className={`p-4 rounded-lg border-2 ${
                  selectedMode === 'share' ? 'border-purple-500' : 'border-gray-700'
                } hover:border-purple-500 transition-colors`}
              >
                <Trophy className="mx-auto mb-2 text-purple-500" />
                <p className="text-white font-medium">Share Mode</p>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Select Your Case</h3>
              <div className="grid grid-cols-3 gap-4">
                {allCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    onClick={() => handleCaseSelect(caseItem)}
                    className={`
                      bg-gray-800 p-4 rounded-lg cursor-pointer
                      hover:bg-gray-700 transition-colors
                      ${userBalance < caseItem.price ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <img
                      src={caseItem.image}
                      alt={caseItem.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <p className="text-white font-medium">{caseItem.name}</p>
                    <p className="text-purple-400">${caseItem.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Players</h3>
              <div className="grid grid-cols-4 gap-4">
                {players.map((player, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-white font-medium">{player.name}</p>
                    {player.selectedCase && (
                      <p className="text-purple-400 text-sm">
                        Selected: {player.selectedCase.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {showCaseOpening && players[currentPlayerIndex].selectedCase && (
              <CaseOpeningModal
                isOpen={true}
                onClose={() => {}}
                items={players[currentPlayerIndex].selectedCase!.items}
                winningItem={players[currentPlayerIndex].selectedCase!.items[
                  Math.floor(Math.random() * players[currentPlayerIndex].selectedCase!.items.length)
                ]}
                onComplete={handleCaseOpeningComplete}
              />
            )}

            {winner && (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {winner.name} Wins!
                </h3>
                <p className="text-purple-400">
                  With {winner.winningItem?.name} ({winner.winningItem?.multiplier}x)
                </p>
              </div>
            )}

            {!showCaseOpening && (
              <div className="grid grid-cols-4 gap-4">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className={`bg-gray-800 p-4 rounded-lg ${
                      winner === player ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <p className="text-white font-medium mb-2">{player.name}</p>
                    {player.winningItem && (
                      <>
                        <img
                          src={player.winningItem.image}
                          alt={player.winningItem.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <p className="text-purple-400">
                          {player.winningItem.name} ({player.winningItem.multiplier}x)
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleModal;