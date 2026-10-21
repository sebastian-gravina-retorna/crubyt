// Contenido institucional de Crubyt (migrado desde crubyt.com).
// Editar acá los textos: cada página lee de este archivo.

export const contact = {
  email: 'info@crubyt.com',
  linkedin: 'https://www.linkedin.com/company/crubyt/',
  instagram: 'https://www.instagram.com/crubytinc',
  tagline: 'Your cloud native AI partner',
}

export type NavItem = { label: string; to?: string; children?: { label: string; to: string; desc?: string }[] }

export const nav: NavItem[] = [
  {
    label: 'Qué hacemos',
    children: [
      { label: 'Integración de Gen AI & Open Source', to: '/integracion-de-gen-ai-open-source', desc: 'IA generativa directo a producción' },
      { label: 'FinOps', to: '/finops', desc: 'Controla el costo de tu nube' },
      { label: 'Ingeniería de Plataformas', to: '/ingenieria-de-plataformas', desc: 'Plataformas internas que aceleran' },
      { label: 'Ciberseguridad', to: '/ciberseguridad', desc: 'Seguridad que nace con el código' },
    ],
  },
  { label: 'Cómo trabajamos', to: '/como-trabajamos' },
  {
    label: 'Industrias',
    children: [
      { label: 'Startups y Scaleups', to: '/startups-y-scaleups', desc: 'Iterar, pivotar, crecer con control' },
      { label: 'Servicios Financieros', to: '/servicios-financieros', desc: 'Fintech y banca digital' },
      { label: 'Ecommerce & Retail', to: '/ecommerce-retail', desc: 'Plataformas preparadas para vender' },
      { label: 'Telecomunicaciones', to: '/telecomunicaciones', desc: 'Escala Telco con control real' },
    ],
  },
  {
    label: 'Nuestra Experiencia',
    children: [
      { label: 'Casos de Éxito', to: '/casos-de-exito' },
      { label: 'Eventos', to: '/eventos' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  { label: 'Nosotros', to: '/nosotros' },
]

export const marquee = ['Platform Engineering', 'Cybersecurity', 'SaaS Advisor', 'FinOps', 'Gen AI', 'Open Source']

// Hexágonos de servicios (popups del sitio actual)
export const hexServices = [
  { title: 'SaaS Advisor', text: 'Guía estratégica hacia el FTR de AWS y la madurez operativa del producto.', to: '/contacto' },
  { title: 'Ingeniería de Plataformas', text: 'Automatización 100% con IaC (Terraform/Terragrunt) y arquitecturas multicuentas escalables.', to: '/ingenieria-de-plataformas' },
  { title: 'Ciberseguridad', text: 'Segregación de ambientes y cumplimiento de estándares críticos como ISO 27001.', to: '/ciberseguridad' },
  { title: 'FinOps', text: 'Gobernanza activa de costos mediante SCPs y maximización de la eficiencia financiera cloud.', to: '/finops' },
  { title: 'Gen AI & Open Source', text: 'Asistido por expertos para acelerar el ciclo de vida del software sin dependencias ciegas.', to: '/integracion-de-gen-ai-open-source' },
]

export const challenges = [
  {
    title: 'Toil Operativo y Deuda Técnica',
    text: 'Exceso de intervenciones manuales y configuraciones "hardcodeadas" que generan inconsistencia (drift) en la infraestructura y frenan el despliegue continuo.',
  },
  {
    title: 'Riesgo por Entornos Compartidos',
    text: 'Falta de aislamiento entre ambientes (Dev/Prod) que incrementa el riesgo operativo y dificulta la segregación lógica necesaria para escalar.',
  },
  {
    title: 'Gaps de Compliance y Seguridad',
    text: 'Recursos críticos expuestos y ausencia de gobernanza activa que bloquean el cumplimiento de estándares como ISO 27001 o el FTR de AWS.',
  },
  {
    title: 'Ineficiencia en el Gasto Cloud (FinOps)',
    text: 'Falta de visibilidad y de políticas de control (SCPs) sobre el aprovisionamiento de recursos, derivando en sobrecostos por suboptimización.',
  },
]

export const impact = {
  kicker: "It's about how you operate.",
  title: 'Donde creamos impacto',
  text: 'Nuestra metodología de co-creación transforma infraestructuras complejas en plataformas de alto rendimiento. Atacamos directamente el toil operativo y reducimos el blast radius de tus fallos, blindando tu operación bajo estándares de clase mundial. Desde la optimización de costos en la nube hasta la implementación de IA asistida, construimos la base estratégica que permite a tu equipo innovar con confianza y escalar sin caos.',
}

// NOTA: en el sitio actual los contadores están desalineados con sus etiquetas.
// Revisar estos valores con el equipo antes de publicar.
export const stats = [
  { value: 2.5, prefix: '$', suffix: 'M+', decimals: 1, label: 'USD en gasto Cloud optimizado' },
  { value: 500, prefix: '', suffix: '+', decimals: 0, label: 'Hallazgos de seguridad mitigados' },
  { value: 4.8, prefix: '', suffix: '/5', decimals: 1, label: 'Satisfacción de nuestros clientes' },
]

export const ecosystem = [
  { group: 'Developer Experience', items: ['GitHub', 'GitLab', 'Windsurf', 'Port', 'Bitbucket'] },
  { group: 'CI/CD & Delivery', items: ['GitLab CI', 'ArgoCD', 'GitHub Actions'] },
  { group: 'Applications & Runtime', items: ['Docker', 'Kubernetes'] },
  { group: 'Cloud Infrastructure', items: ['Terraform', 'AWS', 'Azure', 'Google Cloud'] },
  { group: 'Observability', items: ['Datadog', 'OpenTelemetry', 'eBPF', 'Grafana Stack'] },
  { group: 'Data & Streaming', items: ['Kafka', 'Redshift'] },
  { group: 'FinOps & Optimization', items: ['Cast AI', 'Kubecost'] },
  { group: 'Reliability & Quality', items: ['ShamanOps', 'Testkube', 'SonarQube'] },
  { group: 'Security', items: ['Snyk', 'Security & Compliance (HIPAA, PCI)'] },
]

export const clients = [
  ['alleata', 'Alleata'],
  ['banco-del-sol', 'Banco del Sol'],
  ['banco-pichincha', 'Banco Pichincha'],
  ['bancolombia', 'Bancolombia'],
  ['fravega', 'Frávega'],
  ['bcp', 'BCP'],
  ['buenos-aires-ciudad', 'Buenos Aires Ciudad'],
  ['nequi', 'Nequi'],
  ['escuela-de-datos-vivos', 'Escuela de Datos Vivos'],
  ['cencosud', 'Cencosud'],
  ['tigo', 'Tigo'],
  ['sicom', 'SICOM'],
].map(([slug, name]) => ({ name, logo: `/assets/clients/${slug}.webp` }))

export const partnerLogos = [
  'aws', 'aws-startups', 'azure', 'cast', 'ebpf', 'github', 'gremlin', 'kubernetes', 'port', 'testkube', 'opentelemetry', 'orca', 'snyk',
].map((s) => ({ name: s, logo: `/assets/partners/${s}.webp` }))

export const awsBadges = [
  { name: 'AWS Advanced Tier Services Partner', logo: '/assets/badges/aws-advanced-tier.webp' },
  { name: 'AWS Amazon EKS Delivery', logo: '/assets/badges/aws-eks-delivery.webp' },
  { name: 'AWS Amazon ECS Delivery', logo: '/assets/badges/aws-ecs-delivery.webp' },
]

export const team = [
  { name: 'Eduardo Spotti', role: 'CEO & Founder', photo: '/assets/team/eduardo-spotti.webp' },
  { name: 'Florencia Sánchez', role: 'People Manager', photo: '/assets/team/florencia-sanchez.webp' },
  { name: 'Liliana Medina', role: 'Growth Marketing Manager', photo: '/assets/team/liliana-medina.webp' },
  { name: 'Carolina Guerrero', role: 'BDM', photo: '/assets/team/carolina-guerrero.webp' },
  { name: 'Fabián Aguilar', role: 'DevOps', photo: '/assets/team/fabian-aguilar.webp' },
  { name: 'Moisés Sira', role: 'DevSecOps', photo: '/assets/team/moises-sira.webp' },
]

export const events = [
  { title: 'Platform Engineering Summit 2024', image: '/assets/photos/aws-event.webp' },
  { title: 'Cloud Native Workshop', image: '/assets/photos/consultorio-pyme.webp' },
  { title: 'DevOps Leadership Forum', image: '/assets/photos/team-office.webp' },
]
