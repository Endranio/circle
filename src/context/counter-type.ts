export enum ActionType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

export type AddAction = {
  type: ActionType.ADD;
  payload: {
    counter: number;
  };
};
export type SubtractAction = {
  type: ActionType.SUBTRACT;
  payload: {
    counter: number;
  };
};

export type Actions = AddAction | SubtractAction;
