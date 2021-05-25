export interface RespuestaSearchtext {
  ok: boolean;
  total: number;
  searchtexts: Searchtext[];
}

export interface Searchtext {
  _id?: string;
  created?: string;
  updated?: string;
  text?: string;
  status?: string;
  location?: string;
  usuario?: string;
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

