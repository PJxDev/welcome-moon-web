export type ACK = { ok: boolean; error: string; rooms: RoomSummary[]; roomId:string }
export type Player = {
  id: string
  name: string
  connected: boolean
}
export type Icon =
  | 'astronaut'
  | 'water'
  | 'robot'
  | 'calendar'
  | 'lightning'
  | 'plant'
  | 'wildcard'
export type IconForPile = Exclude<Icon, 'wildcard'>
export type Pile = { number: number; icon: IconForPile }
export type Reward =
  | { type: 'rocket'; amount: number; active?: boolean }
  | { type: 'rocket:conditional'; amount: number; active: boolean }
  | { type: 'arrow' }
  | { type: 'cross' }
  | { type: 'incident'; id: string }
export type Cell = { filled: boolean; value?: number }

export type Room = { cells: Cell[]; completed: boolean; rewards: Reward[] }
export type Board = { rooms: Room[] }
export type PlayerState = {
  id: string
  name: string
  socketId: string
  connected: boolean
  board: Board
  rockets: number
  incidences: string[]
  incidentsFired: Set<string>
  hasChosen: boolean
  score: number 
}
export type PublicState = {
  roomId: string
  state: 'waiting' | 'in_progress' | 'ended'
  round: number
  piles: Pile[]
  players: PlayerState[]
}

export type RoomSummary = {
  roomId: string;
  state: string;
  playerCount: number;
};

export interface RoomProps {
  onStartGame: () => void;
}
export interface LobbyProps {
  onJoinRoom: () => void;
}
