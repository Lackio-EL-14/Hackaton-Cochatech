MODIFICACIONES Y NUEVAS FUNCIONALIDADES — AGREGAR AL PROMPT ORIGINAL

CAMBIO VISUAL GLOBAL
Eliminar la mascota tortuga de todas las páginas donde aparecía como elemento decorativo o de acompañamiento (hero, guías, login emprendedor, estados vacíos, upgrade premium, onboarding del formulario). El pájaro verde secundario puede mantenerse donde ya estaba. El resto de la identidad visual permanece igual.

NUEVA FUNCIONALIDAD 1 — CHATBOT DE RECOMENDACIÓN PARA CONSUMIDORES
Componente flotante presente en todas las páginas del sitio (excepto panel de administración):
Botón flotante:
Esquina inferior derecha, círculo con fondo #687D31, ícono de chat + texto pequeño "¿Qué buscas?" visible al hacer hover. Al hacer clic, se despliega el panel del chatbot.
Panel del chatbot:

Ancho 360px, altura 520px, bordes redondeados 16px, sombra suave, fondo #F5F3EE
Header: logo pequeño Yo Impulso + texto "Asistente Verde" + botón cerrar (X)
Área de mensajes con scroll: burbujas de chat diferenciadas — bot (fondo #D5D3CC, texto izquierda) y usuario (fondo #687D31, texto blanco, derecha)
Mensaje de bienvenida inicial del bot: "¡Hola! Soy tu asistente verde 🌿 ¿Qué tipo de producto o emprendimiento sostenible estás buscando hoy?"
Chips de respuesta rápida sugeridos debajo del saludo inicial: "Alimentos naturales" · "Cosmética sin químicos" · "Artesanías locales" · "Productos para el hogar"
Input de texto en la parte inferior con placeholder "Escribe aquí…" + botón enviar (ícono flecha, fondo #FF6B35)
El bot responde con cards de emprendimientos recomendados embebidas directamente en el chat: mini-card con foto, nombre, categoría, badge verde y botón "Ver perfil" (que lleva a Página 3)
Estados del chat: escribiendo (3 puntos animados), sin resultados ("No encontré emprendimientos exactos, pero mira estas alternativas…"), error de conexión

Flujo de recomendación ilustrado en el diseño:
Usuario escribe "busco jabones naturales" → bot responde con 2–3 mini-cards de emprendimientos de cosmética natural + texto "Estos emprendimientos podrían interesarte 🌿" + chip "Ver más resultados" que lleva a Página 2 filtrada por categoría.

NUEVA FUNCIONALIDAD 2 — COMUNIDAD DE EMPRENDEDORES
Nueva página en la navegación: agregar "Comunidad" en el navbar entre "Mapa Verde" y el botón de login. Solo accesible con sesión iniciada como emprendedor; si el usuario no está logueado, al hacer clic se redirige al Login Emprendedor con mensaje contextual "Inicia sesión para acceder a la comunidad".
PÁGINA 10 — COMUNIDAD DE EMPRENDEDORES
Layout de 3 columnas:
Columna izquierda — Panel de perfil y navegación de comunidad (280px):

Avatar + nombre del emprendimiento logueado + badge de plan + badge de sellos obtenidos (ver Funcionalidad 3)
Menú de secciones: Feed principal · Alianzas · Mis conexiones · Eventos y ferias · Recursos compartidos
Sección "Emprendimientos sugeridos para conectar": 3 mini-cards con foto, nombre, categoría, botón "Conectar" (verde outlined)

Columna central — Feed principal (flexible, ocupa el espacio restante):

Barra de creación de publicación: avatar del emprendimiento + área de texto "Comparte algo con la comunidad…" + botones adjuntar foto / adjuntar producto del catálogo / etiquetar categoría
Filtros del feed por tabs: Recientes · Populares · Alianzas · Mi red
Cards de publicaciones en el feed:

Header: avatar + nombre del emprendimiento + badge de categoría + timestamp + menú (•••)
Contenido: texto de la publicación (máx. 3 líneas con "ver más") + imagen opcional
Card especial de tipo "Busco alianza": badge destacado naranja "🤝 Busco alianza" + descripción de lo que ofrece y lo que busca + botón "Proponer alianza" (verde)
Card especial de tipo "Comparto recurso": badge azul "📦 Recurso compartido" + descripción + botón "Ver recurso"
Footer de card: botones Apoyar (ícono 🌱 + contador) · Comentar · Compartir · Guardar
Sección de comentarios colapsable: máx. 2 comentarios visibles + "Ver todos"



Columna derecha — Panel lateral de comunidad (280px):

Sección "Alianzas activas en la comunidad": lista de 3–4 alianzas recientes con los dos emprendimientos involucrados, tipo de alianza (Distribución · Co-producción · Marketing conjunto · Ferias) y badge "Nueva"
Sección "Próximos eventos y ferias sostenibles": cards compactas con nombre del evento, fecha, lugar, botón "Me interesa"
Sección "Temas en tendencia": lista de hashtags/temas con contador de publicaciones

Sub-página: Alianzas
Accesible desde el menú lateral de comunidad.

Header: "Alianzas entre emprendimientos" + botón "Proponer alianza" (naranja)
Grid de tarjetas de alianzas existentes: dos logos de emprendimientos conectados por ícono de enlace, tipo de alianza, descripción breve, fecha de inicio, estado (Activa / En negociación)
Modal "Proponer alianza": buscador de emprendimientos, selector de tipo de alianza, campo de mensaje/propuesta, botón "Enviar propuesta"
Tab "Mis alianzas": lista de alianzas propias con estado y botón de gestión


NUEVA FUNCIONALIDAD 3 — SELLOS DE SOSTENIBILIDAD SIMBÓLICOS
Lógica visual del sistema de sellos (mostrar en el diseño como estados progresivos):
Los sellos son verificaciones simbólicas otorgadas por el equipo administrador tras revisar evidencia fotográfica y documentación de procesos sostenibles subida por el emprendedor. No son automáticos — requieren validación humana desde el panel de administración.
Sellos disponibles (diseñar cada uno como insignia circular con ícono + nombre + color distintivo):

🌿 Producción Limpia (verde #687D31) — procesos sin químicos tóxicos
♻️ Economía Circular (azul #406768) — uso de materiales reciclados o reutilizados
🤝 Comercio Justo (naranja #FF6B35) — condiciones laborales éticas verificadas
💧 Uso Eficiente del Agua (azul cielo #6FA9BB) — prácticas de ahorro hídrico documentadas
🌍 Huella Reducida (verde oscuro #19350C) — reducción verificada de emisiones
📦 Packaging Sostenible (beige #D5D3CC con borde #687D31) — empaques biodegradables o reutilizables
🏡 Hecho en Bolivia (combinación verde + naranja) — producción local verificada

Dónde aparecen los sellos en el diseño:
En Página 2 (Emprendimientos): debajo del nombre del emprendimiento, fila de hasta 3 sellos obtenidos como badges pequeños con ícono + nombre corto. Si el emprendimiento no tiene sellos aún: texto sutil "Sin sellos verificados aún".
En Página 3 (Perfil individual): sección dedicada "Sellos de sostenibilidad verificados" con las insignias en tamaño mediano, cada una con tooltip al hover mostrando: nombre del sello, descripción de qué significa, fecha de verificación.
En Página 7 Tab 1 (Gestión — Editar perfil del emprendedor): nueva sub-sección "Mis sellos y verificaciones":

Sellos obtenidos: mostrados en verde con fecha de otorgamiento
Sellos pendientes de revisión: badge amarillo "En revisión" con fecha de envío
Sellos disponibles para solicitar: cards con ícono en gris, descripción del sello y botón "Solicitar verificación" que abre modal con instrucciones y área de carga de evidencia (fotos, documentos PDF)
Modal de solicitud de sello: título del sello, descripción de requisitos, área drag & drop para subir hasta 5 fotos o documentos, campo de texto "Describe brevemente tu proceso", botón "Enviar solicitud"

En Página 9 (Panel de administración): nueva sección en el sidebar "Solicitudes de sellos":

Tabla con columnas: Emprendimiento · Sello solicitado · Fecha de solicitud · Evidencia adjunta (botón "Ver archivos") · Estado · Acciones
Al hacer clic en "Ver archivos": modal lateral con galería de fotos y documentos subidos por el emprendedor + campo de comentario del administrador + botones "Otorgar sello" (verde) y "Rechazar con observación" (rojo)
Los sellos otorgados aparecen automáticamente en el perfil público del emprendimiento

En la Comunidad (Página 10): los sellos aparecen como pequeños badges en el avatar/perfil de cada emprendimiento dentro del feed y en el panel lateral de perfil.


Nota para el diseño: Todos los elementos nuevos deben seguir estrictamente la paleta, tipografía, radio de bordes y sistema de sombras definidos en el prompt original. El chatbot, la comunidad y el sistema de sellos son extensiones coherentes de la identidad visual existente de Yo Impulso.
