import { Transaction } from '../types/finance';

interface BankAnalysis {
  summary: string;
  missingTransactions: Partial<Transaction>[];
}

export async function analyzeBankStatement(
  bankTransactions: Partial<Transaction>[]
): Promise<BankAnalysis> {
  // Get existing transactions from local storage or API
  const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  const missingTransactions: Partial<Transaction>[] = [];
  
  // Find transactions in bank statement that aren't in our system
  for (const bankTx of bankTransactions) {
    const exists = existingTransactions.some((tx: Transaction) => 
      tx.date.split('T')[0] === bankTx.date?.toISOString().split('T')[0] &&
      tx.amount === bankTx.amount &&
      tx.type === bankTx.type
    );

    if (!exists) {
      missingTransactions.push(bankTx);
    }
  }

  // Calculate summary statistics
  const totalIncome = bankTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalExpenses = bankTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const summary = `
Análise do Extrato:
• Total de Rendimentos: ${totalIncome.toFixed(2)}€
• Total de Despesas: ${totalExpenses.toFixed(2)}€
• Transações em Falta: ${missingTransactions.length}
${missingTransactions.length > 0 ? '\nAs transações em falta foram adicionadas automaticamente.' : ''}
  `.trim();

  return {
    summary,
    missingTransactions
  };
}