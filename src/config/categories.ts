// Income Categories
export const INCOME_CATEGORIES = {
  BUSINESS: {
    PRUVIT: 'pruvit',
    LIFEWAVE: 'lifewave',
    AI_PARA_TI: 'aiparati',
    THERAPY: 'therapy',
    COACHING: 'coaching',
    WORKSHOPS: 'workshops',
    RENTALS: 'rentals',
  },
} as const;

// Expense Categories
export const EXPENSE_CATEGORIES = {
  PERSONAL: {
    HOUSING: {
      MORTGAGE: 'mortgage',
      RENT: 'rent',
      UTILITIES: 'utilities',
      MAINTENANCE: 'housing_maintenance',
      INSURANCE: 'housing_insurance',
    },
    FOOD: {
      GROCERIES: 'groceries',
      DINING: 'dining',
      SNACKS: 'snacks',
    },
    TRANSPORT: {
      FUEL: 'fuel',
      TOLLS: 'tolls',
      CAR_MAINTENANCE: 'car_maintenance',
      PUBLIC_TRANSPORT: 'public_transport',
      CAR_INSURANCE: 'car_insurance',
    },
    HEALTH: {
      INSURANCE: 'health_insurance',
      MEDICAL: 'medical_expenses',
      PHARMACY: 'pharmacy',
      PERSONAL_CARE: 'personal_care',
      GYM: 'gym',
    },
    ENTERTAINMENT: {
      SUBSCRIPTIONS: 'subscriptions',
      LEISURE: 'leisure',
      HOBBIES: 'hobbies',
      TRAVEL: 'travel',
    },
    EDUCATION: {
      COURSES: 'courses',
      BOOKS: 'books',
      MATERIALS: 'education_materials',
    },
  },
  BUSINESS: {
    MARKETING: {
      ADVERTISING: 'advertising',
      PROMOTIONAL: 'promotional',
      SOCIAL_MEDIA: 'social_media',
    },
    INVENTORY: {
      PRUVIT: 'pruvit_inventory',
      LIFEWAVE: 'lifewave_inventory',
      SUPPLIES: 'general_supplies',
    },
    CLIENT: {
      CRM: 'crm',
      ENTERTAINMENT: 'client_entertainment',
      GIFTS: 'client_gifts',
    },
    WORKSHOPS: {
      VENUE: 'venue',
      TRAVEL: 'business_travel',
      MATERIALS: 'workshop_materials',
    },
    OFFICE: {
      RENT: 'office_rent',
      SUPPLIES: 'office_supplies',
      EQUIPMENT: 'office_equipment',
      SOFTWARE: 'software_subscriptions',
    },
  },
  FINANCIAL: {
    LOANS: {
      MORTGAGE: 'mortgage_payment',
      CAR: 'car_loan',
      PERSONAL: 'personal_loan',
      BUSINESS: 'business_loan',
    },
    CREDIT_CARDS: {
      PERSONAL: 'personal_credit_card',
      BUSINESS: 'business_credit_card',
    },
    BANK_FEES: {
      ACCOUNT: 'account_fees',
      TRANSACTION: 'transaction_fees',
      INTERNATIONAL: 'international_fees',
    },
    INSURANCE: {
      BUSINESS: 'business_insurance',
      LIABILITY: 'liability_insurance',
      LIFE: 'life_insurance',
    },
    INVESTMENTS: {
      STOCKS: 'stock_investments',
      REAL_ESTATE: 'real_estate_investments',
      SAVINGS: 'savings',
    },
  },
  OTHER: {
    DONATIONS: 'donations',
    GIFTS: 'gifts',
    MISCELLANEOUS: 'miscellaneous',
  },
} as const;
