import React from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: 'La vie est belle, profitez-en chaque jour',
    translation: 'Life is beautiful, enjoy it every day',
  },
  {
    text: 'Chaque jour est une nouvelle chance de briller',
    translation: 'Each day is a new chance to shine',
  },
  {
    text: 'Le succès appartient à ceux qui y croient',
    translation: 'Success belongs to those who believe in it',
  },
  {
    text: "Les rêves d'aujourd'hui sont les réalités de demain",
    translation: "Today's dreams are tomorrow's realities",
  },
];

export function DailyQuote() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Use the day of the year to select a quote, so it changes daily but stays consistent throughout the day
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const quote = quotes[dayOfYear % quotes.length];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium capitalize text-gray-900">{formattedDate}</h2>
        <div className="rounded-lg bg-blue-50 p-2">
          <Quote className="h-5 w-5 text-blue-500" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xl font-medium text-gray-800">{quote.text}</p>
        <p className="text-sm italic text-gray-500">{quote.translation}</p>
      </div>
    </div>
  );
}
