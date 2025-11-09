import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { t } from '../../../utils/i18n';
import { useAICoach } from '../../../hooks/useAICoach';

export function AIChat() {
  const [message, setMessage] = useState('');
  const { messages, sendMessage, loading } = useAICoach();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex items-center space-x-3 border-b p-4">
        <div className="rounded-lg bg-purple-100 p-2">
          <MessageSquare className="h-5 w-5 text-purple-600" />
        </div>
        <h3 className="font-semibold">{t('financialAssistant')}</h3>
      </div>

      <div className="h-96 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
              {msg.isStreaming && (
                <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-purple-600"></span>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="animate-pulse rounded-lg bg-gray-100 px-4 py-2">{t('thinking')}</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={t('askQuestion')}
            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
