export interface IEvent {
  date: string;
  id_place: string;
  kind: string;
  place_name: string[];
  rest_players: number;
  time_end: string;
  time_start: string;
  _id: string;
}

export enum KindsSport {
  'Волейбол' = 'voleyball',
  'Футбол' = 'football',
  'Баскетбол' = 'basketball',
  'Теннис' = 'tennis',
}