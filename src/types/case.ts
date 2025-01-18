export interface CaseItem {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  multiplier: number;
  odds: number;
}

export interface Case {
  id: string;
  name: string;
  image: string;
  price: number;
  items: CaseItem[];
}

export interface BattleResult {
  winner: string;
  winningItem: CaseItem;
  players: {
    name: string;
    item: CaseItem;
  }[];
}