export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  vendidos: number;
}

export interface ImpactoMetrica {
  icono: string;
  valor: string;
  descripcion: string;
}

export interface Emprendimiento {
  id: string;
  nombre: string;
  emprendedor: string;
  categoria: string;
  categoriaColor: string;
  ciudad: string;
  modalidad: string;
  imagen: string;
  descripcion: string;
  perfilVerde: number;
  badges: string[];
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  horario: string;
  lat: number;
  lng: number;
  plan: 'Gratis' | 'Premium';
  estado: 'Activo' | 'Bloqueado' | 'Pendiente';
  fechaSolicitud: string;
  productos: Producto[];
  impacto: ImpactoMetrica[];
}

export const CATEGORIAS = [
  { nombre: 'Alimentos y bebidas', emoji: '🍎', color: '#0D9488', bg: '#CCFBF1' },
  { nombre: 'Artesanías', emoji: '🧶', color: '#EA7C2C', bg: '#FFEDD5' },
  { nombre: 'Cosmética natural', emoji: '🌿', color: '#BE185D', bg: '#FCE7F3' },
  { nombre: 'Para el hogar', emoji: '🏡', color: '#7C3AED', bg: '#EDE9FE' },
  { nombre: 'Para las mascotas', emoji: '🐾', color: '#D97706', bg: '#FEF3C7' },
  { nombre: 'Bisutería y accesorios', emoji: '💍', color: '#7E22CE', bg: '#F3E8FF' },
  { nombre: 'Cuidado personal', emoji: '🧴', color: '#B45309', bg: '#FEF9C3' },
  { nombre: 'Papelería', emoji: '📓', color: '#166534', bg: '#DCFCE7' },
  { nombre: 'Servicios Vive y Aprende', emoji: '🌱', color: '#0369A1', bg: '#E0F2FE' },
];

