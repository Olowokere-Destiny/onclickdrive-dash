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
  id: number;
  listing: string;
  status: string;
  history: History[];
}