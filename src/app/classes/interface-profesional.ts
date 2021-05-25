export interface RespuestaOffers {
  ok: boolean;
  pagina: number;
  offers: Offer[];
  sale: Commerce;
  mysales: MySale[];
}

export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
  mysales: MySale[];
}

export interface RespuestaUser {
  ok: boolean;
  total: number;
  pagina: number;
  uadm: Usuario[];
}

export interface RespuestaFarmacy {
  ok: boolean;
  pagina: number;
  farmacys: Farmacy[];
  today: string;
  tomorrow: string;
  yesterday: string;
}

export interface RespuestaCommerce {
  ok: boolean;
  pagina: number;
  total: number;
  commerces: Commerce[];
  commercesp: Commerce[];
}

export interface RespuestaFarmacys {
  ok: boolean;
  pagina: number;
  farmacys: Commerce[];
}

export interface RespuestaEmergencys {
  ok: boolean;
  pagina: number;
  emergencys: Commerce[];
}

export interface RespuestaIceCreams {
  ok: boolean;
  pagina: number;
  icecreams: Commerce[];
}

export interface RespuestaBeers {
  ok: boolean;
  pagina: number;
  beers: Commerce[];
}

export interface RespuestaTaxis {
  ok: boolean;
  pagina: number;
  taxis: Commerce[];
}

export interface RespuestaDeliverys {
  ok: boolean;
  pagina: number;
  deliverys: Commerce[];
}

export interface RespuestaUsefuls {
  ok: boolean;
  pagina: number;
  usefuls: Commerce[];
}

export interface RespuestaSales {
  ok: boolean;
  pagina: number;
  sales: Sale[];
}

export interface RespuestaMySales {
  ok: boolean;
  pagina: number;
  mysales: MySale[];
}

export interface RespuestaFavCommerce {
  ok: boolean;
  favcommerces: FavCommerce[];
}

export interface RespuestaMessage {
  ok: boolean;
  total: number;
  messages: Message[];
}


export interface RespuestaPush {
  ok: boolean;
  message: Push[];
}

export interface Farmacy {
  _id?: string;
  usuario?: Usuario[];
  farmacy_id?: Commerce[];
  turnos?: string;
  fecha?: string;
}

export interface Push {
  _id?: string;
  usuario?: Usuario;
  message?: string;
  title?: string;
  url?: string;
  launch?: string;
  offer?: string;
  created?: string;
}



export interface Offer {
  id?: string;
  commerce_id?: Commerce;
  usuario?: Usuario;
  fecha_fin?: string;
  descripcion?: string;
  promo?: string;
  porciento?: number;
  visitas?: number;
  shares?: number;
  favs?: number;
  premium?: string;
  _id?: string;
  img?: string;

  img_2?: string;
  img_3?: string;
  img_4?: string;
  img_5?: string;
  public?: string;
}

export interface Post {

  id?: string;
  commerce_id?: Commerce;
  usuario?: Usuario;
  comercio?: string;
  direccion?: string;
  descripcion?: string;
  cantidad?: number;
  porciento?: number;
  tipo?: string;
  categoria?: string;
  visitas?: number;
  fecha?: string;
  fecha_fin?: string;
  img?: string;
  promo?: string;
  tags?: string;

  _id?: string;
  code?: string;
  description?: string;
  coords?: string;
  created?: string;
  idsale?: string;

  // posicion?: boolean;

  precio?: number;
  selected?: boolean;
  modified?: number;
  count?: number;

  street?: string;
  number?: number;
  province?: string;
  municipality?: string;
  location?: string;
  neighborhood?: string;
  commerce?: string;
}

// Visitas
export interface RespuestaVProfesional {
  ok: boolean;
  favcommerces: VProfesional[];
  pagina: number;
  total: number;
}

export interface VProfesional {
  created?: string;
  usuario?: Usuario;
  commerce?: Commerce;
}

export interface Sale {
  count?: number;
  id?: string;
  cart?: boolean;
  cart_selected?: boolean;
  code?: Post;
  description?: string;
  modified?: number;
  posicion?: boolean;
  precio?: number;
  idsale?: number;
  _id?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
  offer?: boolean;
  commerce?: string;
}

export interface Commerce {
  usuario?: Usuario[];
  fecha?: string;
  coords?: string;
  bio?: string;
  cellphone?: string;
  street?: string;

  status?: string;

  telephone?: string;
  whatsapp?: string;
  delivery?: string;
  card?: string;
  opening_hours?: string;
  closing_schedule?: string;

  province?: string;
  municipality?: string;
  location?: string;
  neighborhood?: string;
  rubro?: string;
  commerce?: string;
  img?: string;
  _id?: string;
  visitas?: number;
  clickswhats?: number;
  clickscell?: number;
  clickstel?: number;
  shares?: number;
  favs?: number;

  linkinsta?: string;
  linkface?: string;
  linkweb?: string;

  home?: string;

  bussines_days?: string;
  premium?: string;
  coupons?: string;

  img_2?: string;
  img_3?: string;
  img_4?: string;
  img_5?: string;
}

export interface MySale {
  _id?: string;
  // coords?: string;
  // posicion?: boolean;

  created?: string;
  fecha_canj?: string;
  sales?: Post;
  usuario?: Usuario;
  obtenido?: boolean;
  canjeado?: boolean;
  canjeqr?: string;
}

export interface FavCommerce {
  created?: string;
  usuario?: Usuario;
  commerce?: Commerce;
}

export interface Message {
  _id?: string;
  fecha?: string;
  text?: string;
  viewed?: string;
  viewedemitter?: string;
  emitter?: Usuario;
  receiver?: Usuario;
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