export const EMPRENDIMIENTOS: Emprendimiento[] = [
  {
    id: '1',
    nombre: 'Yoghi Probit',
    emprendedor: 'María Elena Quispe',
    categoria: 'Alimentos y bebidas',
    categoriaColor: '#0D9488',
    ciudad: 'Cochabamba',
    modalidad: 'Punto de entrega',
    imagen: 'https://images.unsplash.com/photo-1675016276166-816be56a8c11?w=600&q=80',
    descripcion: 'Yogures artesanales probióticos elaborados con leche orgánica local. Potenciamos la salud intestinal con recetas ancestrales y fermentación natural, sin conservantes ni colorantes artificiales.',
    perfilVerde: 92,
    badges: ['Producción local', 'Sin químicos', 'Economía circular'],
    instagram: 'yoghi_probit',
    facebook: 'yoghibolivia',
    horario: 'Lunes a Sábado 8:00–18:00',
    lat: -17.394,
    lng: -66.148,
    plan: 'Premium',
    estado: 'Activo',
    fechaSolicitud: '2024-11-10',
    impacto: [
      { icono: '💧', valor: '35%', descripcion: 'Ahorro de agua vs. producción industrial' },
      { icono: '♻️', valor: '1.2 kg', descripcion: 'Plástico evitado por mes' },
      { icono: '🌱', valor: '18%', descripcion: 'Menos emisiones CO₂' },
      { icono: '🤝', valor: '3', descripcion: 'Familias productoras apoyadas' },
    ],
    productos: [
      { id: 'p1', nombre: 'Yogur natural 500g', precio: 18, descripcion: 'Yogur probiótico natural sin azúcar añadida', imagen: 'https://images.unsplash.com/photo-1675016276166-816be56a8c11?w=300&q=80', stock: 45, vendidos: 128 },
      { id: 'p2', nombre: 'Yogur frutado 500g', precio: 22, descripcion: 'Con fruta de temporada cochabambina', imagen: 'https://images.unsplash.com/photo-1626783416763-67a92e5e7266?w=300&q=80', stock: 30, vendidos: 95 },
      { id: 'p3', nombre: 'Combo familiar x3', precio: 55, descripcion: '3 yogures a elección del cliente', imagen: 'https://images.unsplash.com/photo-1675016276166-816be56a8c11?w=300&q=80', stock: 15, vendidos: 60 },
    ],
  },
  {
    id: '2',
    nombre: 'Mishitos',
    emprendedor: 'Carolina Vaca Díez',
    categoria: 'Cosmética natural',
    categoriaColor: '#BE185D',
    ciudad: 'Cochabamba',
    modalidad: 'Negocio virtual',
    imagen: 'https://images.unsplash.com/photo-1614267861476-0d129972a0f4?w=600&q=80',
    descripcion: 'Cosmética artesanal 100% natural para el cuidado de tu piel. Elaboramos jabones, cremas y sérums con plantas medicinales bolivianas, sin parabenos ni sulfatos.',
    perfilVerde: 88,
    badges: ['Sin químicos', 'Packaging biodegradable', 'Producción local'],
    instagram: 'mishitos.natural',
    tiktok: 'mishitosnaturales',
    horario: 'Lunes a Viernes 9:00–17:00',
    lat: -17.38,
    lng: -66.155,
    plan: 'Premium',
    estado: 'Activo',
    fechaSolicitud: '2024-10-22',
    impacto: [
      { icono: '💧', valor: '40%', descripcion: 'Ahorro de agua en formulación' },
      { icono: '♻️', valor: '2.5 kg', descripcion: 'Plástico evitado por mes' },
      { icono: '🌿', valor: '100%', descripcion: 'Ingredientes naturales certificados' },
      { icono: '🌍', valor: '22%', descripcion: 'Menos huella de carbono' },
    ],
    productos: [
      { id: 'p4', nombre: 'Jabón de arcilla', precio: 35, descripcion: 'Jabón artesanal con arcilla blanca y aceite de coco', imagen: 'https://images.unsplash.com/photo-1614267861476-0d129972a0f4?w=300&q=80', stock: 50, vendidos: 200 },
      { id: 'p5', nombre: 'Crema hidratante', precio: 65, descripcion: 'Con aloe vera y mantequilla de karité', imagen: 'https://images.unsplash.com/photo-1739981112153-caf3a0148880?w=300&q=80', stock: 25, vendidos: 110 },
    ],
  },
  {
    id: '3',
    nombre: 'Alma de Rosa',
    emprendedor: 'Rosario Torrico',
    categoria: 'Cosmética natural',
    categoriaColor: '#BE185D',
    ciudad: 'Cochabamba',
    modalidad: 'Punto de entrega',
    imagen: 'https://images.unsplash.com/photo-1739981112153-caf3a0148880?w=600&q=80',
    descripcion: 'Cremas, aceites y tónicos faciales con extractos florales de la región boliviana. Cada producto honra la biodiversidad de nuestros valles.',
    perfilVerde: 85,
    badges: ['Sin químicos', 'Producción local', 'Reduce plástico'],
    instagram: 'almaderosa.bo',
    horario: 'Martes a Domingo 10:00–19:00',
    lat: -17.41,
    lng: -66.162,
    plan: 'Gratis',
    estado: 'Activo',
    fechaSolicitud: '2024-12-01',
    impacto: [
      { icono: '🌿', valor: '15+', descripcion: 'Plantas medicinales bolivianas usadas' },
      { icono: '♻️', valor: '1.8 kg', descripcion: 'Plástico evitado mensualmente' },
    ],
    productos: [],
  },
  {
    id: '4',
    nombre: 'Amaria',
    emprendedor: 'Amalia Mamani',
    categoria: 'Artesanías',
    categoriaColor: '#EA7C2C',
    ciudad: 'Cochabamba',
    modalidad: 'Presencial',
    imagen: 'https://images.unsplash.com/photo-1607556672044-6110fc499247?w=600&q=80',
    descripcion: 'Cerámica artesanal con técnicas ancestrales aymaras. Cada pieza es única, elaborada a mano con arcilla local y pigmentos naturales. Arte que cuenta la historia de Bolivia.',
    perfilVerde: 78,
    badges: ['Producción local', 'Economía circular', 'Apoyo comunitario'],
    instagram: 'amaria_ceramica',
    facebook: 'amariaceramica',
    horario: 'Lunes a Sábado 9:00–18:00',
    lat: -17.405,
    lng: -66.14,
    plan: 'Premium',
    estado: 'Activo',
    fechaSolicitud: '2024-09-15',
    impacto: [
      { icono: '🌱', valor: '100%', descripcion: 'Arcilla de fuentes locales sostenibles' },
      { icono: '🤝', valor: '6', descripcion: 'Artesanos de la comunidad empleados' },
    ],
    productos: [],
  },
  {
    id: '5',
    nombre: 'Frigus',
    emprendedor: 'Federico Gumucio',
    categoria: 'Alimentos y bebidas',
    categoriaColor: '#0D9488',
    ciudad: 'Cochabamba',
    modalidad: 'Negocio virtual',
    imagen: 'https://images.unsplash.com/photo-1741240977796-48aa8a893b51?w=600&q=80',
    descripcion: 'Helados artesanales de frutas exóticas bolivianas: copoazú, achachairú, tumbo y más. Elaborados sin colorantes artificiales, con fruta de temporada de productores locales.',
    perfilVerde: 80,
    badges: ['Producción local', 'Sin químicos', 'Reduce plástico'],
    instagram: 'frigus.bo',
    tiktok: 'frigusbolivia',
    horario: 'Todos los días 11:00–20:00',
    lat: -17.372,
    lng: -66.157,
    plan: 'Gratis',
    estado: 'Activo',
    fechaSolicitud: '2025-01-08',
    impacto: [
      { icono: '🌱', valor: '8+', descripcion: 'Frutas nativas bolivianas en el menú' },
      { icono: '🤝', valor: '12', descripcion: 'Familias campesinas proveedoras' },
    ],
    productos: [],
  },
  {
    id: '6',
    nombre: 'Laboratorio J&H',
    emprendedor: 'Jorge Herrera',
    categoria: 'Cuidado personal',
    categoriaColor: '#B45309',
    ciudad: 'Cochabamba',
    modalidad: 'Punto de entrega',
    imagen: 'https://images.unsplash.com/photo-1552256028-2c58c3cbfa7a?w=600&q=80',
    descripcion: 'Productos de cuidado personal formulados con ingredientes activos naturales. Shampoos sólidos, acondicionadores naturales y tratamientos capilares sin químicos dañinos.',
    perfilVerde: 83,
    badges: ['Sin químicos', 'Packaging biodegradable', 'Economía circular'],
    instagram: 'lab.jh',
    horario: 'Lunes a Viernes 8:00–17:00',
    lat: -17.395,
    lng: -66.169,
    plan: 'Premium',
    estado: 'Activo',
    fechaSolicitud: '2024-08-20',
    impacto: [
      { icono: '♻️', valor: '3 kg', descripcion: 'Plástico evitado con shampoos sólidos' },
      { icono: '💧', valor: '45%', descripcion: 'Menos agua en la producción' },
    ],
    productos: [],
  },
  {
    id: '7',
    nombre: 'Cerámica Verde',
    emprendedor: 'Valentina Cruz',
    categoria: 'Para el hogar',
    categoriaColor: '#7C3AED',
    ciudad: 'Sacaba',
    modalidad: 'Presencial',
    imagen: 'https://images.unsplash.com/photo-1589051088132-06f36a22012a?w=600&q=80',
    descripcion: 'Vajilla y decoración de hogar en cerámica sostenible. Piezas únicas para tu mesa y espacio, elaboradas con arcilla sin plomo y esmaltes naturales.',
    perfilVerde: 91,
    badges: ['Producción local', 'Reduce plástico', 'Economía circular'],
    instagram: 'ceramica.verde.bo',
    facebook: 'ceramicaverde',
    horario: 'Miércoles a Domingo 10:00–18:00',
    lat: -17.36,
    lng: -66.13,
    plan: 'Gratis',
    estado: 'Pendiente',
    fechaSolicitud: '2025-02-14',
    impacto: [
      { icono: '🌱', valor: '0%', descripcion: 'Plomo en esmaltes (libre de metales pesados)' },
      { icono: '♻️', valor: '2 kg', descripcion: 'Arcilla reciclada reutilizada mensualmente' },
    ],
    productos: [],
  },
  {
    id: '8',
    nombre: 'Dinos3d',
    emprendedor: 'Daniel Nogales',
    categoria: 'Servicios Vive y Aprende',
    categoriaColor: '#0369A1',
    ciudad: 'Cochabamba',
    modalidad: 'Negocio virtual',
    imagen: 'https://images.unsplash.com/photo-1533808235766-376cdc7e7661?w=600&q=80',
    descripcion: 'Talleres de educación ambiental y diseño 3D sostenible para niños y jóvenes. Aprendemos sobre reciclaje, biomimética y creación con materiales recuperados.',
    perfilVerde: 76,
    badges: ['Apoyo comunitario', 'Economía circular', 'Reduce plástico'],
    instagram: 'dinos3d.edu',
    tiktok: 'dinos3d',
    horario: 'Sábados y Domingos 9:00–13:00',
    lat: -17.388,
    lng: -66.153,
    plan: 'Gratis',
    estado: 'Activo',
    fechaSolicitud: '2024-12-20',
    impacto: [
      { icono: '🌱', valor: '200+', descripcion: 'Niños formados en sostenibilidad' },
      { icono: '♻️', valor: '15 kg', descripcion: 'Plástico reciclado en talleres' },
    ],
    productos: [],
  },
  {
    id: '9',
    nombre: 'Aloe Leben',
    emprendedor: 'Lena Berger',
    categoria: 'Cosmética natural',
    categoriaColor: '#BE185D',
    ciudad: 'Cochabamba',
    modalidad: 'Punto de entrega',
    imagen: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600&q=80',
    descripcion: 'Productos de bienestar y cosmética con aloe vera cultivado orgánicamente en los valles cochabambinos. Hidratación natural, sin crueldad animal, veganos.',
    perfilVerde: 89,
    badges: ['Sin químicos', 'Amigable con animales', 'Producción local'],
    instagram: 'aloeleben',
    facebook: 'aloeleden.bo',
    horario: 'Lunes a Sábado 9:00–19:00',
    lat: -17.402,
    lng: -66.145,
    plan: 'Premium',
    estado: 'Activo',
    fechaSolicitud: '2024-07-30',
    impacto: [
      { icono: '🐾', valor: '100%', descripcion: 'Vegano y sin pruebas en animales' },
      { icono: '💧', valor: '60%', descripcion: 'Aloe cultivado con agua de lluvia' },
    ],
    productos: [],
  },
  {
    id: '10',
    nombre: 'Colorina by Pao',
    emprendedor: 'Paola Soliz',
    categoria: 'Artesanías',
    categoriaColor: '#EA7C2C',
    ciudad: 'Cochabamba',
    modalidad: 'Negocio virtual',
    imagen: 'https://images.unsplash.com/photo-1626783416763-67a92e5e7266?w=600&q=80',
    descripcion: 'Pinturas y manualidades con pigmentos naturales y materiales reciclados. Cuadros, murales y talleres de arte consciente para toda la familia.',
    perfilVerde: 74,
    badges: ['Sin químicos', 'Economía circular', 'Apoyo comunitario'],
    instagram: 'colorina.pao',
    tiktok: 'colorinapao',
    horario: 'Lunes a Viernes 10:00–18:00',
    lat: -17.378,
    lng: -66.166,
    plan: 'Gratis',
    estado: 'Bloqueado',
    fechaSolicitud: '2024-11-05',
    impacto: [
      { icono: '♻️', valor: '5 kg', descripcion: 'Materiales reciclados usados mensualmente' },
      { icono: '🌿', valor: '100%', descripcion: 'Pigmentos de origen natural' },
    ],
    productos: [],
  },
];

export const BLOG_POSTS = [
  {
    id: 'b1',
    titulo: '¿Cómo identificar un producto sostenible?',
    categoria: 'Guía del consumidor',
    imagen: 'https://images.unsplash.com/photo-1533808235766-376cdc7e7661?w=600&q=80',
    categoriaColor: '#687D31',
  },
  {
    id: 'b2',
    titulo: '5 formas de reducir plástico en tus compras',
    categoria: 'Estilo de vida',
    imagen: 'https://images.unsplash.com/photo-1758432370137-bda5e8a097b0?w=600&q=80',
    categoriaColor: '#406768',
  },
  {
    id: 'b3',
    titulo: '¿Qué es la economía circular?',
    categoria: 'Educación',
    imagen: 'https://images.unsplash.com/photo-1607556672044-6110fc499247?w=600&q=80',
    categoriaColor: '#6FA9BB',
  },
  {
    id: 'b4',
    titulo: 'Compra local, impacto global',
    categoria: 'Comunidad',
    imagen: 'https://images.unsplash.com/photo-1749999391348-0eb741554ae7?w=600&q=80',
    categoriaColor: '#FF6B35',
  },
];
