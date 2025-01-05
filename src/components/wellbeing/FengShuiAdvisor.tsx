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
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpa, ocorreu um erro. Por favor, tenta novamente.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    'Como posso ativar a área da riqueza no meu escritório?',
    'Quais são as melhores cores para atrair prosperidade?',
    'Como devo organizar a minha secretária para o sucesso?',
    'Que cristais recomendar para abundância financeira?',
    'Como integrar os códigos Grabovoi com Feng Shui?'
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Compass className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold">Consultor Feng Shui</h2>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Perguntas Sugeridas:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              className="text-sm px-3 py-1 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="h-96 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span>A consultar o I Ching...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Faz uma pergunta sobre Feng Shui..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}