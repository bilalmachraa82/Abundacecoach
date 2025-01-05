import React from 'react';
import { GratitudeJournal } from '../components/wellbeing/GratitudeJournal';
import { DailyAffirmations } from '../components/wellbeing/DailyAffirmations';
import { FengShuiAdvisor } from '../components/wellbeing/FengShuiAdvisor';
import { ManifestationTracker } from '../components/wellbeing/ManifestationTracker';
import { GenerosityTracker } from '../components/wellbeing/GenerosityTracker';

export default function Wellbeing() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Bem-Estar Financeiro</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GratitudeJournal />
        <DailyAffirmations />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FengShuiAdvisor />
        <ManifestationTracker />
      </div>

      <GenerosityTracker />
    </div>
  );
}