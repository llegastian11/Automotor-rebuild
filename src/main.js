import site from './data/site-content.json'
import './styles.css'

const assetBase = import.meta.env.BASE_URL || '/'
const basePath = assetBase === '/' ? '' : assetBase.replace(/\/$/, '')
const plaquealoUrl = 'https://llegastian11.github.io/automotor-prototipo/#/plaquealo'
const whatsappPhone = '51923804533'
const whatsappMessage = 'Hola Automotor, tengo dudas y necesito ayuda.'

function assetPath(path = '') {
  if (!path || path.startsWith('http') || path.startsWith('data:')) return path
  return `${assetBase.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

function stripBasePath(path = '/') {
  if (!basePath) return path || '/'
  if (path === basePath) return '/'
  if (path.startsWith(`${basePath}/`)) return path.slice(basePath.length) || '/'
  return path || '/'
}

const sourceLinks = [
  {
    source: 'SUNARP',
    title: 'Consulta Vehicular',
    description: 'Propietario, caracteristicas registrales, inscripcion y seguimiento de tramites vehiculares.',
    href: 'https://consultavehicular.sunarp.gob.pe/',
    badge: 'Registro publico',
    code: '01',
    tone: 'registry',
  },
  {
    source: 'SAT Lima',
    title: 'Impuesto vehicular',
    description: 'Impuesto, papeletas, resoluciones y obligaciones municipales para Lima.',
    href: 'https://www.sat.gob.pe/VirtualSAT/principal.aspx',
    badge: 'Tributario',
    code: '02',
    tone: 'tax',
  },
  {
    source: 'APESEG',
    title: 'Consulta de SOAT',
    description: 'Vigencia del SOAT por placa y datos de aseguradora desde la fuente del sector.',
    href: 'https://www.apeseg.org.pe/consultas-soat/',
    badge: 'Seguro obligatorio',
    code: '03',
    tone: 'insurance',
  },
]

const sourceGroups = [
  {
    title: 'Papeletas, multas y transporte',
    description: 'Accesos preservados para revisar infracciones en Lima, Callao, SUTRAN, ATU y municipalidades.',
    links: [
      ['SAT Lima', 'Papeletas, multas e impuesto vehicular en Lima.', 'https://www.sat.gob.pe/VirtualSAT/principal.aspx'],
      ['Callao', 'Consulta y pago de papeletas del Callao.', 'https://pagopapeletascallao.pe/'],
      ['SUTRAN record', 'Record de infracciones de transporte nacional.', 'https://www.sutran.gob.pe/consultas/record-de-infracciones/record-de-infracciones/'],
      ['Verifica infraccion SUTRAN', 'Detalle de infracciones registradas por SUTRAN.', 'https://www.sutran.gob.pe/consultas/record-de-infracciones/verifica-tu-infraccion/'],
      ['ATU', 'Papeletas y obligaciones de transporte urbano.', 'https://pasarela.atu.gob.pe/#'],
      ['Foto papeletas PIT', 'Evidencia fotografica de papeletas registradas.', 'http://www.pit.gob.pe/pit2007/EstadoCuentaVelocidad.aspx'],
      ['SAT Trujillo', 'Record de infracciones municipales en Trujillo.', 'https://satt.gob.pe/servicios/record-de-infracciones'],
      ['SAT Cajamarca', 'Servicios tributarios y papeletas de Cajamarca.', 'https://www.satcajamarca.gob.pe/#/'],
      ['Arequipa', 'Consulta municipal de infracciones en Arequipa.', 'https://www.muniarequipa.gob.pe/oficina-virtual/c0nInfrPermisos/faltas/papeletas.php'],
      ['Tacna', 'Papeletas y servicios municipales de Tacna.', 'https://www.munitacna.gob.pe/pagina/sf/servicios/papeletas'],
    ],
  },
  {
    title: 'SOAT, revision tecnica y GNV',
    description: 'Validaciones de vigencia, talleres, revisiones y datos asociados al estado tecnico del vehiculo.',
    links: [
      ['APESEG SOAT', 'Vigencia de SOAT por placa y aseguradora.', 'https://www.apeseg.org.pe/consultas-soat/'],
      ['SBS reporte SOAT', 'Reporte de seguro obligatorio desde SBS.', 'https://servicios.sbs.gob.pe/reportesoat/'],
      ['Consulta CITV MTC', 'Estado de inspeccion tecnica vehicular.', 'https://rec.mtc.gob.pe/Citv/ArConsultaCitv'],
      ['Talleres GNV MINEM', 'Talleres autorizados para conversion o revision GNV.', 'https://fise.minem.gob.pe:23308/consulta-taller/pages/consultaTaller/inicio'],
      ['Infogas', 'Vigencia de tanque y datos del sistema GNV.', 'https://vh.infogas.com.pe/'],
      ['Estado de placa', 'Verificacion de tramite y estado de placa.', 'https://www.placas.pe/#/home/verificarEstadoPlaca'],
    ],
  },
  {
    title: 'Propiedad, gravamenes y antecedentes',
    description: 'Fuentes para revisar registros SUNARP, seguimiento documental, ordenes y antecedentes vinculados.',
    links: [
      ['Consulta SUNARP', 'Propietario, caracteristicas y datos registrales.', 'https://consultavehicular.sunarp.gob.pe/'],
      ['Publicidad registral', 'Partidas, certificados y publicidad registral.', 'https://sprl.sunarp.gob.pe/sprl/ingreso'],
      ['Siguelo SUNARP', 'Seguimiento de titulos y tramites registrales.', 'https://sigueloplus.sunarp.gob.pe/siguelo/'],
      ['TIVE SUNARP', 'Tarjeta de identificacion vehicular electronica.', 'https://www.sunarp.gob.pe/serviciosenlinea/portal/tarjeta-de-identificacion-vehicular-electronica-tive.html'],
      ['Lunas polarizadas PNP', 'Consulta de permiso para lunas polarizadas.', 'https://sistemas.policia.gob.pe/consultalunas/ConsultarServicioLunas'],
      ['Consulta PVR PNP', 'Validacion policial de requisitorias vehiculares.', 'https://sistemas1.policia.gob.pe/ConsultaPVR/ErrorSesion.aspx'],
    ],
  },
]

const consultationDirectory = [
  {
    title: 'Identidad, propiedad y seguro',
    unit: 'fuentes',
    featured: true,
    items: [
      ['SUN', 'Consulta vehicular', 'SUNARP - propietario vigente', 'https://consultavehicular.sunarp.gob.pe/'],
      ['SAT', 'Impuesto vehicular', 'SAT Lima - deudas', 'https://www.sat.gob.pe/VirtualSAT/principal.aspx'],
      ['SOAT', 'Consulta de SOAT', 'APESEG - vigencia', 'https://www.apeseg.org.pe/consultas-soat/'],
    ],
  },
  {
    title: 'Papeletas y multas',
    unit: 'consultas',
    items: [
      ['SAT', 'Papeletas SAT Lima', 'Lima Metropolitana', 'https://www.sat.gob.pe/VirtualSAT/principal.aspx'],
      ['CAL', 'Papeletas Callao', 'Municipalidad del Callao', 'https://pagopapeletascallao.pe/'],
      ['SUT', 'Papeletas SUTRAN', 'Fiscalización nacional', 'https://www.sutran.gob.pe/consultas/record-de-infracciones/record-de-infracciones/'],
      ['S/', 'Monto SUTRAN', 'Deuda acumulada', 'https://www.sutran.gob.pe/consultas/record-de-infracciones/verifica-tu-infraccion/'],
      ['ATU', 'Multas ATU', 'Transporte urbano', 'https://pasarela.atu.gob.pe/#'],
      ['FOTO', 'Fotopit', 'Registro de fotopapeletas', 'http://www.pit.gob.pe/pit2007/EstadoCuentaVelocidad.aspx'],
    ],
  },
  {
    title: 'Estado técnico y accidentes',
    unit: 'consultas',
    items: [
      ['MTC', 'Inspección vehicular', 'Revisión técnica MTC', 'https://rec.mtc.gob.pe/Citv/ArConsultaCitv'],
      ['GNV', 'Deudas GNV FISE', 'Financiamiento energético', 'https://fise.minem.gob.pe:23308/consulta-taller/pages/consultaTaller/inicio'],
      ['GNV', 'Vigencia de tanque', 'Certificación GNV', 'https://vh.infogas.com.pe/'],
      ['PE', 'Estado de placa', 'Cambio y fabricación', 'https://www.placas.pe/#/home/verificarEstadoPlaca'],
      ['SOAT', 'Accidentes por SOAT', 'Siniestros reportados', 'https://servicios.sbs.gob.pe/reportesoat/'],
      ['SEG', 'Accidentes por seguro', 'Seguro vehicular', 'https://servicios.sbs.gob.pe/reportesoat/'],
    ],
  },
  {
    title: 'Papeletas en el norte del Perú',
    unit: 'ciudades',
    wide: true,
    items: [
      ['TRU', 'SAT Trujillo', 'La Libertad', 'https://satt.gob.pe/servicios/record-de-infracciones'],
      ['PIU', 'Papeletas Piura', 'Piura', ''],
      ['TAR', 'Papeletas Tarapoto', 'San Martín', ''],
      ['CHI', 'Papeletas Chiclayo', 'Lambayeque', ''],
      ['CAJ', 'Papeletas Cajamarca', 'Cajamarca', 'https://www.satcajamarca.gob.pe/#/'],
      ['CHA', 'Papeletas Chachapoyas', 'Amazonas', ''],
      ['JAE', 'Consulta Jaen', 'Cajamarca', ''],
      ['TUM', 'Consulta Tumbes', 'Tumbes', ''],
    ],
  },
  {
    title: 'Papeletas en el centro',
    unit: 'ciudades',
    items: [
      ['HYO', 'Papeletas Huancayo', 'Junín', ''],
      ['HCO', 'Papeletas Huánuco', 'Huánuco', ''],
      ['PCL', 'Papeletas Pucallpa', 'Ucayali', ''],
      ['AND', 'Papeletas Andahuaylas', 'Apurimac', ''],
    ],
  },
  {
    title: 'Papeletas en el sur',
    unit: 'ciudades',
    items: [
      ['ICA', 'Papeletas Ica', 'Ica', ''],
      ['AQP', 'Papeletas Arequipa', 'Arequipa', 'https://www.muniarequipa.gob.pe/oficina-virtual/c0nInfrPermisos/faltas/papeletas.php'],
      ['CUZ', 'Papeletas Cusco', 'Cusco', ''],
      ['TCQ', 'Papeletas Tacna', 'Tacna', 'https://www.munitacna.gob.pe/pagina/sf/servicios/papeletas'],
      ['AYA', 'Consulta Ayacucho', 'Ayacucho', ''],
      ['PUN', 'Consulta Puno', 'Puno', ''],
    ],
  },
  {
    title: 'Historial y procedencia',
    unit: 'consultas',
    items: [
      ['SUN', 'Historial de propietarios', 'Dueños anteriores', 'https://sprl.sunarp.gob.pe/sprl/ingreso', 'Requiere cuenta SUNARP'],
      ['S/', 'Precio pagado', 'Transferencias previas', 'https://sprl.sunarp.gob.pe/sprl/ingreso'],
      ['SUN', 'Anotaciones SUNARP', 'Embargo, crédito y prenda', 'https://sprl.sunarp.gob.pe/sprl/ingreso', 'Requiere cuenta SUNARP'],
      ['KM', 'Kilometraje estimado', 'Referencia segun antecedentes', ''],
      ['PE', 'Procedencia del vehículo', 'Origen y registros disponibles', ''],
    ],
  },
  {
    title: 'Documentos y seguridad',
    unit: 'consultas',
    items: [
      ['TIVE', 'Descargar TIVE', 'Tarjeta de propiedad', 'https://www.sunarp.gob.pe/serviciosenlinea/portal/tarjeta-de-identificacion-vehicular-electronica-tive.html'],
      ['PNP', 'Lunas polarizadas', 'Permiso policial', 'https://sistemas.policia.gob.pe/consultalunas/ConsultarServicioLunas'],
      ['PNP', 'Consulta de robo', 'Requisitoria vehicular', 'https://sistemas1.policia.gob.pe/ConsultaPVR/ErrorSesion.aspx'],
      ['SAT', 'Orden de captura', 'SAT Lima', 'https://www.sat.gob.pe/VirtualSAT/principal.aspx'],
    ],
  },
]

const services = [
  ['Reporte Infocorp', '/reporte-infocorp/'],
  ['Reporte vehicular', '/consulta-vehicular/'],
  ['SOAT electronico', '/soat-electronico/'],
  ['GPS vehicular', '/gps-vehicular/'],
  ['Seguro vehicular', '/seguro-vehicular/'],
]

const serviceNav = [
  {
    label: 'Consulta vehicular',
    detail: 'Accede gratis a fuentes oficiales.',
    href: '/consulta-vehicular/',
    icon: 'search',
    group: 'Consulta y documentos',
  },
  {
    label: 'Reporte Infocorp',
    detail: 'Historial crediticio y riesgo comercial.',
    href: '/reporte-infocorp/',
    icon: 'file',
    group: 'Consulta y documentos',
  },
  {
    label: 'SOAT electrónico',
    detail: 'Cotiza y revisa cobertura obligatoria.',
    href: '/soat-electronico/',
    icon: 'shield',
    group: 'Proteccion y seguridad',
  },
  {
    label: 'Seguro vehicular',
    detail: 'Protege tu vehiculo con aseguradoras.',
    href: '/seguro-vehicular/',
    icon: 'shield',
    group: 'Proteccion y seguridad',
  },
  {
    label: 'GPS vehicular',
    detail: 'Seguridad, rastreo y monitoreo.',
    href: '/gps-vehicular/',
    icon: 'pin',
    group: 'Proteccion y seguridad',
  },
]

const blogLinks = [
  ['Lanzamientos', '/lanzamientos/'],
  ['Historia', '/categoria/historia-automotriz/'],
  ['Noticias', '/noticias/'],
]

const allEntries = [...site.posts, ...site.pages]
const entryByPath = new Map(allEntries.map((entry) => [entry.path, entry]))

function routeFor(path) {
  if (!path || path.startsWith('http')) return path
  if (!path.startsWith('/')) return path
  return `${basePath}${path}`
}

function navigate(path) {
  const route = stripBasePath(path)
  window.history.pushState({}, '', routeFor(route))
  document.body.classList.remove('menu-open')
  render()
}

function localizeHref(href = '') {
  try {
    const url = new URL(href, 'https://automotor.pe')
    const pageMatch = url.pathname.match(/\/page\/(\d+)\/?$/)
    if (pageMatch) return `/archivo/page/${pageMatch[1]}/`
    if (url.pathname.includes('/wp-json/wp/v2/pages/page/2')) return '/archivo/page/2/'
    if (url.hostname === 'automotor.pe' && entryByPath.has(url.pathname)) return routeFor(url.pathname)
  } catch {
    const pageMatch = href.match(/\/page\/(\d+)\/?$/)
    if (pageMatch) return `/archivo/page/${pageMatch[1]}/`
    if (entryByPath.has(href)) return routeFor(href)
  }
  return href
}

function rewriteHtml(html = '') {
  return html
    .replace(/href="([^"]+)"/g, (_, href) => `href="${localizeHref(href)}"`)
    .replace(/src="(\/migrated-media\/[^"]+)"/g, (_, src) => `src="${assetPath(src)}"`)
    .replace(/srcset="([^"]+)"/g, (_, srcset) => {
      const rewritten = srcset
        .split(',')
        .map((candidate) => {
          const [src, descriptor] = candidate.trim().split(/\s+/, 2)
          return [src.startsWith('/migrated-media/') ? assetPath(src) : src, descriptor].filter(Boolean).join(' ')
        })
        .join(', ')
      return `srcset="${rewritten}"`
    })
}

function formatDate(value) {
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
}

function clip(text = '', length = 180) {
  return text.length > length ? `${text.slice(0, length).trim()}...` : text
}

function navLink(path) {
  if (path.startsWith('http')) return path
  if (path.startsWith('#')) return path.slice(1)
  if (path.startsWith('/categoria/') || path.startsWith('/archivo/')) return routeFor(path)
  return entryByPath.has(path) ? routeFor(path) : `https://automotor.pe${path}`
}

