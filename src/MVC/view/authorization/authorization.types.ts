export interface ILogIn {
  nickName: string;
  password: string;
}

export interface ICreateUser extends ILogIn {
  passwordConfirm: string;
  firstName?: string;
  lastName?: string;
  coach: boolean;
  player: boolean;
}

export interface IGetUser extends ILogIn {
  _id: string;
  coach: boolean;
  player: boolean;
  events: [string];
  personalData: {
    weight?: number;
    height: number;
    first_name?: string;
    last_name?: string;
    games: [string];
  };
  avatar: string;
}

export interface IGetError {
  error: string;
  data: string;
}

export type getErrorOrUser = ICreateUser | IGetError;
