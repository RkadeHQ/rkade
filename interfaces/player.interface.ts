export interface IPlayer {
  id: number;
  name: string;
  position: 'MID' | 'DEF' | 'FWD' | 'GKP';
  team: string;
}
