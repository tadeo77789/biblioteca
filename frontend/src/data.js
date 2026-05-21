export const CATEGORIES = [
  { id: 'all',        label: 'Todos' },
  { id: 'ficcion',    label: 'Ficción' },
  { id: 'no-ficcion', label: 'No ficción' },
  { id: 'infantil',   label: 'Infantil' },
  { id: 'ciencia',    label: 'Ciencia' },
  { id: 'historia',   label: 'Historia' },
  { id: 'poesia',     label: 'Poesía' },
  { id: 'arte',       label: 'Arte y diseño' },
  { id: 'tecnologia', label: 'Tecnología' },
];

export const BOOKS = [
  { id:'b01', title:'El silencio del bosque',       author:'Camila Pedrosa',     year:2022, pages:312, category:'ficcion',    rating:4.6, available:3, total:5, isbn:'978-84-1392-001', tags:['Novela','Misterio'],           palette:{ from:'#0e3b3b', to:'#0b1f1f', accent:'#7fb39a' } },
  { id:'b02', title:'Historia visual del siglo XX', author:'Marta Navarrete',    year:2019, pages:412, category:'historia',   rating:4.4, available:0, total:2, isbn:'978-84-1392-002', tags:['Historia','Ilustrado'],         palette:{ from:'#6e2a14', to:'#b3613b', accent:'#f3d28a' } },
  { id:'b03', title:'Cuentos de aventura',          author:'Lucía Viñuelas',     year:2021, pages:160, category:'infantil',   rating:4.8, available:4, total:6, isbn:'978-84-1392-003', tags:['Infantil','Cuentos'],           palette:{ from:'#1f6f8b', to:'#76c5b0', accent:'#ffd97a' } },
  { id:'b04', title:'Fronteras de la ciencia',      author:'Adrián Solano',      year:2023, pages:288, category:'ciencia',    rating:4.3, available:2, total:3, isbn:'978-84-1392-004', tags:['Divulgación','Ciencia'],        palette:{ from:'#0a1633', to:'#1d3a8a', accent:'#9cc7ff' } },
  { id:'b05', title:'La cocina lenta',              author:'Ester Aldarondo',    year:2020, pages:240, category:'no-ficcion', rating:4.2, available:1, total:2, isbn:'978-84-1392-005', tags:['Gastronomía','Ensayo'],         palette:{ from:'#4a2c0c', to:'#8f5a2c', accent:'#f1c98a' } },
  { id:'b06', title:'Cartografías del verso',       author:'Pablo Herreros',     year:2018, pages:124, category:'poesia',     rating:4.5, available:2, total:2, isbn:'978-84-1392-006', tags:['Poesía'],                       palette:{ from:'#2d1f4a', to:'#5a3a8a', accent:'#e9c1ff' } },
  { id:'b07', title:'Diseño y código',              author:'Ines Quintanilla',   year:2024, pages:340, category:'tecnologia', rating:4.7, available:3, total:4, isbn:'978-84-1392-007', tags:['Diseño','Programación'],        palette:{ from:'#0e2c2c', to:'#147272', accent:'#9ff0e0' } },
  { id:'b08', title:'Mujeres que mapearon el cielo',author:'Rosa Calatayud',     year:2017, pages:296, category:'historia',   rating:4.6, available:0, total:2, isbn:'978-84-1392-008', tags:['Historia','Biografía'],         palette:{ from:'#1a1f3b', to:'#3a4a8c', accent:'#f8d28a' } },
  { id:'b09', title:'Manual del jardín pequeño',    author:'Tomás Bidasoa',      year:2022, pages:212, category:'no-ficcion', rating:4.1, available:5, total:5, isbn:'978-84-1392-009', tags:['Jardinería','Práctico'],        palette:{ from:'#1f4d2f', to:'#67a26a', accent:'#dff0c2' } },
  { id:'b10', title:'El idioma de las máquinas',    author:'Yael Berenguer',     year:2024, pages:368, category:'tecnologia', rating:4.5, available:2, total:3, isbn:'978-84-1392-010', tags:['Tecnología','Ensayo'],          palette:{ from:'#11121a', to:'#3b3f6b', accent:'#a5b4ff' } },
  { id:'b11', title:'La caja de luz',               author:'Noa Vilaplana',      year:2019, pages:184, category:'arte',       rating:4.4, available:1, total:2, isbn:'978-84-1392-011', tags:['Arte','Fotografía'],            palette:{ from:'#3a2914', to:'#a07238', accent:'#fff1c8' } },
  { id:'b12', title:'Manuscrito del invierno',      author:'Jonás Aramburu',     year:2023, pages:276, category:'ficcion',    rating:4.0, available:2, total:2, isbn:'978-84-1392-012', tags:['Novela'],                       palette:{ from:'#0e2a2e', to:'#356068', accent:'#cde9ec' } },
  { id:'b13', title:'Niños del mar',                author:'Sara Esquivel',      year:2021, pages:96,  category:'infantil',   rating:4.7, available:3, total:5, isbn:'978-84-1392-013', tags:['Infantil','Álbum ilustrado'],   palette:{ from:'#0a3a5a', to:'#3a8ec0', accent:'#ffe2a0' } },
  { id:'b14', title:'Geometría del cuerpo',         author:'Ander Lasagabaster', year:2020, pages:208, category:'ciencia',    rating:4.2, available:0, total:1, isbn:'978-84-1392-014', tags:['Anatomía','Divulgación'],       palette:{ from:'#2b1f2a', to:'#7a4a5e', accent:'#f5c8d4' } },
  { id:'b15', title:'Tipografía de barrio',         author:'Helena Marçal',      year:2018, pages:144, category:'arte',       rating:4.6, available:2, total:2, isbn:'978-84-1392-015', tags:['Diseño','Tipografía'],          palette:{ from:'#3b1010', to:'#a83a3a', accent:'#ffd2c2' } },
  { id:'b16', title:'Cuaderno de poemas tibios',    author:'Bruno Cienfuegos',   year:2024, pages:88,  category:'poesia',     rating:4.3, available:1, total:1, isbn:'978-84-1392-016', tags:['Poesía'],                       palette:{ from:'#4a3a14', to:'#9c7a3a', accent:'#fff4c8' } },
];

