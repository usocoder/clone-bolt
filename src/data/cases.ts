import type { Case } from '../types/case';

export const cases: Case[] = [
  {
    id: 'case1',
    name: 'Starter Case',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
    price: 10,
    items: [
      {
        id: '1',
        name: 'Bronze Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'common',
        multiplier: 0.5,
        odds: 0.4
      },
      {
        id: '2',
        name: 'Silver Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'common',
        multiplier: 0.75,
        odds: 0.3
      },
      {
        id: '3',
        name: 'Gold Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'uncommon',
        multiplier: 1.5,
        odds: 0.15
      },
      {
        id: '4',
        name: 'Platinum Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'uncommon',
        multiplier: 2,
        odds: 0.1
      },
      {
        id: '5',
        name: 'Emerald Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'rare',
        multiplier: 5,
        odds: 0.03
      },
      {
        id: '6',
        name: 'Ruby Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'rare',
        multiplier: 10,
        odds: 0.015
      },
      {
        id: '7',
        name: 'Sapphire Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'rare',
        multiplier: 20,
        odds: 0.004
      },
      {
        id: '8',
        name: 'Diamond Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'legendary',
        multiplier: 50,
        odds: 0.0007
      },
      {
        id: '9',
        name: 'Rainbow Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'legendary',
        multiplier: 100,
        odds: 0.0002
      },
      {
        id: '10',
        name: 'Divine Coin',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200',
        rarity: 'legendary',
        multiplier: 200,
        odds: 0.0001
      }
    ]
  },
  // ... (keep other existing cases with similar 10-item structure)
  {
    id: 'case7',
    name: 'Ancient Case',
    image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
    price: 750,
    items: [
      {
        id: '1',
        name: 'Ancient Scroll',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'common',
        multiplier: 15,
        odds: 0.4
      },
      {
        id: '2',
        name: 'Mystic Tablet',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'common',
        multiplier: 25,
        odds: 0.3
      },
      {
        id: '3',
        name: 'Golden Chalice',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'uncommon',
        multiplier: 50,
        odds: 0.15
      },
      {
        id: '4',
        name: 'Crystal Scepter',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'uncommon',
        multiplier: 75,
        odds: 0.1
      },
      {
        id: '5',
        name: 'Phoenix Feather',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'rare',
        multiplier: 150,
        odds: 0.03
      },
      {
        id: '6',
        name: 'Dragon Scale',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'rare',
        multiplier: 300,
        odds: 0.015
      },
      {
        id: '7',
        name: 'Unicorn Horn',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'rare',
        multiplier: 600,
        odds: 0.004
      },
      {
        id: '8',
        name: 'Philosopher\'s Stone',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'legendary',
        multiplier: 1500,
        odds: 0.0007
      },
      {
        id: '9',
        name: 'Holy Grail',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'legendary',
        multiplier: 3000,
        odds: 0.0002
      },
      {
        id: '10',
        name: 'Book of Eternity',
        image: 'https://images.unsplash.com/photo-1602000055799-a9f73dea2f30?w=200',
        rarity: 'legendary',
        multiplier: 6000,
        odds: 0.0001
      }
    ]
  },
  {
    id: 'case8',
    name: 'Elemental Case',
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
    price: 1000,
    items: [
      {
        id: '1',
        name: 'Water Essence',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'common',
        multiplier: 20,
        odds: 0.4
      },
      {
        id: '2',
        name: 'Fire Essence',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'common',
        multiplier: 35,
        odds: 0.3
      },
      {
        id: '3',
        name: 'Earth Crystal',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'uncommon',
        multiplier: 75,
        odds: 0.15
      },
      {
        id: '4',
        name: 'Wind Spirit',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'uncommon',
        multiplier: 100,
        odds: 0.1
      },
      {
        id: '5',
        name: 'Lightning Orb',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'rare',
        multiplier: 200,
        odds: 0.03
      },
      {
        id: '6',
        name: 'Ice Crown',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'rare',
        multiplier: 400,
        odds: 0.015
      },
      {
        id: '7',
        name: 'Nature\'s Heart',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'rare',
        multiplier: 800,
        odds: 0.004
      },
      {
        id: '8',
        name: 'Void Crystal',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'legendary',
        multiplier: 2000,
        odds: 0.0007
      },
      {
        id: '9',
        name: 'Celestial Orb',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'legendary',
        multiplier: 4000,
        odds: 0.0002
      },
      {
        id: '10',
        name: 'Elemental Core',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200',
        rarity: 'legendary',
        multiplier: 8000,
        odds: 0.0001
      }
    ]
  }
];

// ... (keep highRollerCases with similar 10-item structure)