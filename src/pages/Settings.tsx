/**
 * Settings Page
 * Best Practice 2025: Fully functional settings with Supabase sync
 */
import { SettingsPanel } from '../components/settings/SettingsPanel';
import { SetupSection } from '../components/settings/SetupSection';
import { BankStatementUpload } from '../components/import/BankStatementUpload';
import { Upload } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 p-6">
      <SettingsPanel />

      {/* Setup Section */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold">Configuração Inicial</h3>
        <SetupSection />
      </div>

      {/* Bank Import */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Importar Dados Bancários</h3>
        </div>
        <BankStatementUpload />
      </div>
    </div>
  );
}
