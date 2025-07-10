export interface UserDetails {
  id: number;
  username: string;
  password: string;
}

interface History {
  user: string;
  action: string;
}

export interface TableDetails {
  _id: string;
  listing: string;
  status: string;
  history: History[];
}
