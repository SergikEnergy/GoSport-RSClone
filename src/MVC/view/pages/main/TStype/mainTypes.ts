export interface iEvents {
_id?: string, 
  kind: string,
  date?: { type: string},
  id_place?: { type: string},
  time_start?: { type: string},
  time_end?: { type: string},
  place_name?: { type: string},
  rest_players?: number,
  players?: string[]
}
