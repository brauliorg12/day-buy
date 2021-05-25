export interface RespuestaFaqstext {
  ok: boolean;
  total: number;
  faqstexts: Faqstext[];
}

export interface Faqstext {
  _id?: string;
  created?: string;
  updated?: string;
  text?: string;
  status?: string;
  usuario?: string;

  title?: string;
  btn?: string;
  tipo?: string;
  url?: string;
  isChecked?: boolean;
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

