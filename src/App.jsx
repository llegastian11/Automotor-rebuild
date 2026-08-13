import { useMemo, useState } from 'react'
import { Car, CircleDollarSign, Crosshair, FileCheck2, ShieldCheck, UserRound } from 'lucide-react'
import content from './data/content.json'
import './App.css'

const services = [
  {
    title: 'Reporte vehicular',
    href: 'https://automotor.pe/consulta-vehicular/',
    text: 'Historial legal, papeletas, propietarios, SOAT, gravamen y datos tecnicos por placa.',
    Icon: FileCheck2,
  },
  {
    title: 'Reporte Infocorp',
    href: 'https://automotor.pe/reporte-infocorp/',
    text: 'Consulta tu situacion crediticia antes de financiar o comprar un vehiculo.',
    Icon: UserRound,
  },
  {
    title: 'SOAT electronico',
    href: 'https://automotor.pe/soat-electronico/',
    text: 'Compra y valida tu SOAT con orientacion clara segun placa, ciudad y uso.',
    Icon: ShieldCheck,
  },
  {
    title: 'GPS vehicular',
    href: 'https://automotor.pe/gps-vehicular/',
    text: 'Monitoreo para autos, taxis, unidades de trabajo o flotas.',
    Icon: Crosshair,
  },
  {
    title: 'Seguro vehicular',
    href: 'https://automotor.pe/seguro-vehicular/',
    text: 'Cotiza con informacion ordenada del vehiculo y del solicitante.',
    Icon: Car,
  },
  {
    title: 'Impuesto vehicular',
    href: 'https://automotor.pe/impuesto-vehicular-en-lima-por-placa/',
    text: 'Valida obligaciones municipales antes de comprar o transferir.',
    Icon: CircleDollarSign,
  },
]

function cleanDate(value) {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

function App() {
  const [plate, setPlate] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const posts = useMemo(() => content.posts.slice(0, 9), [])
  const pages = useMemo(
    () =>
      content.pages.filter((page) =>
        ['consulta-vehicular', 'reporte-infocorp', 'soat-electronico', 'gps-vehicular', 'seguro-vehicular', 'contacto'].includes(page.slug),
      ),
    [],
  )

  function submitPlate(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="https://automotor.pe/">
          <strong>AUTOMOTOR<span>.PE</span></strong>
          <small>Informacion vehicular confiable en Peru</small>
        </a>
        <nav aria-label="Navegacion principal">
          <a href="#servicios">Servicios</a>
          <a href="#blog">Blog</a>
          <a href="https://seminuevos.automotor.pe/">Seminuevos</a>
          <a href="https://automotor.pe/contacto/">Contacto</a>
        </nav>
        <a className="header-action" href="#consulta">Consultar placa</a>
      </header>

      <section className="hero-section" id="consulta">
        <div className="hero-copy">
          <h1>Consulta vehicular por placa en Peru</h1>
          <p>
            Obten el historial legal, documentario, papeletas, SOAT y deudas de cualquier vehiculo
            registrado en Peru antes de comprar, vender o transferir.
          </p>

          <form className="plate-form" onSubmit={submitPlate}>
            <label htmlFor="plate">Ingresa la placa del vehiculo</label>
            <div className="plate-row">
              <div className="plate-input">
                <span>PERU</span>
                <input
                  id="plate"
                  value={plate}
                  onChange={(event) => {
                    setSubmitted(false)
                    setPlate(event.target.value.toUpperCase())
                  }}
                  placeholder="ABC-123"
                  maxLength={8}
                />
              </div>
              <button type="submit">Consultar reporte</button>
            </div>
            <p className="form-note">
              {submitted
                ? `Solicitud preparada para ${plate || 'la placa ingresada'}. En produccion se conectaria al motor de consulta.`
                : 'Busqueda segura. La informacion se organiza para una decision de compra clara.'}
            </p>
          </form>

          <div className="trust-strip" aria-label="Beneficios principales">
            <span>Informacion oficial y actualizada</span>
            <span>Reportes al instante</span>
            <span>Privacidad protegida</span>
          </div>
        </div>

        <aside className="report-panel" aria-label="Vista previa del reporte vehicular">
          <div className="vehicle-photo" aria-hidden="true"></div>
          <div className="report-top">
            <strong>Reporte vehicular</strong>
            <span>Actualizado hoy</span>
          </div>
          <div className="vehicle-summary">
            <div className="sample-plate">ABC-123</div>
            <div>
              <strong>Toyota Corolla</strong>
              <span>2018 | Sedan | Blanco perlado</span>
            </div>
          </div>
          {[
            ['Estado legal', 'Sin impedimentos', 'ok'],
            ['Papeletas', '3 pendientes de pago', 'warn'],
            ['Propietarios', '2 registros encontrados', 'neutral'],
            ['SOAT', 'Vigente', 'ok'],
            ['Gravamen', 'Sin gravamen', 'ok'],
          ].map(([label, value, tone]) => (
            <div className="report-row" key={label}>
              <span>{label}</span>
              <strong className={tone}>{value}</strong>
            </div>
          ))}
          <a href="https://automotor.pe/consulta-vehicular/">Ver reporte completo</a>
        </aside>
      </section>

      <section className="services-section" id="servicios">
        <div className="section-heading">
          <h2>Nuestros servicios</h2>
          <p>Los accesos actuales del sitio se mantienen y se ordenan alrededor de la consulta vehicular.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <a className="service-card" href={service.href} key={service.title}>
              <span className="service-icon">
                <service.Icon size={25} strokeWidth={2.2} />
              </span>
              <strong>{service.title}</strong>
              <p>{service.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="content-section" id="blog">
        <div className="section-heading split">
          <div>
            <h2>Articulos y noticias</h2>
            <p>Contenido real exportado desde WordPress. Los enlaces originales quedan preservados.</p>
          </div>
          <a href="https://automotor.pe/noticias/">Ver todos los articulos</a>
        </div>
        <div className="article-grid">
          {posts.map((post) => (
            <article className="article-card" key={post.id}>
              <span>{post.category}</span>
              <time>{cleanDate(post.date)}</time>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href={post.link}>Leer mas</a>
            </article>
          ))}
        </div>
      </section>

      <section className="migration-section">
        <div>
          <h2>Mapa de migracion sin perder datos</h2>
          <p>
            Esta reconstruccion separa presentacion y contenido. La fuente local incluye {content.posts.length} posts y{' '}
            {content.pages.length} paginas obtenidas desde el API publico de WordPress.
          </p>
        </div>
        <div className="route-list">
          {pages.map((page) => (
            <a href={page.link} key={page.id}>
              <strong>{page.title}</strong>
              <span>{page.path}</span>
            </a>
          ))}
        </div>
      </section>

      <footer>
        <p>
          Automotor.pe: portal especializado en informacion automotriz, consulta vehicular, noticias,
          lanzamientos y soporte para compradores de seminuevos en Peru.
        </p>
        <nav>
          <a href="https://automotor.pe/politica-de-privacidad/">Politica de Privacidad</a>
          <a href="https://automotor.pe/terminos-y-condiciones/">Terminos y Condiciones</a>
          <a href="https://automotor.pe/aviso-legal/">Aviso Legal</a>
          <a href="https://automotor.pe/libro-de-reclamos/">Libro de reclamos</a>
        </nav>
      </footer>
    </main>
  )
}

export default App
