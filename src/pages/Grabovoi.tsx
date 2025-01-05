import React from 'react';
import { DailyCode } from '../components/grabovoi/DailyCode';
import { GrabovoiLibrary } from '../components/grabovoi/GrabovoiLibrary';

export default function Grabovoi() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Códigos Grabovoi</h1>
      <DailyCode />
      <GrabovoiLibrary />
    </div>
  );
}