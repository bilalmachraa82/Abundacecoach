import { Transaction } from '../types/finance';

// Historical monthly totals for 2024
export const monthlyTotals2024 = {
  income: {
    jan: 12500, feb: 13200, mar: 12800, apr: 13500,
    may: 14200, jun: 13800, jul: 14500, aug: 15200,
    sep: 14800, oct: 15500, nov: 16200, dec: 15800
  },
  expenses: {
    jan: 8500, feb: 8200, mar: 8800, apr: 8500,
    may: 9200, jun: 8800, jul: 9500, aug: 9200,
    sep: 9800, oct: 9500, nov: 10200, dec: 9800
  }
};

// Category amounts (average monthly)
export const categoryAmounts = {
  income: {
    pruvit: 6000,
    lifewave: 3500,
    aiparati: 2000,
    therapy: 1500,
    coaching: 1000,
    workshops: 800,
    rentals: 400
  },
  expenses: {
    // Personal
    housing: {
      mortgage: 1200,
      utilities: 300,
      maintenance: 200,
      insurance: 100
    },
    food: {
      groceries: 600,
      dining: 300,
      snacks: 100
    },
    transport: {
      fuel: 200,
      tolls: 100,
      maintenance: 150,
      insurance: 80
    },
    // Business
    marketing: {
      advertising: 500,
      promotional: 300,
      social_media: 200
    },
    inventory: {
      pruvit: 1200,
      lifewave: 800,
      supplies: 300
    },
    office: {
      rent: 600,
      supplies: 200,
      software: 150
    },
    // Financial
    loans: {
      mortgage: 1200,
      car: 300,
      business: 500
    },
    credit_cards: {
      personal: 400,
      business: 600
    },
    insurance: {
      business: 200,
      liability: 150,
      life: 100
    }
  }
};