import React, { useState } from 'react';
import { Compass, Send, Loader } from 'lucide-react';
import { getFengShuiAdvice } from '../../services/fengShuiAI';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function FengShuiAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await getFengShuiAdvice(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Failed to get Feng Shui advice:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpa, ocorreu um erro. Por favor, tenta novamente.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    'Como posso ativar a área da riqueza no meu escritório?',
    'Quais são as melhores cores para atrair prosperidade?',
    'Como devo organizar a minha secretária para o sucesso?',
    'Que cristais recomendar para abundância financeira?',
    'Como integrar os códigos Grabovoi com Feng Shui?',
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-amber-100 p-2">
            <Compass className="h-5 w-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold">Consultor Feng Shui</h2>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-600">Perguntas Sugeridas:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700 hover:bg-amber-100"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 h-96 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2">
              <Loader className="h-4 w-4 animate-spin" />
              <span>A consultar o I Ching...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Faz uma pergunta sobre Feng Shui..."
          className="flex-1 rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
