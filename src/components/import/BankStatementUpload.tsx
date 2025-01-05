import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { parseCSV } from '../../utils/importParsers';
import { analyzeBankStatement } from '../../utils/bankAnalysis';
import { useTransactions } from '../../hooks/useTransactions';

export function BankStatementUpload() {
  const [processing, setProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { addTransaction } = useTransactions();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setProcessing(true);
      const text = await file.text();
      const transactions = await parseCSV(text);
      
      // Analyze transactions and find missing entries
      const analysis = await analyzeBankStatement(transactions);
      setAnalysis(analysis.summary);

      // Add missing transactions
      for (const transaction of analysis.missingTransactions) {
        await addTransaction(transaction);
      }
    } catch (error) {
      console.error('Import failed:', error);
      setAnalysis('Erro ao processar o ficheiro. Certifique-se que é um extrato bancário válido.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Importar Extrato Bancário</h2>
          <p className="text-sm text-gray-500">Suporta ficheiros CSV dos principais bancos portugueses</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <FileText className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Clique para selecionar ou arraste o ficheiro</span>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </label>

        {processing && (
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
            <span>A processar extrato...</span>
          </div>
        )}

        {analysis && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">Análise do Extrato</h3>
                <p className="text-sm text-blue-800 whitespace-pre-line">{analysis}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}