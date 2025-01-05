import React, { useState } from 'react';
import { MessageCircle, Mic, Play, Square } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';
import { t } from '../../utils/i18n';

export function DailyAffirmations() {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'abundance' | 'success' | 'growth' | 'confidence'>('abundance');
  const { addAffirmation, affirmations } = useWellbeingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure the text starts with "Por que é que..."
    const formattedText = text.startsWith('Por que é que') 
      ? text 
      : `Por que é que ${text.toLowerCase()}`;
    addAffirmation({ text: formattedText, category });
    setText('');
  };

  const exampleAfformations = {
    abundance: [
      'Por que é que atraio abundância tão facilmente?',
      'Por que é que o dinheiro flui naturalmente para mim?',
      'Por que é que sou um íman de prosperidade?'
    ],
    success: [
      'Por que é que tenho tanto sucesso em tudo o que faço?',
      'Por que é que as oportunidades me procuram constantemente?',
      'Por que é que alcanço os meus objetivos com tanta facilidade?'
    ],
    growth: [
      'Por que é que aprendo e cresço todos os dias?',
      'Por que é que a minha riqueza cresce exponencialmente?',
      'Por que é que evoluo constantemente?'
    ],
    confidence: [
      'Por que é que tenho tanta confiança nas minhas decisões financeiras?',
      'Por que é que sou tão capaz de gerir o meu dinheiro?',
      'Por que é que confio tanto no meu sucesso?'
    ]
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold">{t('afformations')}</h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Exemplos para inspiração:</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {exampleAfformations[category].map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            {t('write_afformation')}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('why_question')}
            className="w-full h-24 px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="abundance">{t('abundance')}</option>
            <option value="success">{t('success')}</option>
            <option value="growth">{t('growth')}</option>
            <option value="confidence">{t('confidence')}</option>
          </select>

          <button
            type="button"
            onClick={() => setRecording(!recording)}
            className={`p-2 rounded-lg ${
              recording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {recording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('save')}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {affirmations.slice(0, 3).map((affirmation) => (
          <div key={affirmation.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-600">{affirmation.text}</p>
            {affirmation.audioUrl && (
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                <Play className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}