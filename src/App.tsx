import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { RaceCard } from './components/RaceCard';
import { DriverStandings } from './components/DriverStandings';
import type { Race, Driver, ErgastResponse } from './types';

function App() {
  const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);
  const [driverStandings, setDriverStandings] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch upcoming races with circuit details
        const racesResponse = await fetch('https://ergast.com/api/f1/2024.json');
        if (!racesResponse.ok) {
          throw new Error(`HTTP error! status: ${racesResponse.status}`);
        }
        const racesData: ErgastResponse = await racesResponse.json();
        
        const races = racesData.MRData.RaceTable?.Races.map(race => ({
          round: race.round,
          raceName: race.raceName,
          circuitName: race.Circuit.circuitName,
          date: race.date,
          time: race.time || '00:00:00Z',
          country: race.Circuit.Location.country,
          Circuit: race.Circuit,
          Results: race.Results
        })) || [];

        // Only fetch results for races that have already happened
        const currentDate = new Date();
        const racesWithResults = await Promise.all(
          races.map(async (race) => {
            const raceDate = new Date(`${race.date}T${race.time}`);
            
            // Only fetch results if the race date is in the past
            if (raceDate < currentDate) {
              try {
                const resultsResponse = await fetch(
                  `https://ergast.com/api/f1/2024/${race.round}/results.json`
                );
                if (resultsResponse.ok) {
                  const resultsData: ErgastResponse = await resultsResponse.json();
                  return {
                    ...race,
                    Results: resultsData.MRData.RaceTable?.Races[0]?.Results
                  };
                }
              } catch (error) {
                console.error(`Error fetching results for completed race ${race.round}:`, error);
              }
            }
            return race;
          })
        );

        // Fetch driver standings
        const standingsResponse = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
        if (!standingsResponse.ok) {
          throw new Error(`HTTP error! status: ${standingsResponse.status}`);
        }
        const standingsData: ErgastResponse = await standingsResponse.json();
        
        const drivers = standingsData.MRData.StandingsTable?.StandingsLists[0].DriverStandings.map(driver => ({
          position: driver.position,
          name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          team: driver.Constructors[0].name,
          points: parseInt(driver.points)
        })) || [];

        setUpcomingRaces(racesWithResults);
        setDriverStandings(drivers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching F1 data:', err);
        setError('Failed to fetch F1 data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-red-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">F1 Race Tracker</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Races</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingRaces.map((race) => (
                    <RaceCard key={race.round} race={race} />
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <DriverStandings drivers={driverStandings} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;