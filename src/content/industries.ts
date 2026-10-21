import type { Card } from './services'

export type Industry = {
  slug: string
  name: string
  eyebrow: string
  title: string
  lead: string
  cta: string
  image: string
  image2?: string
  intro: { title: string; text: string[] }
  challenges: { title: string; items: Card[] }
  approach: { title: string; text?: string; bullets?: string[]; items?: Card[] }
  pillars?: { title: string; text: string; items: { title: string; text: string; tags: string[] }[] }
  outcomes: { title: string; text?: string; items: Card[] }
  formTitle: string
}

const startupApproach = {
  title: 'Cómo acompañamos la evolución de tu negocio',
  text: 'Ayudamos a diseñar Plataformas Cloud que permitan experimentar, iterar y escalar con mayor claridad operativa. Todo esto se construye aprovechando las mejores prácticas Cloud Native y el ecosistema AWS.',
  bullets: [
    'Desplegar cambios con rapidez',
    'Mantener estándares técnicos claros',
    'Escalar la infraestructura cuando el producto crece',
    'Mantener visibilidad sobre costos y operación',
  ],
}

export const industries: Industry[] = [
  {
    slug: 'startups-y-scaleups',
    name: 'Startups y Scaleups',
    eyebrow: 'Startups y Scaleups',
    title: 'Iterar. Pivotar. Crecer sin perder control.',
    lead: 'Diseñamos plataformas cloud que permiten iterar con velocidad sin generar complejidad operativa ni deuda técnica.',
    cta: 'Contáctanos',
    image: '/assets/brand/robot.webp',
    image2: '/assets/photos/aws-event.webp',
    intro: {
      title: 'Escalar rápido importa. Escalar con estructura es lo que lo hace sostenible.',
      text: ['Cuando una startup logra estructurar su operación cloud, el cambio no se limita a la tecnología. Cambia la forma en que el equipo puede construir y hacer crecer el negocio.'],
    },
    challenges: {
      title: 'Desafíos comunes en startups',
      items: [
        { title: 'Arquitectura cloud sin un diseño estructurado', text: 'Arquitecturas que crecieron rápidamente sin un diseño estructurado.' },
        { title: 'Despliegues manuales', text: 'Procesos poco automatizados que ralentizan el desarrollo.' },
        { title: 'Dificultad para escalar', text: 'La plataforma comienza a mostrar límites cuando aumenta la demanda.' },
        { title: 'Falta de estándares técnicos', text: 'Equipos que trabajan sin procesos o prácticas compartidas.' },
        { title: 'Costos cloud sin visibilidad', text: 'El gasto empieza a crecer sin control ni previsibilidad.' },
      ],
    },
    approach: startupApproach,
    outcomes: {
      title: 'Lo que cambia al estructurar',
      items: [
        { title: 'Plataforma Cloud', text: 'Arquitectura estructurada, automatización y estándares operativos claros.' },
        { title: 'Producto', text: 'Los equipos pueden iterar, lanzar funcionalidades y experimentar con velocidad.' },
        { title: 'Operación', text: 'Procesos claros, despliegues confiables y mayor visibilidad sobre la nube.' },
        { title: 'Crecimiento', text: 'El negocio puede escalar sin que la infraestructura se convierta en un límite.' },
      ],
    },
    formTitle: '¿Qué tan preparada está tu infraestructura para escalar?',
  },
  {
    slug: 'servicios-financieros',
    name: 'Servicios Financieros',
    eyebrow: 'Servicios Financieros',
    title: 'La infraestructura detrás de tu fintech también tiene que escalar',
    lead: 'Acompañamos a equipos de ingeniería a diseñar plataformas Cloud capaces de soportar más usuarios, más transacciones y mayores exigencias de seguridad.',
    cta: 'Solicitud de diagnóstico',
    image: '/assets/photos/fintech.webp',
    image2: '/assets/photos/consultorio-pyme.webp',
    intro: {
      title: 'Escalar con estructura es lo que lo hace sostenible',
      text: [
        'Acompañamos a equipos de tecnología en fintech que necesitan avanzar rápido: lanzar funcionalidades constantemente y operar plataformas que procesan transacciones críticas todos los días.',
        'Desde nuestra experiencia, el desafío no es solo crecer, sino hacerlo manteniendo estabilidad, seguridad y control sobre la infraestructura.',
      ],
    },
    challenges: {
      title: 'Desafíos comunes en plataformas fintech de alto crecimiento',
      items: [
        { title: 'Escalar rápido sin comprometer la seguridad', text: 'Crecer sin perder la confianza de los usuarios ni exponer datos sensibles.' },
        { title: 'Cumplir cloud requirements', text: 'Navegar regulaciones como PCI DSS, SOC 2 y auditorías constantes.' },
        { title: 'Lanzar productos rápido sin sacrificar estabilidad', text: 'Iterar velozmente sin generar interrupciones en producción.' },
        { title: 'Integrar múltiples proveedores', text: 'Conectar pasarelas de pago, KYC y análisis de riesgo sin fricción.' },
        { title: 'Seguridad de datos sensibles', text: 'Proteger información financiera y cumplir con estándares internacionales.' },
        { title: 'Gestionar la complejidad técnica', text: 'Mantener arquitecturas manejables mientras el equipo y producto crecen.' },
      ],
    },
    approach: startupApproach,
    pillars: {
      title: 'Pilares tecnológicos de una fintech moderna',
      text: 'Las fintech que escalan combinan velocidad de innovación con control operativo, seguridad y eficiencia.',
      items: [
        { title: 'Plataforma Cloud Escalable', text: 'La base debe soportar picos de transacciones sin comprometer la experiencia. Usamos AWS y arquitecturas modernas para garantizar disponibilidad y elasticidad sostenida.', tags: ['AWS Lambda', 'API Gateway', 'DynamoDB'] },
        { title: 'Operación Automatizada y Confiable', text: 'Las fintechs necesitan operar 24/7 con visibilidad total sobre lo que sucede cada segundo. Los incidentes afectan directamente la confianza en tu plataforma.', tags: ['CI/CD Pipelines', 'CloudWatch', 'Auto-scaling'] },
        { title: 'Infraestructura como Código', text: 'Tu infraestructura debe poder desplegarse sin riesgo, replicarse en otros ambientes y permitir disaster recovery.', tags: ['Terraform', 'CloudFormation', 'CDK'] },
        { title: 'Seguridad como parte de la Arquitectura', text: 'La seguridad no es un add-on. En fintech debe estar incorporada en cada capa: red, datos, identidad y accesos.', tags: ['WAF', 'Encryption', 'IAM Policies'] },
        { title: 'Auditoría y Cumplimiento', text: 'Trazabilidad completa de cada cambio y acceso para responder a auditorías con evidencia.', tags: ['CloudTrail', 'Compliance', 'Audit Logs'] },
      ],
    },
    outcomes: {
      title: 'La confianza se construye en capas',
      items: [
        { title: 'Plataforma' }, { title: 'Operación' }, { title: 'Seguridad' }, { title: 'Crecimiento' },
      ],
    },
    formTitle: '¿Qué tan preparada está tu infraestructura para escalar?',
  },
  {
    slug: 'ecommerce-retail',
    name: 'Ecommerce & Retail',
    eyebrow: 'Excelencia en la infraestructura de comercio electrónico',
    title: 'Plataformas digitales preparadas para vender sin interrupciones',
    lead: 'En retail, cada segundo cuenta. Ayudamos a empresas de retail a estructurar plataformas Cloud preparadas para operar con estabilidad, escalar durante campañas y sostener la evolución digital del negocio.',
    cta: 'Contáctanos',
    image: '/assets/photos/retail.webp',
    image2: '/assets/photos/retail-team.webp',
    intro: {
      title: 'El comercio al por menor vive en ciclos constantes de demanda',
      text: ['Campañas, temporadas altas, promociones y crecimiento del tráfico digital. Las plataformas tecnológicas deben responder con velocidad, estabilidad y eficiencia para sostener la experiencia del cliente y evitar pérdidas de ventas.'],
    },
    challenges: {
      title: 'Desafíos que vemos en retail que crece',
      items: [
        { title: 'Picos de tráfico durante campañas', text: 'Black Friday, Cyber Days o promociones especiales pueden multiplicar el tráfico en minutos. Las plataformas deben escalar sin degradar la experiencia de compra.' },
        { title: 'Latencia y tiempos de respuesta', text: 'Cada milisegundo adicional de carga reduce conversiones. La infraestructura debe garantizar respuestas rápidas en todo momento.' },
        { title: 'Disponibilidad y resiliencia', text: 'El time-to-market es crítico: hay que introducir nuevas funcionalidades rápidamente sin poner en riesgo la operación.' },
        { title: 'Integración de sistemas', text: 'ERPs, CRMs, pasarelas de pago y logística deben comunicarse sin fricciones para mantener la operación fluida.' },
        { title: 'Costos de infraestructura', text: 'Escalar sin control puede disparar costos. La optimización inteligente del cloud permite crecer sin desperdiciar recursos.' },
        { title: 'Seguridad y cumplimiento', text: 'Los datos de clientes y transacciones requieren estándares de seguridad robustos y cumplimiento normativo constante.' },
      ],
    },
    approach: {
      title: 'Estructuramos plataformas Cloud que combinan rendimiento, escalabilidad y eficiencia operativa.',
      items: [
        { title: 'Auto-escalado inteligente', text: 'Infraestructura que crece automáticamente durante picos y se reduce en periodos de baja demanda, optimizando costos.' },
        { title: 'Monitoreo y observabilidad', text: 'Visibilidad total del rendimiento en tiempo real para anticipar problemas antes de que impacten al negocio.' },
        { title: 'Arquitectura de alta disponibilidad', text: 'Redundancia, balanceo de carga y recuperación ante fallos para garantizar operación continua.' },
        { title: 'Optimización de costos cloud', text: 'Estrategias de FinOps que alinean el gasto en infraestructura con el valor real que genera el negocio.' },
      ],
    },
    outcomes: {
      title: 'Conversemos sobre cómo está preparada tu plataforma para el próximo pico de demanda.',
      items: [],
    },
    formTitle: '¿Qué tan preparada está tu infraestructura para escalar?',
  },
  {
    slug: 'telecomunicaciones',
    name: 'Telecomunicaciones',
    eyebrow: 'Telecomunicaciones',
    title: 'Escala Telco con control real',
    lead: 'Ayudamos a equipos Telco a estructurar plataformas en AWS para operar con estabilidad, visibilidad y control, incluso en entornos de alta demanda.',
    cta: 'Solicitud de diagnóstico',
    image: '/assets/photos/telco.webp',
    image2: '/assets/photos/telco-aws.webp',
    intro: {
      title: 'Operar sin claridad es el mayor riesgo en entornos de alta complejidad.',
      text: ['Cuando la arquitectura es clara, la operación deja de ser reactiva. Los eventos fluyen con control, los sistemas se conectan con trazabilidad, y la visibilidad permite actuar antes de que los problemas escalen.'],
    },
    challenges: {
      title: '¿Dónde se vuelve compleja la operación en Telco?',
      items: [
        { title: 'Operación continua sin margen de error', text: 'Sistemas que no pueden detenerse mientras siguen evolucionando.' },
        { title: 'Alto volumen de eventos en tiempo real', text: 'Procesamiento constante que exige performance estable.' },
        { title: 'Integraciones difíciles de mapear', text: 'Dependencias entre sistemas legacy, APIs y cloud.' },
        { title: 'Falta de visibilidad operativa', text: 'Dificultad para entender qué pasa realmente en la plataforma.' },
        { title: 'Uso de AWS sin control estructurado', text: 'Consumo creciente sin optimización ni gobierno claro.' },
      ],
    },
    approach: {
      title: '¿Cómo estructuramos plataformas Telco con AWS?',
      text: 'Trabajamos con equipos técnicos para ordenar la operación y hacer la plataforma más clara, operable y escalable. Aplicamos buenas prácticas del AWS Well-Architected Framework para:',
      bullets: [
        'Reducir la complejidad entre sistemas',
        'Mejorar la trazabilidad de servicios',
        'Implementar observabilidad efectiva',
        'Definir escalabilidad controlada',
        'Optimizar el uso de infraestructura',
      ],
    },
    outcomes: {
      title: 'No se trata solo de escalar. Se trata de poder operar.',
      text: 'Lo que cambia cuando la plataforma está bien estructurada:',
      items: [
        { title: 'Mayor control operativo', text: 'Entiendes cómo funciona realmente tu sistema.' },
        { title: 'Equipos más enfocados', text: 'Evolucionar deja de ser incierto.' },
        { title: 'Cambios con menor riesgo', text: 'Arquitectura visible y documentada.' },
        { title: 'Menos dependencia', text: 'Menos dependencia de conocimiento individual.' },
        { title: 'Uso eficiente de AWS', text: 'Menos desperdicio, mejor performance.' },
      ],
    },
    formTitle: '¿Qué tan claro es hoy el funcionamiento de tu plataforma?',
  },
]
