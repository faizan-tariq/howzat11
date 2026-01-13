export type PlayerRole = 'Batsman' | 'Bowler' | 'All Rounder';
export type BowlingStyle = 'Fast' | 'Spin' | 'none';

export interface PlayerStats {
  strikeRate?: number;
  economy?: number;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  role: PlayerRole;
  bowlingStyle: BowlingStyle;
  stats: PlayerStats;
  imageUrl?: string;
  isCaptain?: boolean;
}

export interface SelectedTeam {
  players: Player[];
  captain: Player | null;
  wicketKeeper: Player | null;
}

export const TOTAL_PLAYERS = 11;

