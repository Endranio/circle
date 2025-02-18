export enum ActionType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

export type AddAction = {
  type: ActionType.ADD;
};
export type SubtractAction = {
  type: ActionType.SUBTRACT;
};

export type Actions = AddAction | SubtractAction;
