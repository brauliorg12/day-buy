export interface RespuestaBanner {
  ok: boolean;
  total: number;
  banners: Banner[];
}

export interface Banner {
  _id?: string;
  created?: string;
  updated?: string;
  status?: string;
  img?: string;
  title?: string;
  message?: string;
  order?: string;
  location?: string;
  url?: string;
  usuario?: string;

  clicks?: number;
  urlext?: string;
  ciudad?: string;
  province?: string;
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

