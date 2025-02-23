import React, { useState } from 'react';
import { Calendar, Flag, Clock } from 'lucide-react';
import { format } from 'date-fns';
import type { Race } from '../types';
import { RaceModal } from './RaceModal';

interface RaceCardProps {
  race: Race;
}

export function RaceCard({ race }: RaceCardProps) {
  const [showModal, setShowModal] = useState(false);
  const raceDate = new Date(`${race.date}T${race.time}`);

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="bg-red-600 h-2" />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{race.raceName}</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Flag className="w-5 h-5 mr-2" />
              <span>{race.circuitName}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{format(raceDate, 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{format(raceDate, 'HH:mm')} GMT</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <RaceModal race={race} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}