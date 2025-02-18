export enum ActionType {
  SET_AUTHENTICATION = 'SET_AUTHENTICATION',
}

export type SetAuthenticationAction = {
  type: ActionType.SET_AUTHENTICATION;
  payload: {
    fullname: string;
    email: string;
    username: string;
    adress: string;
  };
};

export type Actions = SetAuthenticationAction;
