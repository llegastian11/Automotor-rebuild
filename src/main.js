import site from './data/site-content.json'
import './styles.css'

const assetBase = import.meta.env.BASE_URL || '/'
const basePath = assetBase === '/' ? '' : assetBase.replace(/\/$/, '')

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
      ['SAT Lima', 'https://www.sat.gob.pe/VirtualSAT/principal.aspx'],
      ['Callao', 'https://pagopapeletascallao.pe/'],
      ['SUTRAN record', 'https://www.sutran.gob.pe/consultas/record-de-infracciones/record-de-infracciones/'],
      ['Verifica infraccion SUTRAN', 'https://www.sutran.gob.pe/consultas/record-de-infracciones/verifica-tu-infraccion/'],
      ['ATU', 'https://pasarela.atu.gob.pe/#'],
      ['Foto papeletas PIT', 'http://www.pit.gob.pe/pit2007/EstadoCuentaVelocidad.aspx'],
      ['SAT Trujillo', 'https://satt.gob.pe/servicios/record-de-infracciones'],
      ['SAT Cajamarca', 'https://www.satcajamarca.gob.pe/#/'],
      ['Arequipa', 'https://www.muniarequipa.gob.pe/oficina-virtual/c0nInfrPermisos/faltas/papeletas.php'],
      ['Tacna', 'https://www.munitacna.gob.pe/pagina/sf/servicios/papeletas'],
    ],
  },
  {
    title: 'SOAT, revision tecnica y GNV',
    description: 'Validaciones de vigencia, talleres, revisiones y datos asociados al estado tecnico del vehiculo.',
    links: [
      ['APESEG SOAT', 'https://www.apeseg.org.pe/consultas-soat/'],
      ['SBS reporte SOAT', 'https://servicios.sbs.gob.pe/reportesoat/'],
      ['Consulta CITV MTC', 'https://rec.mtc.gob.pe/Citv/ArConsultaCitv'],
      ['Talleres GNV MINEM', 'https://fise.minem.gob.pe:23308/consulta-taller/pages/consultaTaller/inicio'],
      ['Infogas', 'https://vh.infogas.com.pe/'],
      ['Estado de placa', 'https://www.placas.pe/#/home/verificarEstadoPlaca'],
    ],
  },
  {
    title: 'Propiedad, gravamenes y antecedentes',
    description: 'Fuentes para revisar registros SUNARP, seguimiento documental, ordenes y antecedentes vinculados.',
    links: [
      ['Consulta SUNARP', 'https://consultavehicular.sunarp.gob.pe/'],
      ['Publicidad registral', 'https://sprl.sunarp.gob.pe/sprl/ingreso'],
      ['Siguelo SUNARP', 'https://sigueloplus.sunarp.gob.pe/siguelo/'],
      ['TIVE SUNARP', 'https://www.sunarp.gob.pe/serviciosenlinea/portal/tarjeta-de-identificacion-vehicular-electronica-tive.html'],
      ['Lunas polarizadas PNP', 'https://sistemas.policia.gob.pe/consultalunas/ConsultarServicioLunas'],
      ['Consulta PVR PNP', 'https://sistemas1.policia.gob.pe/ConsultaPVR/ErrorSesion.aspx'],
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

function renderHeader() {
  return `
    <header class="header">
      <a class="logo" href="${routeFor('/')}" aria-label="Automotor Peru"><img src="${assetPath('/automotor-logo.png')}" alt="Automotor.pe" /></a>
      <nav class="desktop-nav" aria-label="Navegacion principal">
        <div class="nav-item">
          <button type="button">Servicios <span aria-hidden="true"></span></button>
          <div class="dropdown">${renderMenu(services)}</div>
        </div>
        <div class="nav-item">
          <button type="button">Blog <span aria-hidden="true"></span></button>
          <div class="dropdown small">${renderMenu(blogLinks)}</div>
        </div>
        <a href="https://seminuevos.automotor.pe/">Seminuevos</a>
        <a href="${navLink('/contacto/')}">Contacto</a>
      </nav>
      <form class="search" id="search-form">
        <label><span>Buscar</span><input name="q" placeholder="Buscar..." /></label>
        <button aria-label="Buscar" type="submit">Buscar</button>
      </form>
      <button class="menu-button" type="button" aria-label="Abrir menu">Menu</button>
    </header>
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
  const posts = postsByCategory(slug, 6)
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

function renderConsultationSources(summary, tags) {
  return `
    <section class="consult-start" id="fuentes">
      <header class="official-head">
        <div>
          <span>Consulta vehicular</span>
          <h1>Fuentes oficiales para revisar un vehiculo en Peru</h1>
        </div>
      </header>
      <div class="consult-heading vehicle-showcase">
        <div class="vehicle-copy">
          <span>Reporte vehicular</span>
          <h2>Compra o vende con respaldo</h2>
          <p>Todo empieza por elegir la fuente correcta.</p>
          <div class="service-tags">${tags.map((text) => `<strong>${text}</strong>`).join('')}</div>
        </div>
        <div class="source-dashboard" aria-label="Resumen de verificacion vehicular">
          <div class="scan-card plate-card">
            <span>Placa referencial</span>
            <strong>ABC-123</strong>
            <small>Sin consulta interna. Te llevamos a la fuente.</small>
          </div>
          <div class="scan-card status-card is-ok">
            <span>SOAT</span>
            <strong>Verificar vigencia</strong>
          </div>
          <div class="scan-card status-card is-alert">
            <span>Papeletas</span>
            <strong>Revisar multas</strong>
          </div>
          <div class="scan-card status-card is-neutral">
            <span>Propiedad</span>
            <strong>Validar registro</strong>
          </div>
          <div class="scan-line scan-line-one"></div>
          <div class="scan-line scan-line-two"></div>
          <div class="source-next">Fuentes oficiales debajo</div>
        </div>
      </div>
      <div class="official-board" aria-label="Fuentes principales">
        ${sourceLinks
          .map(
            ({ source, title, description, href, badge, code, tone }) => `
              <a class="official-card source-tone-${tone}" href="${href}" target="_blank" rel="noreferrer">
                <span>${badge}</span>
                <strong>${code}</strong>
                <div>
                  <small>${source}</small>
                  <h2>${title}</h2>
                  <p>${description}</p>
                </div>
                <em>Ir a la fuente</em>
              </a>
            `,
          )
          .join('')}
      </div>
    </section>
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
  return `
    <section class="consult-directory" aria-label="Directorio de fuentes vehiculares">
      <header class="section-title">
        <div>
          <span>Directorio preservado</span>
          <h2>Elige que necesitas revisar</h2>
        </div>
      </header>
      <div class="source-tabs" role="tablist" aria-label="Tipos de consulta">
        ${sourceGroups.map((group, index) => `<button class="source-filter source-group-${index}${index === 0 ? ' is-active' : ''}" type="button" data-source-panel="${index}">${group.title}</button>`).join('')}
      </div>
      <div class="directory-panels">
        ${sourceGroups
          .map(
            (group, index) => `
              <article class="directory-panel source-panel-${index}${index === 0 ? ' is-active' : ''}" data-source-content="${index}">
                <button class="source-accordion" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
                  <span>${group.title}</span>
                  <strong>+</strong>
                </button>
                <div class="directory-content">
                  <p>${group.description}</p>
                  <div class="directory-links">
                    ${group.links.map(([label, href], linkIndex) => `<a class="directory-link-card source-group-${index}" href="${href}" target="_blank" rel="noreferrer"><small>${String(linkIndex + 1).padStart(2, '0')}</small><strong>${label}</strong><span>Abrir</span></a>`).join('')}
                  </div>
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `
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

  document.querySelector('#app').innerHTML = `${renderHeader()}${view}${renderFooter()}`
  setMeta(route, viewTitle)
  document.querySelector('.menu-button').addEventListener('click', () => document.body.classList.toggle('menu-open'))
  document.querySelectorAll('a[href^="/"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      navigate(stripBasePath(url.pathname))
    })
  })
  document.querySelector('#search-form').addEventListener('submit', (event) => {
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
    const open = () => {
      window.clearTimeout(closeTimer)
      item.classList.add('is-open')
    }
    const close = () => {
      closeTimer = window.setTimeout(() => item.classList.remove('is-open'), 280)
    }
    item.addEventListener('pointerenter', open)
    item.addEventListener('pointerleave', close)
    item.addEventListener('focusin', open)
    item.addEventListener('focusout', close)
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
}

function syncHeaderState() {
  document.body.classList.toggle('is-scrolled', window.scrollY > 24)
}

window.addEventListener('popstate', render)
window.addEventListener('hashchange', render)
render()
