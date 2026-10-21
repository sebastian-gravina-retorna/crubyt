export type Card = { title: string; text?: string; meta?: string }
export type Service = {
  slug: string
  name: string
  eyebrow: string
  title: string
  subtitle: string
  cta: string
  image?: string
  accent: string
  stats: { value: string; label: string }[]
  intro?: { title: string; text?: string }
  fit?: { title: string; items: string[] }
  steps?: { title: string; items: Card[] }
  offerings?: { title: string; text: string; items: { code: string; title: string; duration: string; problem: string; solution: string; gain: string }[] }
  problems?: { title: string; items: Card[] }
  tech?: { title: string; text?: string; items: { title: string; items: string[] }[] }
  phases?: { title: string; items: Card[] }
  benefits?: { title: string; items: Card[] }
  beforeAfter?: { title: string; before: string[]; after: string[] }
  closing: { title: string; text?: string; cta: string }
}

export const services: Service[] = [
  {
    slug: 'integracion-de-gen-ai-open-source',
    name: 'Gen AI & Open Source',
    eyebrow: 'Integración de Gen AI & Open Source',
    title: 'Llevamos la IA generativa directo a producción',
    subtitle: 'Las organizaciones que ganan hoy no hablan más de IA — la tienen operando.',
    cta: 'Quiero llevar la IA a producción',
    accent: 'from-violet to-magenta',
    stats: [
      { value: '2X', label: 'Mismo equipo. El doble de output' },
      { value: '3X', label: 'ROI mínimo antes de comprometer cualquier inversión' },
      { value: '60–80%', label: 'de tareas manuales que tus equipos dejan de hacer' },
      { value: 'Hoy', label: 'La brecha con quien ya lo hace crece cada mes' },
    ],
    intro: {
      title: 'Resultados medibles, no experimentos',
      text: 'La mayoría lleva 18 meses experimentando con IA y todavía no puede mostrar un número concreto. No es un problema de herramientas, es un problema de método. Solo inviertes en lo que tiene retorno real: sin pilotos que no escalan, sin IA que nadie puede justificar en el board.',
    },
    offerings: {
      title: 'Cinco servicios. Un camino.',
      text: 'Cada uno ataca un problema que hoy le cuesta dinero, velocidad o reputación a tu organización. El Assessment define el punto de entrada: en 4 semanas el liderazgo tiene un plan concreto para los próximos 12 meses.',
      items: [
        { code: 'S1', title: 'Assessment de Madurez en IA & Estrategia', duration: '4–6 sem', problem: 'Invertir en IA sin saber qué casos tienen ROI real.', solution: 'Roadmap ejecutable con RAISE Scoring. Solo avanza lo que vale la pena.', gain: 'Claridad sobre dónde invertir y qué esperar' },
        { code: 'S2', title: 'Adopción del AI-DLC', duration: '3–6 m', problem: 'Cada developer usa IA distinto. La velocidad prometida nunca llega.', solution: 'Framework AI-DLC: proceso colectivo, velocity 2× medible desde el primer sprint.', gain: 'El doble de output con el mismo equipo' },
        { code: 'S3', title: 'Implementación de Agentes Autónomos', duration: '2–5 m', problem: 'Procesos manuales que consumen al equipo sin forma segura de automatizarlos.', solution: 'Agentes con autorización granular y audit trail. No demos — producción desde el día uno.', gain: 'Procesos críticos automatizados y auditables' },
        { code: 'S4', title: 'AI Governance Foundation Build', duration: '3–4 m', problem: 'Agentes sin control central, costos impredecibles, compliance imposible de demostrar.', solution: 'AI Control Plane con ISO 42001, EU AI Act y DORA. Evidencia generada automáticamente.', gain: 'Control total del portafolio de IA' },
        { code: 'S5', title: 'Managed AI Governance', duration: 'Mensual', problem: 'La gobernanza se degrada sola. El board pregunta el ROI y no hay respuesta.', solution: 'Crubyt opera la gobernanza por vos. KPI Dashboard listo para el board cada mes.', gain: 'Compliance activa y board siempre informado' },
      ],
    },
    beforeAfter: {
      title: 'El costo de no hacer nada también existe.',
      before: [
        'Inversiones en IA sin retorno demostrable.',
        'La velocidad prometida que nunca llega.',
        'Shadow AI exponiendo datos sensibles.',
        'Costos de IA que nadie sabe justificar.',
        'Agentes sin propietario ni control real.',
        'Compliance imposible cuando llega la auditoría.',
      ],
      after: [
        'Cada peso en IA con ROI documentado.',
        'Mismo equipo, el doble de output — medible.',
        'Visibilidad total sobre toda la IA de la org.',
        'Costos predecibles con kill switch activo.',
        'Agentes auditables con historial de decisiones.',
        'ISO 42001 y EU AI Act listos antes del auditor.',
      ],
    },
    closing: {
      title: '60 minutos de diagnóstico con el equipo Crubyt.',
      text: 'Las organizaciones que lideran con IA empezaron exactamente acá. Sin compromiso. Con un plan concreto al final de esa hora.',
      cta: 'Agendar mi sesión de diagnóstico',
    },
  },
  {
    slug: 'finops',
    name: 'FinOps',
    eyebrow: 'FinOps & Cloud Optimization',
    title: 'Controla el costo de tu nube sin perder velocidad',
    subtitle: 'Haz más con menos: optimiza tu nube sin sacrificar rendimiento.',
    cta: 'Agenda tu assessment',
    image: '/assets/photos/finops.webp',
    accent: 'from-brand to-coral',
    stats: [
      { value: '30%', label: 'Reducción promedio' },
      { value: '100%', label: 'Visibilidad Cloud' },
      { value: 'AWS', label: 'Especialización' },
      { value: '4', label: 'Fases de servicio' },
    ],
    fit: {
      title: 'Este servicio es especialmente relevante cuando:',
      items: [
        'El gasto en AWS comienza a crecer sin claridad',
        'Hay presión por optimizar costos sin afectar disponibilidad',
        'No existe visibilidad por cuenta, servicio o equipo',
        'La organización está escalando y necesita mayor control financiero',
      ],
    },
    steps: {
      title: 'Nuestro objetivo',
      items: [
        { title: 'Entender', text: 'Cómo se está consumiendo la infraestructura' },
        { title: 'Identificar', text: 'Oportunidades reales de optimización' },
        { title: 'Implementar', text: 'Herramientas de visibilidad y control' },
        { title: 'Definir', text: 'Un modelo operativo FinOps sostenible' },
      ],
    },
    problems: {
      title: 'El gasto Cloud se dispara. Nosotros lo frenamos.',
      items: [
        { title: 'Crecimiento sin trazabilidad', text: 'Gasto en AWS que crece mes a mes sin trazabilidad clara ni responsables definidos.' },
        { title: 'Falta de visibilidad', text: 'Sin visibilidad unificada de costos, uso y rendimiento entre cuentas y servicios.' },
        { title: 'Recursos sobredimensionados', text: 'Instancias y servicios provisionados por encima de la demanda real del negocio.' },
        { title: 'Costos recurrentes ocultos', text: 'Cargos por almacenamiento, transferencia y licencias que no aparecen en los reportes habituales.' },
        { title: 'Sin gobernanza de gasto', text: 'Equipos desplegando recursos sin políticas de etiquetado, presupuestos ni alertas.' },
        { title: 'Ahorro ineficiente', text: 'Uso ineficiente de Saving Plans, Reserved Instances y otros modelos de descuento.' },
      ],
    },
    tech: {
      title: 'Tecnologías y prácticas',
      text: 'Combinamos herramientas del ecosistema AWS y soluciones especializadas.',
      items: [
        { title: 'Visibilidad y reporting', items: ['AWS Cost & Usage Reports', 'AWS CUDOS/FOCUS dashboard', 'Kubecost / OpenCost (EKS)', 'CloudZero'] },
        { title: 'Optimización y Automatización', items: ['KEDA', 'Karpenter (EKS autoscaling)', 'CAST.AI'] },
        { title: 'Gobernanza y prácticas', items: ['AWS tagging strategy', 'AWS Budgets y Cost Explorer', 'Modelos FinOps (crawl-walk-run)', 'Terraform para políticas'] },
      ],
    },
    benefits: {
      title: 'Beneficios clave',
      items: [
        { title: 'Reducción directa del gasto', text: 'Hasta 30% de reducción en los primeros meses de implementación.' },
        { title: 'Visibilidad completa', text: 'Consumo en AWS en tiempo real por servicio, cuenta y equipo.' },
        { title: 'Mejores decisiones', text: 'Alinear tecnología y finanzas para tomar decisiones informadas.' },
        { title: 'Recursos optimizados', text: 'Uso eficiente de cada instancia, volumen y servicio cloud.' },
        { title: 'Previsibilidad', text: 'Mayor previsibilidad del gasto mensual y anual de tu cloud.' },
      ],
    },
    beforeAfter: {
      title: 'Resultados reales. Control total.',
      before: [
        'Sin visibilidad: sin dashboards unificados ni alertas proactivas.',
        'Costos impredecibles: facturas que crecen sin control ni responsable claro.',
        'Deployments riesgosos: cada release es una apuesta.',
      ],
      after: [
        'Visibilidad 24/7: dashboards en tiempo real y trazabilidad de cada servicio y costo.',
        '40% menos costos: rightsizing automático y reportes de ROI mensuales verificables.',
        '0 downtime: CI/CD automatizado, blue-green deployments y rollback en segundos.',
      ],
    },
    closing: { title: '¿Listo para optimizar tu cloud?', cta: 'Habla con nuestro equipo' },
  },
  {
    slug: 'ingenieria-de-plataformas',
    name: 'Ingeniería de Plataformas',
    eyebrow: 'Ingeniería de Plataformas',
    title: 'Plataformas internas que aceleran la innovación',
    subtitle: 'Todo lo que necesitas para escalar con control.',
    cta: 'Inicia tu transformación',
    image: '/assets/photos/retail-team.webp',
    accent: 'from-brand to-magenta',
    stats: [
      { value: '40%', label: 'Reducción en lead time' },
      { value: '60%', label: 'Menos tareas operativas' },
      { value: '10x', label: 'Mayor deployment frequency' },
      { value: '4', label: 'Fases de servicio' },
    ],
    fit: {
      title: 'Esta oferta es ideal cuando:',
      items: [
        'Necesitas acelerar time-to-market sin sacrificar calidad.',
        'Tu infraestructura requiere estandarización sin rigidez.',
        'Los desarrolladores pierden tiempo en tareas operativas.',
        'Necesitas observabilidad end-to-end integrada.',
      ],
    },
    steps: {
      title: 'Qué incluye',
      items: [
        { title: 'Assessment Personalizado', text: 'Evaluación integral de capacidades DevOps, SRE y Developer Experience.' },
        { title: 'Optimización de Infraestructura', text: 'CI/CD modernizado, observabilidad unificada y prácticas SRE.' },
        { title: 'Developer Experience', text: 'Portal centralizado, catálogo de servicios e integración de GenAI.' },
        { title: 'Evolución Continua', text: 'Adopción progresiva, métricas DORA y mejora iterativa.' },
      ],
    },
    problems: {
      title: 'Desafíos que enfrentas',
      items: [
        { title: 'Context switching constante', text: 'Desarrolladores saltando entre herramientas, documentación dispersa y procesos inconsistentes que generan fragmentación operacional.' },
        { title: 'Lead time largo', text: 'Provisioning manual, pipelines lentos y deployment frequency baja que impide velocidad en la innovación y time-to-market.' },
        { title: 'Falta de observabilidad', text: 'Métricas, logs y traces dispersos sin correlación. Difícil debuggear issues en producción sin visibilidad end-to-end.' },
        { title: 'Inconsistencia en infraestructura', text: 'Falta de estándares, snowflake environments y configuraciones ad-hoc que generan deuda técnica y riesgos operacionales.' },
        { title: 'Dependencia de SRE/Ops', text: 'Desarrolladores necesitando tickets para provisioning y cambios. Cuello de botella operacional que ralentiza la entrega.' },
      ],
    },
    tech: {
      title: 'Tecnologías y prácticas',
      items: [
        { title: 'Developer Portals', items: ['Backstage (open source)', 'Port.io', 'Humanitec'] },
        { title: 'Platform Orchestration', items: ['ArgoCD (GitOps)', 'Crossplane', 'CNOE (AWS)'] },
        { title: 'Observability & Automation', items: ['OpenTelemetry', 'Prometheus + Grafana', 'ShamanOps (AIOps)'] },
      ],
    },
    phases: {
      title: 'Cómo lo hacemos',
      items: [
        { title: 'Discovery & Assessment', text: 'Workshops de madurez · Análisis técnico profundo · Developer survey · Roadmap priorizado' },
        { title: 'Platform Foundation', text: 'Selección de stack · Developer Portal · CI/CD modernizado · Observability stack' },
        { title: 'Developer Experience', text: 'Service catalog · Self-service workflows · Golden paths · GenAI integration' },
        { title: 'Adoption & Evolution', text: 'Onboarding progresivo · Métricas DORA · Feedback loops · Evolución continua' },
      ],
    },
    benefits: {
      title: 'Beneficios clave',
      items: [
        { title: 'Velocidad de entrega', text: 'Lead time para cambios reducido en 40% y deployment frequency 10x mayor. Innova más rápido sin perder calidad.' },
        { title: 'Menos overhead operativo', text: '60% menos tiempo en tareas operativas y boilerplate. Los equipos se enfocan en código de valor.' },
        { title: 'Self-service completo', text: 'Desarrolladores autónomos con acceso a recursos on-demand sin tickets ni dependencia de SRE.' },
        { title: 'Golden paths claros', text: 'Estandarización inteligente que guía sin restringir. Libertad dentro de límites seguros.' },
        { title: 'Reducción de cognitive load', text: 'Portal único que elimina el context switching entre herramientas.' },
      ],
    },
    beforeAfter: {
      title: 'Resultados reales. Control total.',
      before: [
        'Sin visibilidad: apagar fuegos cuando los clientes reportan problemas.',
        'Costos impredecibles: recursos sobre-provisionados y facturas AWS sin control.',
        'Deployments riesgosos: miedo a romper producción en cada release.',
      ],
      after: [
        'Visibilidad 24/7: monitoreo proactivo que detecta problemas antes que los clientes.',
        '40% menos costos: auto-scaling inteligente que paga solo lo que usas.',
        '0 downtime: blue-green deployments y rollback instantáneo.',
      ],
    },
    closing: { title: '¿Listo para optimizar tu cloud?', cta: 'Habla con nuestro equipo' },
  },
  {
    slug: 'ciberseguridad',
    name: 'Ciberseguridad',
    eyebrow: 'Ciberseguridad & DevSecOps',
    title: 'Seguridad que nace con el código, no después de él',
    subtitle: 'Los riesgos crecen en silencio hasta convertirse en un incidente costoso.',
    cta: 'Iniciar la transformación',
    image: '/assets/photos/telco.webp',
    accent: 'from-magenta to-violet',
    stats: [
      { value: '99%', label: 'de fallos en la nube son responsabilidad del cliente' },
      { value: '742%', label: 'crecimiento en ataques a la cadena de suministro' },
      { value: '$5.9M', label: 'costo promedio de un breach financiero (IBM 2024)' },
      { value: '4', label: 'fases hacia seguridad proactiva y auditada' },
    ],
    steps: {
      title: 'Todo lo que necesitas para escalar con control',
      items: [
        { title: 'Security Assessment', text: 'Diagnóstico integral AWS, gaps de compliance y roadmap priorizado por criticidad.' },
        { title: 'DevSecOps & CI/CD', text: 'SAST, SCA, secrets scanning y DAST en tus pipelines. Builds que fallan ante vulnerabilidades críticas.' },
        { title: 'Container Security', text: 'Escaneo de imágenes, Falco en Kubernetes, Pod Security Standards y admission controllers.' },
        { title: 'Compliance Automatizado', text: 'PCI DSS, SOC 2, ISO 27001 e HIPAA con evidencia continua vía AWS Audit Manager.' },
      ],
    },
    problems: {
      title: 'Los riesgos que crecen en silencio',
      items: [
        { title: 'Misconfiguraciones expuestas', text: 'El 83% de los breaches tienen un componente de acceso mal configurado. El vector #1 en AWS.' },
        { title: 'Contenedores vulnerables', text: 'Imágenes desplegadas sin escaneo llevan CVEs críticos a producción sin que nadie lo sepa.' },
        { title: 'Compliance que bloquea deals', text: 'Sin PCI DSS, SOC 2 o HIPAA los contratos enterprise no cierran. El 42% lo cita como su principal desafío.' },
        { title: 'Pipelines sin controles', text: 'Superficie de ataque desprotegida. Ataques a la cadena de suministro +742% en tres años.' },
        { title: 'Sin detección de incidentes', text: 'Sin GuardDuty ni playbooks, los equipos descubren incidentes horas o días después. Costo: $5.9M.' },
      ],
    },
    tech: {
      title: 'Stack nativo de AWS + mejores herramientas open source',
      items: [
        { title: 'IAM & Identity', items: ['AWS IAM', 'SSO', 'Organizations'] },
        { title: 'Detección', items: ['GuardDuty', 'Security Hub', 'Macie'] },
        { title: 'Containers', items: ['ECR', 'Falco', 'Trivy'] },
        { title: 'SAST / DAST', items: ['Snyk', 'SonarQube', 'OWASP ZAP'] },
        { title: 'Secretos & PKI', items: ['Secrets Manager', 'KMS', 'ACM'] },
        { title: 'Protección Red', items: ['WAF', 'Shield', 'Network Firewall'] },
        { title: 'Auditoría', items: ['CloudTrail', 'Audit Manager', 'Artifact'] },
        { title: 'Monitoreo', items: ['CloudWatch', 'Security Lake', 'EventBridge'] },
      ],
    },
    phases: {
      title: '4 fases para llevar tu organización de cero a seguridad proactiva y auditada',
      items: [
        { title: 'Security Assessment', meta: '2–3 semanas', text: 'Diagnóstico AWS completo. Findings de Security Hub, GuardDuty y Config. Compliance Gap Analysis. Threat modeling específico para tu negocio.' },
        { title: 'Foundations & Quick Wins', meta: '3–4 semanas', text: 'IAM Hardening, Zero Trust, Secrets Manager, Network Firewall, WAF, baseline CloudTrail + GuardDuty + Security Hub, ECR Enhanced Scanning.' },
        { title: 'DevSecOps & Compliance', meta: '4–8 semanas', text: 'Security gates en CI/CD, IaC security, Falco en Kubernetes, AWS Audit Manager para evidencia continua, playbooks de respuesta automatizada.' },
        { title: 'Monitoreo Continuo', meta: 'Ongoing', text: 'Security Posture Reviews mensuales, Vulnerability Management, Penetration Testing periódico, Security Champions Program y dashboard ejecutivo con KPIs.' },
      ],
    },
    benefits: {
      title: 'Beneficios clave',
      items: [
        { title: 'Compliance que habilita negocios', text: 'Las certificaciones dejan de ser bloqueadores y se convierten en ventaja competitiva.' },
        { title: 'Reducción real del riesgo', text: 'MTTR medido y en mejora continua. Controles preventivos, detectivos y de respuesta activos.' },
        { title: 'No frena al equipo de dev', text: 'Security gates en CI/CD en segundos, no en auditorías trimestrales. Shift-left real.' },
        { title: 'Visibilidad total', text: 'Dashboard ejecutivo en tiempo real. El CISO y el CTO toman decisiones con datos.' },
        { title: 'Confianza de inversores', text: 'Activo clave en fundraising, due diligence y ventas enterprise. El 88% no hace negocios sin confianza en el manejo de datos.' },
      ],
    },
    beforeAfter: {
      title: 'Resultados reales. Control total.',
      before: [
        'Seguridad al final del desarrollo',
        'Findings críticos sin priorizar',
        'CVEs en producción sin detectar',
        'Compliance bloqueando deals',
        'Incidentes descubiertos tarde',
        'Costos imprevisibles',
      ],
      after: [
        'Postura AWS documentada y auditada',
        'Compliance certificable',
        'Security gates en cada PR',
        'Runtime security activa',
        'Respuesta automatizada',
        'Dashboard ejecutivo con KPIs',
      ],
    },
    closing: { title: '¿Listo para proteger tu infraestructura de verdad?', cta: 'Hablar con nuestro equipo' },
  },
]
