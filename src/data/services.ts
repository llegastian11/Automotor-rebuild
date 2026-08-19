export type ServiceSlug = 'consulta-vehicular' | 'soat-electronico' | 'gps-vehicular' | 'seguro-vehicular' | 'reporte-infocorp' | 'libro-de-reclamos';

export const serviceNav = [
  { label: 'Consulta vehicular', detail: 'Accede gratis a fuentes oficiales.', href: '/consulta-vehicular/', icon: 'search', group: 'Consulta y documentos' },
  { label: 'Reporte Infocorp', detail: 'Historial crediticio y riesgo comercial.', href: '/reporte-infocorp/', icon: 'file', group: 'Consulta y documentos' },
  { label: 'SOAT electrónico', detail: 'Cotiza y revisa cobertura obligatoria.', href: '/soat-electronico/', icon: 'shield', group: 'Protección y seguridad' },
  { label: 'Seguro vehicular', detail: 'Protege tu vehículo con aseguradoras.', href: '/seguro-vehicular/', icon: 'shield', group: 'Protección y seguridad' },
  { label: 'GPS vehicular', detail: 'Seguridad, rastreo y monitoreo.', href: '/gps-vehicular/', icon: 'pin', group: 'Protección y seguridad' },
] as const;

export const featureText: Record<ServiceSlug, string[]> = {
  'consulta-vehicular': ['Fuentes oficiales', 'Papeletas, SOAT, SUNARP y SAT', 'Contenido guiado para compradores'],
  'soat-electronico': ['Cotización por placa', 'Emisión electrónica', 'Atención por WhatsApp'],
  'gps-vehicular': ['Planes según uso', 'Instalación coordinada', 'Monitoreo para flotas'],
  'seguro-vehicular': ['DNI o RUC', 'Vehículos nuevos y usados', 'Cotización más precisa'],
  'reporte-infocorp': ['Consulta por DNI', 'Score crediticio', 'Pago simple'],
  'libro-de-reclamos': ['Consumidor reclamante', 'Detalle del reclamo', 'Constancia de registro'],
};

export const serviceBenefits: Partial<Record<ServiceSlug, string[]>> = {
  'soat-electronico': ['Precio según vehículo', 'Sin procesos confusos', 'Emisión digital guiada'],
  'gps-vehicular': ['Más tranquilidad', 'Para uso diario', 'Opciones para empresas'],
  'seguro-vehicular': ['Cotización más precisa', 'Para DNI o RUC', 'Comparación ordenada'],
  'reporte-infocorp': ['Score crediticio', 'Historial financiero', 'Decisión antes de financiar'],
};

export const insurancePartners = ['La Positiva', 'Mapfre', 'Pacífico', 'Interseguro'];

export const gpsPartner = {
  name: 'Protemax',
  product: 'GO GPS',
  url: 'https://www.protemax.com.pe/gps/',
  features: ['GO GPS', 'Monitoreo 24/7', 'App y plataforma web', 'Flotas y uso particular'],
  description: 'Trabajamos con Protemax, cuya división GO GPS permite rastrear, monitorear y gestionar vehículos desde celular o computadora. Sus soluciones incluyen app y plataforma web, monitoreo 24/7, historial de recorrido y opciones para recupero ante robo.',
};

export const vehicleCatalog: Record<string, string[]> = {
  Toyota: ['Corolla', 'Yaris', 'RAV4', 'Hilux'],
  Hyundai: ['Accent', 'Elantra', 'Tucson', 'Santa Fe'],
  Kia: ['Rio', 'Cerato', 'Sportage', 'Seltos'],
  Mazda: ['Mazda 2', 'Mazda 3', 'CX-3', 'CX-5'],
  Volkswagen: ['Polo', 'Golf', 'T-Cross', 'Tiguan'],
};

