-- Generado por scripts/build-seed.mjs: posts migrados desde WordPress
insert into public.posts (slug, title, excerpt, category, client, type, cover_url, content_html, published_at) values
('automatizacion-de-documentacion-e-infraestructura-con-ia-en-aws', 'Automatización de Documentación e Infraestructura con IA en AWS', 'Merlin es una plataforma SaaS de tecnología financiera con presencia regional, que opera sobre Amazon Web Services. Con una infraestructura robusta y un equipo de ingeniería especializado, gestiona múltiples servicios…', 'Gen AI', 'Merlin', 'caso', '/assets/photos/blog-cover.webp', '<h2>Acerca del cliente</h2>
<p>Merlin es una plataforma SaaS de tecnología financiera con presencia regional, que opera sobre Amazon Web Services.</p>
<p>Con una infraestructura robusta y un equipo de ingeniería especializado, gestiona múltiples servicios interconectados que soportan su crecimiento continuo.</p>
<p>Identificó la oportunidad de acelerar sus procesos de documentación técnica mediante inteligencia artificial. En el marco de su proceso de certificación para el AWS Marketplace, necesitaban documentación técnica detallada y diagramas de arquitectura precisos. Trabajamos junto a su equipo usando Kiro —el IDE agéntico de Amazon— integrado con MCP y modelos de Amazon Bedrock, y logramos reducir el tiempo de documentación de semanas a minutos, liberando al equipo técnico para enfocarse en lo que más importa.</p>
<h2>Desafío del cliente</h2>
<p><strong>Documentación técnica a escala para el AWS Marketplace</strong></p>
<p>El crecimiento de Merlin como plataforma SaaS trajo consigo nuevos requerimientos de cumplimiento técnico. Para habilitar la distribución de su aplicación en el AWS Marketplace, necesitaban documentación exhaustiva de toda su infraestructura. Con múltiples servicios interconectados, generarla manualmente representaba semanas de trabajo para su equipo de ingeniería.</p>
<p><strong>Diagramas de arquitectura actualizados y alineados al estándar corporativo</strong></p>
<p>La expansión de sus servicios en la nube hizo necesario contar con diagramas topológicos precisos que reflejaran fielmente la distribución real en AWS, respetando además el branding corporativo,  paleta de colores, tipografías y logotipos, para su presentación formal ante AWS.</p>
<p><strong>Uso eficiente de IA a medida que la adopción escalaba</strong></p>
<p>A medida que los equipos de Merlin comenzaron a explorar la IA, surgió la oportunidad de gestionar el consumo de tokens de forma óptima, evitando que el agente reconstruyera el contexto desde cero en cada sesión y optimizando así el rendimiento y los costos operativos.</p>
<h2>¿Por qué Crubyt?</h2>
<p>Ya veníamos trabajando con Merlin en la profesionalización de su infraestructura en AWS, lo que nos dio un conocimiento profundo de su entorno técnico. Esa continuidad nos permitió movernos rápido: entendíamos su arquitectura, sus políticas de seguridad y cómo trabaja su equipo. Llegamos al proyecto de IA con contexto, no desde cero.</p>
<h2>Lo que construimos juntos</h2>
<p>Diseñamos e implementamos una solución de ingeniería de plataformas asistida por IA, usando Kiro como núcleo de la automatización. Conectamos el agente directamente a las cuentas AWS de Merlin a través de MCP, y desde ahí construimos un flujo que iba desde el relevamiento automático hasta la entrega de documentación lista para presentar.</p>
<p><strong>Mapeamos toda la infraestructura en minutos con Kiro + MCP</strong> Conectamos Kiro a las cuentas de AWS de Merlin usando Model Context Protocol y librerías de Python. El agente relevó automáticamente todos los servicios activos, sus configuraciones y las relaciones entre ellos, generando en minutos una visión completa de la topología que antes requería ingeniería inversa manual.</p>
<p><strong>Generamos diagramas de arquitectura automáticamente</strong> A partir del relevamiento, produjimos múltiples diagramas de diferente granularidad, vistas generales y detalladas por servicio que reflejan con precisión cómo está distribuida la infraestructura.</p>
<p><strong>Desarrollamos un pipeline de documentación con identidad </strong><strong>corporativa</strong> Construimos un pipeline personalizado que tomaba los diagramas generados por la IA y los integraba en documentos Word con el branding de Merlin: colores, tipografías y logotipos corporativos. Los entregables salían listos para presentar a AWS, sin trabajo manual adicional.</p>
<p><strong>Creamos un ambiente sandbox para las iniciativas IA del equipo de marketing</strong> El equipo de marketing había desarrollado una aplicación con Kiro y Claude en modo vibe-coding. Les armamos un pipeline de despliegue seguro dentro de AWS para que pudieran operar en un ambiente controlado y alineado a las políticas de gobernanza de la organización.</p>
<p><strong>Configuramos la gobernanza de Amazon Bedrock.</strong></p>
<p>Habilitamos el acceso a los modelos de Amazon Bedrock, incluyendo Claude Opus, para los equipos internos de Merlin, configurando las políticas de acceso regional y restringiendo el consumo a us-east-1 (Virginia) en línea con sus estándares de seguridad.</p>
<h2>Resultados</h2>
<p>Lo que logramos juntos fue concreto y medible: transformamos procesos que antes demandaban semanas en tareas que hoy se resuelven en minutos.</p>
<p><strong>Redujimos el tiempo de documentación en más de un 95%</strong> Un proceso que podía extenderse durante una semana o más pasó a completarse en minutos. Incluyendo revisión y ajustes, el tiempo total se redujo a menos de una hora. Más velocidad para el equipo, sin sacrificar calidad ni precisión.</p>
<p><strong>Habilitamos el acceso de Merlin al AWS Marketplace</strong> La documentación que generamos cumplió con todos los estándares requeridos por AWS para la certificación del Marketplace, abriendo una nueva oportunidad de expansión comercial para Merlin.</p>
<p><strong>Creamos un activo de conocimiento técnico para el equipo</strong> Los diagramas de arquitectura que produjimos se convirtieron en un recurso valioso: facilitan la incorporación de nuevos integrantes, apoyan la toma de decisiones arquitectónicas y mantienen al equipo alineado sobre cómo está construida su infraestructura.</p>
<h2>Resultados y Beneficios</h2>
<p><strong>El equipo de ingeniería recuperó tiempo para lo que importa</strong> Al automatizar el relevamiento y la documentación, liberamos capacidad técnica que antes se consumía en tareas repetitivas. Ese tiempo se reinvirtió en iniciativas de mayor impacto para el negocio.</p>
<p><strong>La documentación salía estandarizada desde el primer intento</strong> El pipeline que construimos garantizó que cada entregable respetara automáticamente los estándares de Merlin —formato, branding y estructura— sin depender de revisiones manuales.</p>
<p><strong>Encendimos la adopción de IA en toda la organización</strong> La experiencia con Kiro en documentación abrió el apetito. Equipos de data y marketing comenzaron a explorar IA en sus propios flujos. Lo que empezó como un proyecto puntual se convirtió en el punto de partida de una cultura de innovación más amplia dentro de Merlin.</p>
<h2>Siguientes pasos</h2>
<p>Seguimos trabajando junto a Merlin en la siguiente etapa de evolución de su infraestructura. Estamos migrando desde un modelo de mono-cuenta hacia una topología de AWS Organizations con separación de cuentas por ambiente (desarrollo, QA, producción) y por tipo de servicio. Ya completamos exitosamente la fase de desarrollo, y ahora avanzamos hacia la migración de QA.</p>
<p>Al mismo tiempo, acompañamos a los equipos de Merlin que continúan explorando vibe-coding con IA para el desarrollo de herramientas internas, habilitando ambientes seguros y escalables para que esas iniciativas crezcan con confianza.</p>
<h2>Puntos clave</h2>
<h2>Acerca de Crubyt</h2>
<p>Somos un AWS Partner especializado en modernización de infraestructura cloud y  optimización de operaciones en AWS. Ayudamos a empresas a diseñar, implementar y evolucionar entornos más seguros, escalables y eficientes, con foco en arquitecturas cloud-native, prácticas FinOps,  soluciones de data e inteligencia artificial aplicada.</p>
<p>Nuestro enfoque combina profundidad técnica con acompañamiento estratégico. No solo resolvemos el problema de hoy: ayudamos a nuestros clientes a construir plataformas preparadas para sostener crecimiento, resiliencia e innovación a largo plazo. Transformamos entornos operativos complejos en infraestructuras que realmente trabajan a favor del negocio.</p>
<p>Operamos en países como Argentina, Colombia, Perú y Chile con un equipo de ingenieros certificados y contamos con validaciones técnicas de AWS, incluyendo Foundational Technical Review (FTR).</p>
<p>Si tu organización está lista para dar el siguiente paso en su evolución cloud, estamos listos para acompañarte.</p>', '2026-09-25'),
('escalar-sin-caos-como-merlin-transformo-su-arquitectura-para-crecer-con-control-en-aws', 'Escalar sin caos: cómo Merlín transformó su arquitectura para crecer con control en AWS', 'Merlín es una plataforma SaaS que opera sobre AWS y que se encontraba en un proceso de crecimiento y evolución de su infraestructura tecnológica. A medida que la plataforma incorporaba nuevos servicios y entornos, el…', 'Ingeniería de Plataformas', 'Merlin', 'caso', '/assets/cases/merlin.webp', '<h2>Acerca del cliente</h2>
<p>Merlín es una plataforma SaaS que opera sobre AWS y que se encontraba en un proceso de crecimiento y evolución de su infraestructura tecnológica. A medida que la plataforma incorporaba nuevos servicios y entornos, el equipo comenzó a enfrentar desafíos asociados a la organización de su arquitectura cloud, la seguridad operativa y la capacidad de escalar de forma ordenada.</p>
<p>En este contexto, Merlín buscaba profesionalizar su infraestructura y adoptar mejores prácticas de arquitectura cloud para sostener el crecimiento del producto sin aumentar la complejidad operativa.</p>
<h2>Desafío del cliente</h2>
<p>Antes de comenzar el trabajo con Crubyt, la infraestructura de Merlín presentaba características típicas de una plataforma en una etapa temprana de maduración.</p>
<p>La operación se realizaba bajo un modelo monocuenta en AWS, donde múltiples entornos y servicios coexistían dentro de la misma cuenta y, en algunos casos, bajo una misma lógica de red. Esta estructura dificultaba la segregación de ambientes, aumentaba el riesgo operativo y de cumplimiento, y limitaba la capacidad de escalar la plataforma de manera segura y sostenible.</p>
<p>Además, existían varias prácticas que incrementaban la complejidad del entorno:</p>
<ul><li>Ambientes mezclados sin separación clara entre desarrollo, QA y producción.</li>
<li>Uso intensivo de configuraciones manuales.</li>
<li>Valores hardcodeados en el código de infraestructura, lo que dificultaba la reutilización y la escalabilidad.</li>
<li>Gestión manual del balanceo entre Availability Zones.</li>
<li>Uso de identidades y accesos sin una estructura alineada con buenas prácticas de seguridad.</li>
<li>Arquitectura de networking fragmentada, con múltiples VPN independientes.</li>
</ul>
<p>Si bien la plataforma funcionaba, la infraestructura no estaba preparada para acompañar el crecimiento del negocio con el nivel de orden, seguridad y resiliencia que un SaaS necesita a medida que madura.</p>
<h2>Por qué AWS</h2>
<p>AWS ofrecía la base tecnológica necesaria para evolucionar la arquitectura de Merlín hacia un modelo más escalable, seguro y automatizado.</p>
<p>Servicios como AWS Organizations, Control Tower, ECS, Transit Gateway y Secrets Manager permitían estructurar la infraestructura con mayor gobernanza, separación de ambientes, control de accesos y capacidad de crecimiento. Al mismo tiempo, el uso de herramientas de infraestructura como código sobre AWS habilitaba una base más reproducible, mantenible y alineada con mejores prácticas cloud.</p>
<p>Para Merlín, AWS representaba no solo una plataforma de infraestructura, sino un habilitador clave para profesionalizar su operación y preparar su producto para una siguiente etapa de madurez.</p>
<h2>Por qué Crubyt</h2>
<p>Merlín buscaba un partner que pudiera acompañar no solo la implementación técnica, sino también la evolución estructural de su arquitectura cloud.</p>
<p>Crubyt aportó experiencia en modernización de plataformas sobre AWS, trabajando junto al equipo del cliente para identificar riesgos arquitectónicos, definir un camino de maduración de infraestructura e implementar mejoras alineadas con mejores prácticas de seguridad, automatización y escalabilidad.</p>
<p>Más que resolver necesidades puntuales, el enfoque estuvo puesto en ordenar la base tecnológica de la plataforma para permitir su crecimiento sostenido, reduciendo deuda técnica y fortaleciendo la operación a largo plazo.</p>
<h2>Solución</h2>
<p>El trabajo comenzó con una auditoría técnica de la infraestructura existente. Ese análisis permitió identificar malas prácticas críticas y definir un roadmap de mejoras estructurales orientado a profesionalizar la plataforma.</p>
<p>A partir de allí, Crubyt acompañó a Merlín en distintas iniciativas clave.</p>
<ul><li><strong>Implementación de una arquitectura multicuentas</strong></li>
</ul>
<p>Se avanzó desde un esquema monocuenta hacia un modelo multicuentas sobre AWS, utilizando AWS Organizations y Control Tower para separar ambientes y servicios de manera estructurada. La creación y gestión de cuentas fue automatizada mediante AFT (Account Factory for Terraform), permitiendo aprovisionar nuevos entornos de forma más consistente, segura y escalable.</p>
<ul><li><strong>Profesionalización de la infraestructura como código</strong></li>
</ul>
<p>La infraestructura comenzó a gestionarse mediante Terraform, incorporando además Terragrunt en escenarios donde era necesario reutilizar configuraciones sin duplicar código. También se inició un proceso de refactor para eliminar valores hardcodeados y promover configuraciones más flexibles y reutilizables entre ambientes.</p>
<ul><li><strong>Mejora de la escalabilidad operativa en ECS</strong></li>
</ul>
<p>Se implementó auto balancing en ECS entre Availability Zones, permitiendo que los servicios se redistribuyeran dinámicamente sin intervención manual. Esto redujo el riesgo operativo y mejoró la resiliencia de la plataforma.</p>
<ul><li><strong>Centralización de networking y accesos</strong></li>
</ul>
<p>La arquitectura de networking se simplificó mediante la centralización de conectividad en una cuenta de networking, utilizando Transit Gateway. Esto permitió consolidar múltiples VPN independientes en un esquema más limpio, con una sola VPN administrada y acceso a ambientes según perfiles diferenciados.</p>
<ul><li><strong>Mejoras en seguridad y gobernanza</strong></li>
</ul>
<p>Se incorporaron mejores prácticas asociadas a seguridad e identidad, incluyendo roles federados, gestión de secretos con AWS Secrets Manager, y una base más preparada para futuros controles y auditorías. Además, comenzaron trabajos asociados a revisiones técnicas y uso de herramientas para detectar findings de seguridad y configuración, relevantes para procesos de cumplimiento y evolución del producto.</p>
<ul><li><strong>Acompañamiento en documentación y madurez operativa</strong></li>
</ul>
<p>Además de la implementación técnica, el proyecto incluyó documentación de procesos, transferencia de conocimiento a nuevos integrantes del equipo y exploración de nuevas herramientas para soportar la operación y la generación de entregables técnicos.</p>
<h2>Resultados y Beneficios</h2>
<p>Las mejoras implementadas permitieron transformar la infraestructura de Merlín desde un entorno funcional pero poco estructurado hacia una arquitectura cloud más madura, escalable y alineada con mejores prácticas de AWS. Entre los principales resultados se destacan:</p>
<ul><li>Paso de un modelo monocuenta a una arquitectura multicuentas más ordenada y gobernada.</li>
<li>Reducción significativa de configuraciones manuales y puntos de fallo operativos.</li>
<li>Infraestructura más mantenible y preparada para crecer sin rehacer bases estructurales.</li>
<li>Balanceo automático de servicios entre Availability Zones, reduciendo intervención manual.</li>
<li>Simplificación de la arquitectura de networking y mejora en el control de accesos.</li>
<li>Mayor alineación con buenas prácticas de seguridad y compliance.</li>
<li>Menor dependencia de conocimiento aislado o configuraciones manuales difíciles de sostener.</li>
<li>Gobernanza activa a nivel organizacional con SCPs, asegurando control y consistencia en todas las cuentas AWS.</li>
<li>Mejora en la colaboración y trazabilidad del equipo gracias a la estandarización del flujo de trabajo en GitHub, reduciendo errores y facilitando la evolución del código de infraestructura.</li>
</ul>
<p>A nivel operativo, el equipo ganó previsibilidad, redujo tareas manuales y fortaleció la capacidad de gestionar la plataforma de forma más profesional. A nivel técnico, el trabajo también impulsó aprendizaje interno y transferencia de conocimiento en temas como ECS, Terraform, documentación técnica y operación sobre AWS. En conjunto, el proyecto no solo resolvió problemas puntuales de infraestructura, sino que ayudó a Merlín a dar un paso concreto hacia una plataforma SaaS más madura y preparada para escalar.</p>
<h2>Siguientes pasos</h2>
<p>Luego de avanzar en la profesionalización de su infraestructura, el siguiente foco junto a Merlín está puesto en seguir fortaleciendo la madurez operativa, la seguridad y la escalabilidad de la plataforma.</p>
<p>Entre los próximos pasos se destacan la continuidad del trabajo sobre el Foundational Technical Review (FTR), la generación de documentación técnica más robusta, la automatización de reportes y auditorías sobre recursos desplegados en AWS, y la incorporación de mejoras que acerquen la plataforma a estándares requeridos para su evolución como producto SaaS dentro del ecosistema de AWS.</p>
<p>En paralelo, Crubyt también acompañó la exploración e implementación inicial de nuevas herramientas como Kiro, utilizadas como soporte para documentación y estructuración técnica, siempre bajo un enfoque de supervisión humana y uso responsable. Esto no solo aportó valor al proyecto actual, sino que abrió oportunidades para replicar aprendizajes y acelerar futuras iniciativas.</p>
<p>De cara al futuro, el trabajo conjunto seguirá enfocado en ayudar a Merlín a consolidar una plataforma más ordenada, auditable, segura y preparada para crecer, acompañando tanto los desafíos técnicos del presente como los objetivos estratégicos del negocio.</p>
<h2>Acerca de Crubyt</h2>
<p>Crubyt es un partner especializado en modernización de infraestructura cloud y optimización de operaciones en AWS. Acompaña a empresas en el diseño, implementación y evolución de entornos más seguros, escalables y eficientes, con foco en arquitecturas cloud-native, prácticas FinOps y soluciones de data.</p>
<p>Su enfoque combina profundidad técnica y acompañamiento estratégico, ayudando a sus clientes a transformar entornos operativos complejos en plataformas preparadas para sostener crecimiento, resiliencia e innovación.</p>', '2026-09-25'),
('gestion-escalablede-bases-de-datoscriticas-para-bancadigital', 'Gestión escalable de bases de datos críticas para banca digital', 'Banco del Sol es una institución financiera líder en Argentina que, tras una fusión, cuenta con dos aplicaciones bancarias principales para ofrecer servicios digitales de alta disponibilidad. Su operación 24/7 requiere…', 'Ingeniería de Plataformas', 'Banco del Sol', 'caso', '/assets/cases/banco-del-sol.webp', '<h2>Cómo Crubyt ayudó a Banco del Sol a escalar operaciones sin interrupciones críticas en un entorno híbrido</h2>
<h2>Acerca del cliente</h2>
<p>Banco del Sol es una institución financiera líder en Argentina que, tras una fusión, cuenta con dos aplicaciones bancarias principales para ofrecer servicios digitales de alta disponibilidad. Su operación 24/7 requiere una infraestructura tecnológica sólida que garantice estabilidad, seguridad y escalabilidad.</p>
<h2>Desafío del cliente</h2>
<p>El banco enfrentaba la complejidad de administrar un ecosistema de bases de datos diverso en múltiples tecnologías y en un entorno en constante crecimiento. Necesitaba soporte experto para:</p>
<ul><li>Garantizar disponibilidad continua para operaciones críticas.</li>
<li>Optimizar el rendimiento y reducir riesgos de interrupciones.</li>
<li>Unificar procesos y estandarizar la gestión en un entorno híbrido y escalable.</li>
</ul>
<h2>Por qué Azure</h2>
<p>Azure ofrecía a Banco del Sol una plataforma confiable para alojar su ecosistema de bases de datos y soportar aplicaciones bancarias críticas. La capacidad de Azure para integrar servicios, escalar bajo demanda y ofrecer herramientas de seguridad avanzadas lo convirtió en la opción ideal para garantizar la continuidad operativa y facilitar la gestión de diferentes motores de bases de datos en un solo entorno.</p>
<h2>Por qué Crubyt</h2>
<p>Banco del Sol necesitaba un socio con visión integral, no solo para ejecutar tareas operativas, sino para aportar criterio, experiencia y capacidad de optimización en un ecosistema complejo. Crubyt ofreció:</p>
<ul><li>Expertise comprobado en administración de bases de datos críticas.</li>
<li>Capacidad para trabajar con múltiples tecnologías (SQL Server, MySQL, Postgres, MongoDB y Oracle).</li>
<li>Un enfoque proactivo y orientado a resultados, priorizando estabilidad, eficiencia y transferencia de conocimiento.</li>
</ul>
<h2>Solución</h2>
<p>Crubyt implementó un servicio integral de Database Management y Optimization que incluyó:</p>
<ul><li>Administración diaria de más de 100 bases de datos en Azure.</li>
<li>Monitoreo y alertas automatizadas para detección temprana de incidentes.</li>
<li>Estandarización de procesos y consolidación de instancias para reducir costos y complejidad.</li>
<li>Migraciones, actualizaciones y clustering de SQL Server.</li>
<li>Optimización proactiva del rendimiento y prevención de problemas.</li>
<li>Transferencia de conocimiento al equipo interno de DBA del banco.</li>
<li>Soporte 24/7 para garantizar operaciones bancarias sin interrupciones.</li>
</ul>
<h2>Tecnologías Utilizadas</h2>
<h2>Resultados y Beneficios</h2>
<h2>Siguientes pasos</h2>
<ul><li>Mantener el soporte integral y la optimización continua.</li>
<li>Incorporar nuevas tecnologías y aplicaciones críticas.</li>
<li>Explorar estrategias que integren automatización y resiliencia en Azure, potenciando la escalabilidad.</li>
</ul>
<h2>Acerca de Crubyt</h2>
<p>En Crubyt, ayudamos a empresas a <strong>modernizar su infraestructura y optimizar sus </strong><strong>operaciones en la nube</strong>, asegurando disponibilidad y resiliencia en entornos críticos como el financiero. Nuestra experiencia en <strong>Cloud-Native, Data Engineering, Cybersecurity y FinOps </strong>nos permite diseñar soluciones adaptadas a cada desafío, combinando eficiencia, innovación y seguridad.</p>
<p>Más que un proveedor, s<strong>omos un aliado estratégico que acompaña a sus clientes en</strong> <strong>todo el ciclo</strong>, desde la optimización de operaciones hasta la adopción de nuevas tecnologías, asegurando impacto real y sostenido.</p>', '2026-09-25')
on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, category = excluded.category, client = excluded.client, type = excluded.type, cover_url = excluded.cover_url, content_html = excluded.content_html, published_at = excluded.published_at;
