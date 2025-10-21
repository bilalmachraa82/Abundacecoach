import { Transaction } from '../types/finance';
import { detectBankFormat, BankFormat } from './bankFormats';

export async function parseCSV(content: string): Promise<Partial<Transaction>[]> {
  const lines = content.split('\n');
  const bankFormat = detectBankFormat(lines[0]);

  return parseByBank(lines, bankFormat);
}

function parseByBank(lines: string[], format: BankFormat): Partial<Transaction>[] {
  const transactions: Partial<Transaction>[] = [];

  // Skip header
  const dataLines = lines.slice(1);

  for (const line of dataLines) {
    const fields = line.split(format.delimiter);
    if (fields.length < format.minimumFields) continue;

    const transaction = {
      date: format.parseDate(fields[format.dateIndex]),
      description: format.parseDescription(fields[format.descriptionIndex]),
      amount: format.parseAmount(fields[format.amountIndex]),
      type: format.parseType(fields[format.typeIndex]),
      category: format.guessCategory(fields[format.descriptionIndex]),
    };

    transactions.push(transaction);
  }

  return transactions;
}
