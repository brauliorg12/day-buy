export interface RespuestaCats {
  ok: boolean;
  total: number;
  cats: Cats[];
}

export interface Cats {
  _id?: string;
  created?: string;
  updated?: string;
  usuario?: string;

  status?: string;
  tipo?: string;
  nombre?: string;
  tags?: string;
  isChecked?: boolean;
  isadmin?: string;
}
export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
  password_c?: string;
  role?: string;
  fb?: string;
  fecha?: string;

  interests?: string;
  version?: string;
  notification_id?: string;
}

