export interface IContacts {
  id: string;
  name: string;
  number: string;
}

export interface IState {
  contacts: IContacts[];
  filter: string;
  toggleOpen: boolean;
}
