export interface Race {
  round: string;
  raceName: string;
  circuitName: string;
  date: string;
  time: string;
  country: string;
  Circuit?: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  Results?: Array<{
    position: string;
    Driver: {
      givenName: string;
      familyName: string;
    };
    Constructor: {
      name: string;
    };
    Time?: {
      time: string;
    };
    status: string;
    points: string;
  }>;
}

export interface Driver {
  position: string;
  name: string;
  team: string;
  points: number;
}

export interface ErgastResponse {
  MRData: {
    RaceTable?: {
      Races: Array<{
        round: string;
        raceName: string;
        Circuit: {
          circuitId: string;
          url: string;
          circuitName: string;
          Location: {
            lat: string;
            long: string;
            locality: string;
            country: string;
          };
        };
        date: string;
        time: string;
        Results?: Array<{
          position: string;
          Driver: {
            givenName: string;
            familyName: string;
          };
          Constructor: {
            name: string;
          };
          Time?: {
            time: string;
          };
          status: string;
          points: string;
        }>;
      }>;
    };
    StandingsTable?: {
      StandingsLists: Array<{
        DriverStandings: Array<{
          position: string;
          points: string;
          Driver: {
            givenName: string;
            familyName: string;
          };
          Constructors: Array<{
            name: string;
          }>;
        }>;
      }>;
    };
  };
}