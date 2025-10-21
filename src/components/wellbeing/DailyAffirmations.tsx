import React, { useState } from 'react';
import { MessageCircle, Mic, Play, Square } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';
import { t } from '../../utils/i18n';

export function DailyAffirmations() {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'abundance' | 'success' | 'growth' | 'confidence'>(
    'abundance'
  );
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
      'Por que é que sou um íman de prosperidade?',
    ],
    success: [
      'Por que é que tenho tanto sucesso em tudo o que faço?',
      'Por que é que as oportunidades me procuram constantemente?',
      'Por que é que alcanço os meus objetivos com tanta facilidade?',
    ],
    growth: [
      'Por que é que aprendo e cresço todos os dias?',
      'Por que é que a minha riqueza cresce exponencialmente?',
      'Por que é que evoluo constantemente?',
    ],
    confidence: [
      'Por que é que tenho tanta confiança nas minhas decisões financeiras?',
      'Por que é que sou tão capaz de gerir o meu dinheiro?',
      'Por que é que confio tanto no meu sucesso?',
    ],
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold">{t('afformations')}</h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-sm font-medium text-gray-600">Exemplos para inspiração:</h3>
        <div className="rounded-lg bg-blue-50 p-4">
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
            {exampleAfformations[category].map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">{t('write_afformation')}</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t('why_question')}
            className="h-24 w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <select
            value={category}
            onChange={e => setCategory(e.target.value as any)}
            className="flex-1 rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="abundance">{t('abundance')}</option>
            <option value="success">{t('success')}</option>
            <option value="growth">{t('growth')}</option>
            <option value="confidence">{t('confidence')}</option>
          </select>

          <button
            type="button"
            onClick={() => setRecording(!recording)}
            className={`rounded-lg p-2 ${
              recording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {recording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          {t('save')}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {affirmations.slice(0, 3).map(affirmation => (
          <div
            key={affirmation.id}
            className="flex items-center justify-between rounded-lg bg-blue-50 p-4"
          >
            <p className="text-gray-600">{affirmation.text}</p>
            {affirmation.audioUrl && (
              <button className="rounded-full p-2 text-blue-600 hover:bg-blue-100">
                <Play className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
