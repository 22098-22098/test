import React from 'react';
import { X, MapPin } from 'lucide-react';
import type { Race } from '../types';

interface RaceModalProps {
  race: Race;
  onClose: () => void;
}

export function RaceModal({ race, onClose }: RaceModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{race.raceName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Circuit Information */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Circuit Information</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">{race.Circuit?.circuitName}</h4>
                  <p className="text-gray-600">
                    {race.Circuit?.Location.locality}, {race.Circuit?.Location.country}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Coordinates: {race.Circuit?.Location.lat}, {race.Circuit?.Location.long}
                  </p>
                  {race.Circuit?.url && (
                    <a
                      href={race.Circuit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 text-sm mt-2 inline-block"
                    >
                      More circuit details →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Race Results */}
          {race.Results && (
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Race Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time/Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {race.Results.map((result) => (
                      <tr key={result.position} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {result.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {`${result.Driver.givenName} ${result.Driver.familyName}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.Constructor.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.Time?.time || result.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}