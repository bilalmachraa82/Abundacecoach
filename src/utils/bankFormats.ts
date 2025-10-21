export interface BankFormat {
  name: string;
  delimiter: string;
  dateIndex: number;
  descriptionIndex: number;
  amountIndex: number;
  typeIndex: number;
  minimumFields: number;
  parseDate: (value: string) => Date;
  parseDescription: (value: string) => string;
  parseAmount: (value: string) => number;
  parseType: (value: string) => 'income' | 'expense';
  guessCategory: (description: string) => string;
}

const bankFormats: Record<string, BankFormat> = {
  millenniumBCP: {
    name: 'Millennium BCP',
    delimiter: ';',
    dateIndex: 0,
    descriptionIndex: 2,
    amountIndex: 3,
    typeIndex: 4,
    minimumFields: 5,
    parseDate: value => new Date(value.split('-').reverse().join('-')),
    parseDescription: value => value.trim(),
    parseAmount: value => Math.abs(parseFloat(value.replace(',', '.'))),
    parseType: value => (value.includes('CRED') ? 'income' : 'expense'),
    guessCategory: description => guessCategoryFromDescription(description),
  },
  caixaGeral: {
    name: 'Caixa Geral de Depósitos',
    delimiter: ';',
    dateIndex: 0,
    descriptionIndex: 1,
    amountIndex: 2,
    typeIndex: 3,
    minimumFields: 4,
    parseDate: value => new Date(value.split('/').reverse().join('-')),
    parseDescription: value => value.trim(),
    parseAmount: value => Math.abs(parseFloat(value.replace(',', '.'))),
    parseType: value => (value.includes('+') ? 'income' : 'expense'),
    guessCategory: description => guessCategoryFromDescription(description),
  },
};

export function detectBankFormat(headerLine: string): BankFormat {
  if (headerLine.includes('BCP')) return bankFormats.millenniumBCP;
  if (headerLine.includes('CGD')) return bankFormats.caixaGeral;
  return bankFormats.millenniumBCP; // Default format
}

function guessCategoryFromDescription(description: string): string {
  const lowerDesc = description.toLowerCase();

  // Common Portuguese transaction patterns
  if (lowerDesc.includes('supermercado') || lowerDesc.includes('continente')) return 'groceries';
  if (lowerDesc.includes('restaurante') || lowerDesc.includes('cafetaria')) return 'dining';
  if (lowerDesc.includes('combustivel') || lowerDesc.includes('galp')) return 'fuel';
  if (lowerDesc.includes('vodafone') || lowerDesc.includes('meo')) return 'utilities';
  if (lowerDesc.includes('salario') || lowerDesc.includes('vencimento')) return 'salary';

  return 'other';
}
