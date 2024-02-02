export interface IAction {
  type: string;
  data?: object;
}

export interface IAppContext {
  dispatch: (action: IAction) => void;
  store: IPokeApiState;
}

export interface IPokeApiState {
  pokemonTeam: IPokemon[];
}

interface IPokemonStats {
  atk: string;
  def: string;
  atkS: string;
  defS: string;
  spd: string;
}
export interface IPokemon {
  id: number;
  img: string;
  name: string;
  number: string;
  height: string;
  type: string;
  stats: IPokemonStats;
}

export interface IAppActions {
  UPDATE_STATE: string;
  RESET_STATE: string;
}

export interface IApiConfig {
  baseURL: string;
  headers: { [key: string]: string };
  responseType: string;
}

export interface IAppContextComponent {
  children: React.ReactNode;
  data: object;
  props: object;
}