export function defaultLoans() {
  const today = new Date();
  const addDays = (d) => {
    const x = new Date(today);
    x.setDate(today.getDate() + d);
    return x.toISOString().slice(0, 10);
  };
  return {
    active: [
      { bookId: 'b04', borrowed: addDays(-9),  due: addDays(12) },
      { bookId: 'b11', borrowed: addDays(-18), due: addDays(3)  },
      { bookId: 'b15', borrowed: addDays(-23), due: addDays(-2) },
    ],
    reservations: [
      { bookId: 'b02', reservedOn: addDays(-2), estimatedReady: addDays(7) },
    ],
    history: [
      { bookId: 'b06', returned: addDays(-30) },
      { bookId: 'b10', returned: addDays(-55) },
      { bookId: 'b03', returned: addDays(-80) },
      { bookId: 'b09', returned: addDays(-110) },
    ],
  };
}

export const EVENTS = [
  { id:'e1', title:'Club de lectura: novela contemporánea',  date:'Jueves 28 mayo',  time:'18:00', room:'Sala Borges',     spots:'8 plazas libres' },
  { id:'e2', title:'Taller infantil: cuentacuentos',         date:'Sábado 30 mayo',  time:'10:00', room:'Sala Infantil',   spots:'12 plazas libres' },
  { id:'e3', title:'Encuentro con la autora Marta Navarrete',date:'Miércoles 3 jun', time:'19:30', room:'Auditorio',       spots:'40 plazas libres' },
  { id:'e4', title:'Cine fórum: documental sobre archivos',  date:'Viernes 5 jun',   time:'19:00', room:'Sala Multimedia', spots:'18 plazas libres' },
];