/** Fuentes oficiales por antecedente — mismo modelo de datos usado en Plaquéalo/consulta-vehicular. */
export const sourceGroups = [
  {
    title: 'Identidad, propiedad y seguro',
    countLabel: '03 fuentes',
    wide: true,
    category: 'identidad',
    items: [
      { mark: 'SUN', name: 'Consulta vehicular', detail: 'SUNARP · Propietario vigente', link: 'https://consultavehicular.sunarp.gob.pe/' },
      { mark: 'SAT', name: 'Impuesto vehicular', detail: 'SAT Lima · Deudas', link: 'https://www.sat.gob.pe/VirtualSAT/principal.aspx' },
      { mark: 'SOAT', name: 'Consulta de SOAT', detail: 'APESEG · Vigencia', link: 'https://www.apeseg.org.pe/consultas-soat/' },
    ],
  },
  {
    title: 'Papeletas y multas',
    countLabel: '06 consultas',
    wide: false,
    category: 'multas',
    items: [
      { mark: 'SAT', name: 'Papeletas SAT Lima', detail: 'Lima Metropolitana', link: 'https://www.sat.gob.pe/VirtualSAT/principal.aspx' },
      { mark: 'CAL', name: 'Papeletas Callao', detail: 'Municipalidad del Callao', link: 'https://pagopapeletascallao.pe/' },
      { mark: 'SUT', name: 'Papeletas SUTRAN', detail: 'Fiscalización nacional', link: 'https://www.sutran.gob.pe/consultas/record-de-infracciones/record-de-infracciones/' },
      { mark: 'S/', name: 'Monto SUTRAN', detail: 'Deuda acumulada', link: 'https://www.sutran.gob.pe/consultas/record-de-infracciones/verifica-tu-infraccion/' },
      { mark: 'ATU', name: 'Multas ATU', detail: 'Transporte urbano', link: 'https://pasarela.atu.gob.pe/#' },
      { mark: 'FOTO', name: 'Fotopit', detail: 'Registro de fotopapeletas', link: 'http://www.pit.gob.pe/pit2007/EstadoCuentaVelocidad.aspx' },
    ],
  },
  {
    title: 'Estado técnico y accidentes',
    countLabel: '06 consultas',
    wide: false,
    category: 'tecnico',
    items: [
      { mark: 'MTC', name: 'Inspección vehicular', detail: 'Revisión técnica MTC', link: 'https://rec.mtc.gob.pe/Citv/ArConsultaCitv' },
      { mark: 'GNV', name: 'Deudas GNV FISE', detail: 'Financiamiento energético', link: 'https://fise.minem.gob.pe:23308/consulta-taller/pages/consultaTaller/inicio' },
      { mark: 'GNV', name: 'Vigencia de tanque', detail: 'Certificación GNV', link: 'https://vh.infogas.com.pe/' },
      { mark: 'PE', name: 'Estado de placa', detail: 'Cambio y fabricación', link: 'https://www.placas.pe/#/home/verificarEstadoPlaca' },
      { mark: 'SOAT', name: 'Accidentes por SOAT', detail: 'Siniestros reportados', link: 'https://servicios.sbs.gob.pe/reportesoat/' },
      { mark: 'SEG', name: 'Accidentes por seguro', detail: 'Seguro vehicular', link: 'https://servicios.sbs.gob.pe/reportesoat/' },
    ],
  },
  {
    title: 'Papeletas en el norte del Perú',
    countLabel: '08 ciudades',
    wide: true,
    category: 'multas',
    items: [
      { mark: 'TRU', name: 'SAT Trujillo', detail: 'La Libertad', link: 'https://satt.gob.pe/servicios/record-de-infracciones' },
      { mark: 'PIU', name: 'Papeletas Piura', detail: 'Piura', link: 'http://www.munipiura.gob.pe/consulta-de-multas-de-transito#buscar-por-placa' },
      { mark: 'TAR', name: 'Papeletas Tarapoto', detail: 'San Martín', link: 'https://www.sat-t.gob.pe/' },
      { mark: 'CHI', name: 'Papeletas Chiclayo', detail: 'Lambayeque', link: 'https://virtualsatch.satch.gob.pe/virtualsatch/record_infracciones/buscar_placa_' },
      { mark: 'CAJ', name: 'Papeletas Cajamarca', detail: 'Cajamarca', link: 'https://www.satcajamarca.gob.pe/#/' },
      { mark: 'CHA', name: 'Papeletas Chachapoyas', detail: 'Amazonas', link: 'https://app.munichachapoyas.gob.pe/servicios/consulta_papeletas/app/papeletas.php' },
      { mark: 'JAÉ', name: 'Consulta Jaén', detail: 'Cajamarca', link: '' },
      { mark: 'TUM', name: 'Consulta Tumbes', detail: 'Tumbes', link: '' },
    ],
  },
  {
    title: 'Papeletas en el centro',
    countLabel: '04 ciudades',
    wide: false,
    category: 'multas',
    items: [
      { mark: 'HYO', name: 'Papeletas Huancayo', detail: 'Junín', link: 'http://sathuancayo.fortiddns.com:888/VentanillaVirtual/ConsultaPIT.aspx' },
      { mark: 'HCO', name: 'Papeletas Huánuco', detail: 'Huánuco', link: 'https://www.munihuanuco.gob.pe/wp-content/servicios/transportes/gt_papeletas.php' },
      { mark: 'PCL', name: 'Papeletas Pucallpa', detail: 'Ucayali', link: '' },
      { mark: 'AND', name: 'Papeletas Andahuaylas', detail: 'Apurímac', link: 'https://muniandahuaylas.gob.pe/consultar-papeleta/' },
    ],
  },
  {
    title: 'Papeletas en el sur',
    countLabel: '06 ciudades',
    wide: false,
    category: 'multas',
    items: [
      { mark: 'ICA', name: 'Papeletas Ica', detail: 'Ica', link: 'https://m.satica.gob.pe/' },
      { mark: 'AQP', name: 'Papeletas Arequipa', detail: 'Arequipa', link: 'https://www.muniarequipa.gob.pe/oficina-virtual/c0nInfrPermisos/faltas/papeletas.php' },
      { mark: 'CUZ', name: 'Papeletas Cusco', detail: 'Cusco', link: 'https://cusco.gob.pe/informatica/index.php/' },
      { mark: 'TCQ', name: 'Papeletas Tacna', detail: 'Tacna', link: 'https://www.munitacna.gob.pe/pagina/sf/servicios/papeletas' },
      { mark: 'AYA', name: 'Consulta Ayacucho', detail: 'Ayacucho', link: '' },
      { mark: 'PUN', name: 'Consulta Puno', detail: 'Puno', link: '' },
    ],
  },
  {
    title: 'Historial y procedencia',
    countLabel: '05 consultas',
    wide: false,
    category: 'identidad',
    items: [
      { mark: 'SUN', name: 'Historial de propietarios', detail: 'Dueños anteriores', link: 'https://sprl.sunarp.gob.pe/sprl/ingreso', requiresAccount: true },
      { mark: 'S/', name: 'Precio pagado', detail: 'Transferencias previas', link: 'https://sigueloplus.sunarp.gob.pe/siguelo/' },
      { mark: 'SUN', name: 'Anotaciones SUNARP', detail: 'Embargo, crédito y prenda', link: 'https://sigueloplus.sunarp.gob.pe/siguelo/', requiresAccount: true },
      { mark: 'KM', name: 'Kilometraje estimado', detail: 'Referencia según antecedentes', link: '' },
      { mark: 'PE', name: 'Procedencia del vehículo', detail: 'Origen y registros disponibles', link: '' },
    ],
  },
  {
    title: 'Documentos y seguridad',
    countLabel: '04 consultas',
    wide: false,
    category: 'seguridad',
    items: [
      { mark: 'TIVE', name: 'Descargar TIVE', detail: 'Tarjeta de propiedad', link: 'https://www.sunarp.gob.pe/serviciosenlinea/portal/tarjeta-de-identificacion-vehicular-electronica-tive.html' },
      { mark: 'PNP', name: 'Lunas polarizadas', detail: 'Permiso policial', link: 'https://sistemas.policia.gob.pe/consultalunas/ConsultarServicioLunas' },
      { mark: 'PNP', name: 'Consulta de robo', detail: 'Requisitoria vehicular', link: 'https://sistemas1.policia.gob.pe/ConsultaPVR/ErrorSesion.aspx' },
      { mark: 'SAT', name: 'Orden de captura', detail: 'SAT Lima', link: 'https://www.sat.gob.pe/VirtualSAT/principal.aspx' },
    ],
  },
];