function renderMenu(items) {
  return items.map(([label, path]) => `<a href="${navLink(path)}">${label}</a>`).join('')
}

function iconGlyph(name) {
  const icons = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z"></path><path d="m9 12 2 2 4-5"></path></svg>',
    file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7V3Z"></path><path d="M14 3v5h5"></path><path d="M10 13h6"></path><path d="M10 17h5"></path></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z"></path><circle cx="12" cy="10" r="2"></circle></svg>',
    tag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11V4h7l9 9-7 7-9-9Z"></path><circle cx="8" cy="8" r="1"></circle></svg>',
    grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h5v5H5z"></path><path d="M14 5h5v5h-5z"></path><path d="M5 14h5v5H5z"></path><path d="M14 14h5v5h-5z"></path></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7a4 4 0 0 1 4 4v10a4 4 0 0 0-4-4H4V5Z"></path><path d="M20 5h-5a4 4 0 0 0-4 4"></path></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>',
    car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16h14l-2-6H7l-2 6Z"></path><path d="M7 16v3"></path><path d="M17 16v3"></path><circle cx="8" cy="19" r="1"></circle><circle cx="16" cy="19" r="1"></circle></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',
  }
  return icons[name] || icons.file
}

function renderServiceMega() {
  const groups = ['Consulta y documentos', 'Proteccion y seguridad']
  return `
    <div class="services-dropdown" role="menu">
      <div class="mega-intro">
        <strong>Servicios Automotor</strong>
        <span>Herramientas para comprar, proteger y administrar vehiculos.</span>
      </div>
      <div class="mega-columns">
        ${groups.map((group) => `
          <div class="mega-column">
            <p>${group}</p>
            ${serviceNav.filter((item) => item.group === group).map((item) => `
              <a class="service-nav-item" href="${navLink(item.href)}" role="menuitem">
                <span>${iconGlyph(item.icon)}</span>
                <strong>${item.label}</strong>
                <small>${item.detail}</small>
              </a>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `
}

function renderBlogDropdown() {
  return `
    <div class="blog-dropdown" role="menu">
      ${blogLinks.map(([label, path]) => `
        <a class="blog-nav-item" href="${navLink(path)}" role="menuitem">
          <span>${label.slice(0, 2).toUpperCase()}</span>
          <strong>${label}</strong>
          <small>${label === 'Historia' ? 'Historia automotriz' : `Categoria ${label.toLowerCase()}`}</small>
        </a>
      `).join('')}
    </div>
  `
}

function renderHeader() {
  const mobileServiceItems = [
    ['Plaquealo', plaquealoUrl, 'grid'],
    ['Vehículos', plaquealoUrl, 'grid'],
  ]
  return `
    <header class="header">
      <a class="logo" href="${routeFor('/')}" aria-label="Automotor Peru"><img src="${assetPath('/automotor-logo.png')}" alt="Automotor.pe" /></a>
      <nav class="desktop-nav" id="primary-nav" aria-label="Navegacion principal">
        <a class="nav-plaquealo" href="${plaquealoUrl}">Plaquealo</a>
        <a href="${plaquealoUrl}">Vehículos</a>
        <div class="nav-item services-menu">
          <button class="services-trigger" type="button" aria-expanded="false">Otros servicios <span class="services-caret" aria-hidden="true"></span></button>
          ${renderServiceMega()}
        </div>
        <a class="nav-blog-link" href="${routeFor('/archivo/')}">Blog</a>
      </nav>
      <div class="header-actions">
        <button class="header-publish publish-open" type="button">${iconGlyph('car')}<span>Publicar vehículo</span><b>${iconGlyph('plus')}</b></button>
      </div>
      <button class="menu-button" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-drawer"><span></span><span></span></button>
      <aside class="mobile-drawer" id="mobile-drawer" aria-label="Menu movil">
        <div class="mobile-drawer-head">
          <a class="mobile-brand" href="${routeFor('/')}" aria-label="Automotor Peru"><img src="${assetPath('/automotor-logo.png')}" alt="Automotor.pe" /></a>
          <button class="mobile-close" type="button" aria-label="Cerrar menu"><span></span><span></span></button>
        </div>
        <div class="mobile-rule"></div>
        <nav class="mobile-links">
          ${mobileServiceItems.map(([label, href, icon], index) => `<a class="${index === 0 ? 'mobile-plaquealo' : ''}" href="${href}">${iconGlyph(icon)}<span>${label}</span></a>`).join('')}
          <p>Otros servicios</p>
          ${serviceNav.map((item) => `<a href="${navLink(item.href)}">${iconGlyph(item.icon)}<span>${item.label}</span></a>`).join('')}
          <p>Blog</p>
          <a href="${routeFor('/archivo/')}">${iconGlyph('book')}<span>Blog</span></a>
        </nav>
        <div class="mobile-drawer-actions">
          <button class="mobile-publish publish-open" type="button">Publicar vehículo</button>
        </div>
        <div class="mobile-legal"><span>Legal</span><span>Privacidad</span><span>Cookies</span></div>
      </aside>
    </header>
  `
}

function renderPublishModal() {
  return `
    <div class="modal publish-modal" aria-hidden="true">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="publish-title">
        <div class="modal-top">
          <div>
            <h2 id="publish-title">Publicar vehículo</h2>
            <p>Crea una publicación clara</p>
          </div>
          <button class="modal-close" type="button" aria-label="Cerrar formulario">${iconGlyph('plus')}</button>
        </div>
        <form class="publish-form">
          <fieldset>
            <legend>1. Identificación</legend>
            <label><span>Placa</span><input type="text" placeholder="ABC-123" /></label>
            <label><span>Año</span><input type="number" placeholder="2021" /></label>
            <label><span>Marca</span><select><option>Selecciona una marca</option><option>Toyota</option><option>Hyundai</option><option>Kia</option><option>Mazda</option><option>Volkswagen</option><option>BMW</option></select></label>
            <label><span>Modelo</span><input type="text" placeholder="Modelo" /></label>
          </fieldset>
          <fieldset>
            <legend>2. Características</legend>
            <label><span>Kilometraje</span><input type="number" placeholder="45000" /></label>
            <label><span>Transmisión</span><select><option>Automática</option><option>Mecánica</option></select></label>
            <label><span>Combustible</span><select><option>Gasolina</option><option>Diésel</option><option>Híbrido</option><option>Eléctrico</option></select></label>
            <label><span>Versión</span><input type="text" placeholder="Versión" /></label>
          </fieldset>
          <fieldset>
            <legend>3. Publicación</legend>
            <label><span>Precio</span><input type="text" placeholder="US$ 18,500" /></label>
            <label><span>Ubicación</span><input type="text" placeholder="Lima" /></label>
            <label class="wide"><span>Descripción</span><textarea placeholder="Describe el estado, mantenimiento y extras"></textarea></label>
            <label><span>Fotos</span><input type="file" multiple /></label>
          </fieldset>
          <fieldset class="verification-box">
            <legend>4. Verificación</legend>
            <label><input type="radio" name="verify" checked /> <span>Publicación estándar</span></label>
            <label><input type="radio" name="verify" /> <span>Verificada por Automotor.pe</span></label>
            <p>La verificación ayuda a presentar la información disponible con mayor claridad. No reemplaza una inspección física ni constituye garantía legal.</p>
          </fieldset>
          <button type="button">Enviar publicación</button>
          <p class="modal-note">Los datos se conservan en esta sesión de demostración.</p>
        </form>
      </div>
    </div>
  `
}

function renderHero() {
  const lead = site.posts[0]
  return `
    <section class="hero">
      <div class="hero-overlay hero-copy">
        <p>Automotor.pe</p>
        <h1>Informacion vehicular para comprar, vender y decidir mejor.</h1>
        <span>Noticias, historia automotriz, lanzamientos y guias de consulta para el mercado peruano.</span>
        <div class="hero-actions">
          <a href="${routeFor('/archivo/')}">Explorar articulos</a>
          <a href="${routeFor('/consulta-vehicular/')}">Consulta vehicular</a>
        </div>
      </div>
      <a class="hero-feature" href="${routeFor(lead.path)}">
        ${lead.featuredMedia?.url ? `<img src="${assetPath(lead.featuredMedia.url)}" alt="${lead.title}" />` : ''}
        <span>${lead.category}</span>
        <strong>${lead.title}</strong>
        <small>${formatDate(lead.date)}</small>
      </a>
    </section>
  `
}

function renderPostCard(post) {
  const image = assetPath(post.featuredMedia?.url)
  return `
    <article class="post-card">
      ${image ? `<img src="${image}" alt="${post.featuredMedia.alt || post.title}" loading="lazy" />` : ''}
      <span>${post.category}</span>
      <time>${formatDate(post.date)}</time>
      <h3>${post.title}</h3>
      <p>${clip(post.excerpt || post.plainText)}</p>
      <a href="${routeFor(post.path)}">Leer mas</a>
    </article>
  `
}

function postsByCategory(slug, limit = 6) {
  return site.posts.filter((post) => post.categories.some((cat) => cat.slug === slug)).slice(0, limit)
}

function renderFeaturedPosts() {
  const [lead, ...rest] = site.posts.slice(0, 5)
  return `
    <section class="featured">
      <header class="section-title">
        <div>
          <span>Actualidad</span>
          <h2>Lo ultimo en Automotor</h2>
        </div>
        <a href="${routeFor('/archivo/')}">Ver archivo completo</a>
      </header>
      <div class="featured-layout">
        <a class="lead-card" href="${routeFor(lead.path)}">
          ${lead.featuredMedia?.url ? `<img src="${assetPath(lead.featuredMedia.url)}" alt="${lead.title}" />` : ''}
          <div>
            <span>${lead.category}</span>
            <h3>${lead.title}</h3>
            <p>${clip(lead.excerpt || lead.plainText, 220)}</p>
          </div>
        </a>
        <div class="compact-list">
          ${rest
            .map(
              (post) => `
                <a href="${routeFor(post.path)}">
                  <span>${post.category}</span>
                  <strong>${post.title}</strong>
                  <small>${formatDate(post.date)}</small>
                </a>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `
}

function renderCategorySection(slug, title, intro, cta = 'Ver categoria') {
  const posts = postsByCategory(slug, 3)
  if (!posts.length) return ''
  return `
    <section class="category-section">
      <header class="section-title">
        <div>
          <span>${intro}</span>
          <h2>${title}</h2>
        </div>
        <a href="${routeFor(`/categoria/${slug}/`)}">${cta}</a>
      </header>
      <div class="post-grid">${posts.map(renderPostCard).join('')}</div>
    </section>
  `
}

function renderHomeDecisionBlock() {
  return `
    <section class="home-decision" id="reporte-plaquelo">
      <header>
        <span>Reporte vehicular</span>
        <h2>¿Cómo deseas obtener el historial?</h2>
        <p>Consulta las fuentes oficiales manualmente o recibe un reporte Plaquealo consolidado, visual y listo para decidir en 2 minutos.</p>
      </header>
      <div class="decision-grid">
        <article class="decision-card manual">
          <div>
            <small>Opción 1</small>
            <h3>Manual y gratuita</h3>
          </div>
          <ul>
            <li>Consultar 5 a 8 páginas distintas.</li>
            <li>Resolver CAPTCHAs, formularios y páginas lentas.</li>
            <li>Interpretar datos dispersos y tecnicismos.</li>
            <li>Tiempo estimado: 30 a 45 minutos.</li>
          </ul>
          <a href="${routeFor('/consulta-vehicular/')}">Ver enlaces oficiales gratuitos</a>
        </article>
        <article class="decision-card premium">
          <div>
            <small>Opción 2</small>
            <h3>Reporte Plaquealo</h3>
          </div>
          <ul>
            <li>Todo consolidado en un solo documento.</li>
            <li>Listo en solo 2 minutos.</li>
            <li>Formato limpio, visual y fácil de leer.</li>
            <li>Cruce automático de datos oficiales.</li>
          </ul>
          <a href="${plaquealoUrl}">Generar reporte en 2 minutos</a>
        </article>
      </div>
    </section>
  `
}

function renderSources(showHeader = true) {
  return `
    <section class="sources service-sources" id="fuentes">
      <header>
        ${showHeader ? '<h2>Fuentes de consulta vehicular</h2><p>Accesos principales preservados como enlaces y contexto editorial.</p>' : ''}
      </header>
      <div class="source-grid">
        ${sourceLinks
          .map(
            ({ source, title, description, href }) => `
              <a class="source-card" href="${href}" target="_blank" rel="noreferrer">
                <strong>${source}</strong>
                <h3>${title}</h3>
                <p>${description}</p>
              </a>
            `,
          )
          .join('')}
      </div>
      <div class="source-list">${sourceGroups.map((group) => `<button type="button">${group.title}<span>+</span></button>`).join('')}</div>
    </section>
  `
}

function renderServiceStrip() {
  return `
    <section class="service-strip">
      <header class="section-title service-title">
        <div>
          <span>Servicios</span>
          <h2>Accesos principales</h2>
        </div>
      </header>
      ${services
        .map(
          ([label, path]) => `
            <a href="${navLink(path)}">
              <span>${label}</span>
              <small>Ver servicio</small>
            </a>
          `,
        )
        .join('')}
    </section>
  `
}

function renderHome() {
  return `
    ${renderHero()}
    <main>
      <section class="intro intro-modern">
        <div>
          <strong>${site.totals.posts}</strong>
          <span>articulos migrados</span>
        </div>
        <div>
          <strong>${site.totals.pages}</strong>
          <span>paginas preservadas</span>
        </div>
        <div>
          <strong>${site.totals.media}</strong>
          <span>registros de media</span>
        </div>
        <p>Todo el contenido publicado se conserva con slugs, imagenes y enlaces originales, organizado ahora en una experiencia mas rapida y clara.</p>
      </section>
      ${renderServiceStrip()}
      ${renderHomeDecisionBlock()}
      ${renderFeaturedPosts()}
      ${renderCategorySection('historia-automotriz', 'Historia Automotriz', 'Archivo editorial')}
      ${renderCategorySection('lanzamientos', 'Lanzamientos en Peru', 'Mercado automotor')}
      ${renderCategorySection('noticias', 'Noticias y guias', 'Consultas vehiculares', 'Ver noticias')}
    </main>
  `
}

function renderArchive(posts = site.posts, title = 'Todos los articulos publicados', subtitle = `${site.posts.length} articulos migrados desde WordPress`, page = 1, baseRoute = '/archivo') {
  const perPage = 12
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage))
  const current = Math.min(Math.max(Number(page) || 1, 1), totalPages)
  const visible = posts.slice((current - 1) * perPage, current * perPage)
  return `
    <main class="archive">
      <header class="page-head">
        <a href="${routeFor('/')}">Automotor.pe</a>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </header>
      <div class="category-nav">
        <a href="${routeFor('/archivo/')}">Todo</a>
        ${site.categories.filter((cat) => cat.count > 0).map((cat) => `<a href="${routeFor(`/categoria/${cat.slug}/`)}">${cat.name} (${cat.count})</a>`).join('')}
      </div>
      <div class="post-grid">${visible.map(renderPostCard).join('')}</div>
      <nav class="pager" aria-label="Paginacion de articulos">
        ${current > 1 ? `<a href="${routeFor(`${baseRoute}/page/${current - 1}/`)}">Entradas recientes</a>` : '<span></span>'}
        <strong>Pagina ${current} de ${totalPages}</strong>
        ${current < totalPages ? `<a href="${routeFor(`${baseRoute}/page/${current + 1}/`)}">Entradas mas antiguas</a>` : '<span></span>'}
      </nav>
    </main>
  `
}

function renderEntry(entry) {
  const isPost = entry.type === 'post'
  const service = renderServiceEntry(entry)
  if (service) return service
  return `
    <main class="entry-layout">
      <article class="entry">
        <a class="back-link" href="${routeFor(isPost ? '/archivo/' : '/')}">Volver</a>
        ${entry.featuredMedia?.url ? `<img class="entry-image" src="${assetPath(entry.featuredMedia.url)}" alt="${entry.featuredMedia.alt || entry.title}" />` : ''}
        <header class="entry-head">
          <span>${isPost ? entry.category : 'Pagina'}</span>
          <h1>${entry.title}</h1>
          <p>${isPost ? formatDate(entry.date) : `Actualizado: ${formatDate(entry.modified)}`}</p>
          <a href="${entry.link}" target="_blank" rel="noreferrer">URL original preservada</a>
        </header>
        <div class="entry-content">${rewriteHtml(entry.contentHtml)}</div>
      </article>
      <aside class="entry-side">
        <h2>Mas contenido</h2>
        ${site.posts
          .filter((post) => post.id !== entry.id)
          .slice(0, 5)
          .map((post) => `<a href="${routeFor(post.path)}">${post.title}<small>${post.category}</small></a>`)
          .join('')}
      </aside>
    </main>
  `
}

function formField(label, type = 'text', placeholder = '') {
  return `<label><span>${label}</span><input type="${type}" placeholder="${placeholder}" /></label>`
}

function renderWhatsappForm(title, fields = ['Numero de placa', 'Lugar donde circulara', 'DNI o RUC']) {
  return `
    <form class="service-form">
      <h2>${title}</h2>
      <p>Completa los datos y un asesor te respondera por WhatsApp con el siguiente paso.</p>
      <div class="form-grid">
        ${fields.map((field) => formField(field, field.toLowerCase().includes('email') ? 'email' : 'text', field.includes('placa') || field.includes('Placa') ? 'ABC-123' : '')).join('')}
        <label><span>Tipo de uso</span><select><option>Particular</option><option>Taxi</option><option>Empresa</option><option>Flota</option></select></label>
      </div>
      <button type="button">Enviar por WhatsApp</button>
      <small>Un asesor revisara la informacion y continuara la atencion por WhatsApp.</small>
    </form>
  `
}

function renderServiceEntry(entry) {
  const slug = entry.slug
  if (!['consulta-vehicular', 'soat-electronico', 'gps-vehicular', 'seguro-vehicular', 'reporte-infocorp', 'libro-de-reclamos'].includes(slug)) return ''
  const isConsulta = slug === 'consulta-vehicular'
  const isLibro = slug === 'libro-de-reclamos'
  const featureText = {
    'consulta-vehicular': ['Fuentes oficiales', 'Papeletas, SOAT, SUNARP y SAT', 'Contenido guiado para compradores'],
    'soat-electronico': ['Cotizacion por placa', 'Emision electronica', 'Atencion por WhatsApp'],
    'gps-vehicular': ['Planes segun uso', 'Instalacion coordinada', 'Monitoreo para flotas'],
    'seguro-vehicular': ['DNI o RUC', 'Vehiculos nuevos y usados', 'Cotizacion mas precisa'],
    'reporte-infocorp': ['Consulta por DNI', 'Score crediticio', 'Pago simple'],
    'libro-de-reclamos': ['Consumidor reclamante', 'Detalle del reclamo', 'Constancia de registro'],
  }[slug]
  const summary = clip(entry.plainText, 420)
  if (isConsulta) {
    return `
      <main class="service-page consult-page">
        ${renderConsultationSources(summary, featureText)}
        ${renderConsultationPanels()}
      </main>
    `
  }
  return `
    <main class="service-page">
      <section class="service-hero">
        <div>
        <a class="back-link" href="${routeFor('/')}">Automotor.pe</a>
          <span>${isLibro ? 'Atencion al consumidor' : 'Servicio Automotor'}</span>
          <h1>${entry.title}</h1>
          <p>${summary}</p>
          <div class="service-tags">${featureText.map((text) => `<strong>${text}</strong>`).join('')}</div>
        </div>
        ${isLibro ? renderClaimsForm() : slug === 'reporte-infocorp' ? renderInfocorpForm() : renderWhatsappForm('Solicita tu cotizacion')}
      </section>
      ${renderPartnerBlock(slug)}
      ${renderServiceBenefits(slug)}
    </main>
  `
}

function renderConsultationSources() {
  const totalSources = consultationDirectory.reduce((count, group) => count + group.items.length, 0)
  return `
    <section class="consult-start consult-source-system" id="fuentes">
      <header class="source-hero">
        <div class="source-hero-copy">
          <span>Consulta vehicular gratuita</span>
          <strong>Fuentes oficiales</strong>
          <h1>La información detrás de cada placa.</h1>
        </div>
        <div class="source-hero-side">
          <p>Centralizamos consultas públicas y especializadas para revisar propiedad, deudas, seguros, inspecciones, antecedentes y papeletas en distintas regiones del Perú.</p>
          <div class="source-stats">
            <div><strong>${Math.floor(totalSources / 10) * 10}+</strong><span>consultas gratuitas</span></div>
            <div><strong>${consultationDirectory.length}</strong><span>grupos de información</span></div>
            <div><strong>1</strong><span>placa para comenzar</span></div>
          </div>
        </div>
      </header>
      <div class="source-controls">
        <label>
          <span>Buscar fuente</span>
          <input type="search" id="source-search" placeholder="Buscar entidad, ciudad o información" />
        </label>
        <select id="source-category" aria-label="Filtrar fuentes por categoría">
          <option value="all">Todas las categorías</option>
          ${consultationDirectory.map((group, index) => `<option value="${index}">${group.title}</option>`).join('')}
        </select>
      </div>
      ${renderConsultationDirectory()}
    </section>
  `
}

function renderConsultationDirectory() {
  return `
    <div class="source-directory-grid">
      ${consultationDirectory.map((group, index) => `
        <article class="source-table ${group.featured ? 'is-featured' : ''} ${group.wide ? 'is-wide' : ''}" data-source-group="${index}">
          <header>
            <h2>${group.title}</h2>
            <span>${String(group.items.length).padStart(2, '0')} ${group.unit}</span>
          </header>
          <div class="source-table-list">
            ${group.items.map(([code, title, meta, href, note]) => `
              ${href ? `<a class="source-row" href="${href}" target="_blank" rel="noreferrer" data-source-text="${`${group.title} ${code} ${title} ${meta}`.toLowerCase()}">` : `<div class="source-row is-disabled" data-source-text="${`${group.title} ${code} ${title} ${meta}`.toLowerCase()}">`}
                <small>${code}</small>
                <span>
                  <strong>${title}</strong>
                  <em>${meta}</em>
                  ${note ? `<b>${note}</b>` : ''}
                </span>
                <i>${href ? 'Consultar ↗' : 'No disponible'}</i>
              ${href ? '</a>' : '</div>'}
            `).join('')}
          </div>
        </article>
      `).join('')}
    </div>
  `
}

function renderPartnerBlock(slug) {
  if (slug === 'soat-electronico' || slug === 'seguro-vehicular') {
    return `
      <section class="partner-block insurance-partners">
        <div>
          <span>Aseguradoras</span>
          <h2>Trabajamos con aseguradoras de confianza</h2>
          <p>Para SOAT y seguros vehiculares podemos orientar la cotizacion con opciones de aseguradoras reconocidas como La Positiva, Mapfre, Pacífico e Interseguro.</p>
        </div>
        <div class="partner-list" aria-label="Aseguradoras">
          ${['La Positiva', 'Mapfre', 'Pacífico', 'Interseguro'].map((name) => `<strong>${name}</strong>`).join('')}
        </div>
      </section>
    `
  }
  if (slug === 'gps-vehicular') {
    return `
      <section class="partner-block gps-partner">
        <div>
          <span>Aliado GPS</span>
          <h2>GPS vehicular con Protemax</h2>
          <p>Trabajamos con Protemax, cuya division GO GPS permite rastrear, monitorear y gestionar vehiculos desde celular o computadora. Sus soluciones incluyen app y plataforma web, monitoreo 24/7, historial de recorrido y opciones para recupero ante robo.</p>
          <a class="partner-cta" href="https://www.protemax.com.pe/gps/" target="_blank" rel="noreferrer">Ver Protemax GPS</a>
        </div>
        <div class="partner-list protemax-list">
          <strong>GO GPS</strong>
          <strong>Monitoreo 24/7</strong>
          <strong>App y plataforma web</strong>
          <strong>Flotas y uso particular</strong>
        </div>
      </section>
    `
  }
  return ''
}

function renderInfocorpForm() {
  return `
    <form class="service-form">
      <h2>Verificacion de DNI</h2>
      <p>Consulta tu reporte Infocorp y conoce tu perfil crediticio.</p>
      ${formField('Numero de DNI', 'text', '12345678')}
      <button type="button">Solicitar por S/ 14.90</button>
      <small>La solicitud se prepara para validacion y confirmacion del reporte.</small>
    </form>
  `
}

function renderClaimsForm() {
  return `
    <form class="service-form claims-form">
      <h2>Libro de Reclamaciones Virtual</h2>
      <div class="form-grid">
        <label><span>Tipo de documento</span><select><option>DNI</option><option>CE</option><option>RUC</option><option>Pasaporte</option></select></label>
        ${formField('Numero de documento', 'text', 'Documento')}
        ${formField('Nombres', 'text', 'Nombre completo')}
        ${formField('Email', 'email', 'correo@dominio.com')}
        ${formField('Telefono', 'text', '+51')}
        <label><span>Tipo de reclamacion</span><select><option>Reclamo</option><option>Queja</option></select></label>
      </div>
      <label><span>Detalle de la reclamacion</span><textarea placeholder="Describe tu caso"></textarea></label>
      <button type="button">Enviar reclamo</button>
      <small>El registro debe generar constancia y notificacion oficial al enviarse.</small>
    </form>
  `
}

function renderConsultationPanels() {
  return ''
}

function renderServiceBenefits(slug) {
  const benefits = {
    'soat-electronico': ['Precio segun vehiculo', 'Sin procesos confusos', 'Emision digital guiada'],
    'gps-vehicular': ['Mas tranquilidad', 'Para uso diario', 'Opciones para empresas'],
    'seguro-vehicular': ['Cotizacion mas precisa', 'Para DNI o RUC', 'Comparacion ordenada'],
    'reporte-infocorp': ['Score crediticio', 'Historial financiero', 'Decision antes de financiar'],
  }[slug] || ['Atencion clara', 'Informacion ordenada', 'Siguiente paso guiado']
  return `<section class="benefit-grid">${benefits.map((item) => `<article><h2>${item}</h2><p>Informacion migrada y reorganizada para una experiencia mas clara, confiable y accionable.</p></article>`).join('')}</section>`
}

function renderCategory(slug) {
  const category = site.categories.find((cat) => cat.slug === slug)
  if (!category) return renderNotFound()
  const posts = site.posts.filter((post) => post.categories.some((cat) => cat.slug === slug))
  return renderArchive(posts, category.name, `${posts.length} articulos en ${category.name}`, 1, `/categoria/${slug}`)
}

function renderCategoryPage(slug, page) {
  const category = site.categories.find((cat) => cat.slug === slug)
  if (!category) return renderNotFound()
  const posts = site.posts.filter((post) => post.categories.some((cat) => cat.slug === slug))
  return renderArchive(posts, category.name, `${posts.length} articulos en ${category.name}`, page, `/categoria/${slug}`)
}

function renderSearch(query) {
  const term = query.trim().toLowerCase()
  const posts = term
    ? site.posts.filter((post) => `${post.title} ${post.excerpt} ${post.plainText}`.toLowerCase().includes(term))
    : site.posts
  if (!posts.length) return `<main class="archive"><header class="page-head"><a href="${routeFor('/')}">Automotor.pe</a><h1>Sin resultados para "${query}"</h1><p>Prueba con placa, SOAT, Hilux, Yaris, papeletas o revisa las categorias principales.</p></header><div class="category-nav">${site.categories.filter((cat) => cat.count > 0).map((cat) => `<a href="${routeFor(`/categoria/${cat.slug}/`)}">${cat.name} (${cat.count})</a>`).join('')}</div></main>`
  return renderArchive(posts, `Busqueda: ${query || 'todo'}`, `${posts.length} resultados encontrados`)
}

function renderNotFound() {
  return `
    <main class="page-head">
      <a href="${routeFor('/')}">Automotor.pe</a>
      <h1>Contenido no encontrado</h1>
      <p>La ruta solicitada no esta en el inventario migrado.</p>
      <a href="${routeFor('/archivo/')}">Ver archivo completo</a>
    </main>
  `
}

function plainMeta(route, viewTitle = 'Automotor.pe') {
  const entry = entryByPath.get(route)
  if (entry) {
    return {
      title: `${entry.title} | Automotor.pe`,
      description: clip(entry.excerpt || entry.plainText || 'Informacion automotriz en Peru.', 155),
      image: entry.featuredMedia?.url || '/migrated-media/86188978-como-saber-si-un-toyota-yaris-tiene-papeletas-en-peru.webp',
    }
  }
  return {
    title: `${viewTitle} | Automotor.pe`,
    description: 'Portal peruano de consulta vehicular, noticias, historia automotriz, lanzamientos y servicios para compradores de vehiculos.',
    image: '/migrated-media/86188978-como-saber-si-un-toyota-yaris-tiene-papeletas-en-peru.webp',
  }
}

function setMeta(route, viewTitle) {
  const meta = plainMeta(route, viewTitle)
  document.title = meta.title
  const origin = window.location.origin
  const canonical = `${origin}${routeFor(route)}`
  const tags = {
    description: meta.description,
    'og:title': meta.title,
    'og:description': meta.description,
    'og:type': entryByPath.has(route) && entryByPath.get(route).type === 'post' ? 'article' : 'website',
    'og:url': canonical,
    'og:image': meta.image.startsWith('http') ? meta.image : `${origin}${assetPath(meta.image)}`,
    'twitter:card': 'summary_large_image',
  }
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.rel = 'canonical'
    document.head.append(canonicalLink)
  }
  canonicalLink.href = canonical
  for (const [name, content] of Object.entries(tags)) {
    const attr = name.startsWith('og:') ? 'property' : 'name'
    let element = document.head.querySelector(`meta[${attr}="${name}"]`)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attr, name)
      document.head.append(element)
    }
    element.content = content
  }
}

function renderFooter() {
  return `
    <footer>
      <p>Automotor.pe: portal especializado en consulta vehicular, noticias y contenido automotriz en Peru.</p>
      <nav>
        <a href="${navLink('/politica-de-privacidad/')}">Privacidad</a>
        <a href="${navLink('/terminos-y-condiciones/')}">Terminos</a>
        <a href="${navLink('/libro-de-reclamos/')}">Libro de reclamos</a>
      </nav>
    </footer>
  `
}

function renderWhatsappButton() {
  const href = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`
  return `
    <a class="whatsapp-float" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Escribir a Automotor por WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3.5A12.4 12.4 0 0 0 5.3 22.1L4 28l6-1.5A12.4 12.4 0 1 0 16 3.5Z"></path>
        <path d="M11.4 10.2c-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.8.1-1.2.6-.4.4-1.5 1.5-1.5 3.6s1.6 4.2 1.8 4.5c.2.3 3.1 5 7.7 6.7 3.8 1.5 4.6 1.2 5.4 1.1.8-.1 2.6-1.1 2.9-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.8-.5l-2.8-1.4c-.4-.1-.7-.2-1 .2-.3.5-1.1 1.4-1.4 1.7-.3.3-.5.3-1 .1-.4-.2-1.9-.7-3.6-2.2-1.3-1.2-2.2-2.6-2.5-3.1-.3-.4 0-.7.2-.9l.7-.8c.2-.3.3-.5.5-.8.1-.3.1-.6 0-.8l-1.3-3.1Z"></path>
      </svg>
      <span>WhatsApp</span>
    </a>
  `
}

function currentRoute() {
  if (window.location.hash.startsWith('#/')) {
    const clean = window.location.hash.slice(1)
    window.history.replaceState({}, '', routeFor(clean))
    return clean
  }
  return stripBasePath(window.location.pathname || '/')
}

function render() {
  const route = currentRoute()
  let view = ''
  let viewTitle = 'Inicio'
  if (route === '/') view = renderHome()
  else if (route === '/archivo/') { viewTitle = 'Todos los articulos publicados'; view = renderArchive() }
  else if (route.startsWith('/archivo/page/')) { viewTitle = 'Archivo de articulos'; view = renderArchive(site.posts, 'Todos los articulos publicados', `${site.posts.length} articulos migrados desde WordPress`, route.split('/')[3], '/archivo') }
  else if (route.startsWith('/page/')) { viewTitle = 'Archivo de articulos'; view = renderArchive(site.posts, 'Todos los articulos publicados', `${site.posts.length} articulos migrados desde WordPress`, route.split('/')[2], '/archivo') }
  else if (route.startsWith('/categoria/') && route.includes('/page/')) {
    const parts = route.split('/')
    viewTitle = site.categories.find((cat) => cat.slug === parts[2])?.name || 'Categoria'
    view = renderCategoryPage(parts[2], parts[4])
  }
  else if (route.startsWith('/categoria/')) { viewTitle = site.categories.find((cat) => cat.slug === route.split('/')[2])?.name || 'Categoria'; view = renderCategory(route.split('/')[2]) }
  else if (route.startsWith('/buscar/')) { viewTitle = 'Busqueda'; view = renderSearch(decodeURIComponent(route.replace('/buscar/', '').replace(/\/$/, ''))) }
  else if (entryByPath.has(route)) { viewTitle = entryByPath.get(route).title; view = renderEntry(entryByPath.get(route)) }
  else { viewTitle = 'Contenido no encontrado'; view = renderNotFound() }

  document.querySelector('#app').innerHTML = `${renderHeader()}${view}${renderFooter()}${renderPublishModal()}${renderWhatsappButton()}`
  setMeta(route, viewTitle)
  const menuButton = document.querySelector('.menu-button')
  const syncMobileMenuPosition = () => {
    const header = document.querySelector('.header')
    const bottom = header ? Math.round(header.getBoundingClientRect().bottom + 10) : 82
    document.documentElement.style.setProperty('--mobile-header-bottom', `${bottom}px`)
  }
  syncMobileMenuPosition()
  window.addEventListener('resize', syncMobileMenuPosition, { passive: true })
  menuButton.addEventListener('click', (event) => {
    event.preventDefault()
    syncMobileMenuPosition()
    const isOpen = document.body.classList.toggle('menu-open')
    menuButton.setAttribute('aria-expanded', String(isOpen))
    if (isOpen) {
      document.querySelector('.nav-item')?.classList.add('is-open')
      document.querySelector('.nav-item > button')?.setAttribute('aria-expanded', 'true')
    } else {
      document.querySelectorAll('.nav-item').forEach((item) => {
        item.classList.remove('is-open')
        item.querySelector('button')?.setAttribute('aria-expanded', 'false')
      })
    }
  })
  document.querySelector('.mobile-close')?.addEventListener('click', () => {
    document.body.classList.remove('menu-open')
    menuButton.setAttribute('aria-expanded', 'false')
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.classList.remove('is-open')
      item.querySelector('button')?.setAttribute('aria-expanded', 'false')
    })
  })
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      document.body.classList.remove('menu-open')
      menuButton.setAttribute('aria-expanded', 'false')
      navigate(stripBasePath(url.pathname))
    })
  })
  document.querySelector('#search-form')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('q') || ''
    navigate(`/buscar/${encodeURIComponent(query.toString().trim())}/`)
  })
  initInteractions()
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function initInteractions() {
  syncHeaderState()
  window.removeEventListener('scroll', syncHeaderState)
  window.addEventListener('scroll', syncHeaderState, { passive: true })
  document.querySelectorAll('.nav-item').forEach((item) => {
    let closeTimer
    const button = item.querySelector('button')
    const open = () => {
      window.clearTimeout(closeTimer)
      item.classList.add('is-open')
      button?.setAttribute('aria-expanded', 'true')
    }
    const close = () => {
      closeTimer = window.setTimeout(() => {
        item.classList.remove('is-open')
        button?.setAttribute('aria-expanded', 'false')
      }, 220)
    }
    button?.addEventListener('click', (event) => {
      if (!window.matchMedia('(max-width: 1120px)').matches) return
      event.preventDefault()
      event.stopPropagation()
      const next = !item.classList.contains('is-open')
      document.querySelectorAll('.nav-item').forEach((other) => {
        other.classList.toggle('is-open', other === item && next)
        other.querySelector('button')?.setAttribute('aria-expanded', String(other === item && next))
      })
    })
    item.addEventListener('pointerenter', () => {
      if (!window.matchMedia('(max-width: 1120px)').matches) open()
    })
    item.addEventListener('pointerleave', () => {
      if (!window.matchMedia('(max-width: 1120px)').matches) close()
    })
    item.addEventListener('focusin', () => {
      if (!window.matchMedia('(max-width: 1120px)').matches) open()
    })
    item.addEventListener('focusout', () => {
      if (!window.matchMedia('(max-width: 1120px)').matches) close()
    })
  })
  document.querySelectorAll('.source-filter').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.sourcePanel
      document.querySelectorAll('.source-filter').forEach((item) => item.classList.toggle('is-active', item === button))
      document.querySelectorAll('.directory-panel').forEach((panel) => {
        const active = panel.dataset.sourceContent === target
        panel.classList.toggle('is-active', active)
        panel.querySelector('.source-accordion')?.setAttribute('aria-expanded', String(active))
      })
    })
  })
  document.querySelectorAll('.source-accordion').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = button.closest('.directory-panel')
      const active = !panel.classList.contains('is-active')
      document.querySelectorAll('.directory-panel').forEach((item) => {
        item.classList.remove('is-active')
        item.querySelector('.source-accordion')?.setAttribute('aria-expanded', 'false')
      })
      panel.classList.toggle('is-active', active)
      button.setAttribute('aria-expanded', String(active))
    })
  })
  const sourceSearch = document.querySelector('#source-search')
  const sourceCategory = document.querySelector('#source-category')
  const filterSources = () => {
    const query = sourceSearch?.value.trim().toLowerCase() || ''
    const category = sourceCategory?.value || 'all'
    document.querySelectorAll('.source-table').forEach((group) => {
      const inCategory = category === 'all' || group.dataset.sourceGroup === category
      let visibleRows = 0
      group.querySelectorAll('.source-row').forEach((row) => {
        const matches = !query || row.dataset.sourceText.includes(query)
        row.classList.toggle('is-filtered-out', !(inCategory && matches))
        row.hidden = !(inCategory && matches)
        if (!row.hidden) visibleRows += 1
      })
      group.hidden = !inCategory || visibleRows === 0
    })
  }
  sourceSearch?.addEventListener('input', filterSources)
  sourceCategory?.addEventListener('change', filterSources)
  const publishModal = document.querySelector('.publish-modal')
  const closePublishModal = () => {
    document.body.classList.remove('publish-modal-open')
    publishModal?.setAttribute('aria-hidden', 'true')
  }
  document.querySelectorAll('.publish-open').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      document.body.classList.remove('menu-open')
      publishModal?.setAttribute('aria-hidden', 'false')
      document.body.classList.add('publish-modal-open')
      publishModal?.querySelector('input, select, textarea')?.focus()
    })
  })
  document.querySelector('.modal-close')?.addEventListener('click', closePublishModal)
  publishModal?.addEventListener('click', (event) => {
    if (event.target === publishModal) closePublishModal()
  })
  document.onkeydown = (event) => {
    if (event.key === 'Escape') closePublishModal()
  }
}

function syncHeaderState() {
  document.body.classList.toggle('is-scrolled', window.scrollY > 24)
}

window.addEventListener('popstate', render)
window.addEventListener('hashchange', render)
render()
