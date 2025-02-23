import React from 'react';
import type { Driver } from '../types';

interface DriverStandingsProps {
  drivers: Driver[];
}

export function DriverStandings({ drivers }: DriverStandingsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-red-600 h-2" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Driver Standings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">POS</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">DRIVER</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">TEAM</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">PTS</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.position} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">{driver.position}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{driver.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{driver.team}</td>
                  <td className="px-4 py-4 text-sm text-right font-semibold text-gray-900">{driver.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}