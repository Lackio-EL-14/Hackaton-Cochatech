CONTEXTO Y REFERENCIA VISUAL
Diseña una página web completa en Figma para "Yo Impulso", plataforma boliviana de la Fundación Gaia Pacha que conecta consumidores conscientes con emprendimientos verdes y sostenibles. La plataforma actual existe como app básica en Glide. El nuevo diseño debe ser una web moderna y completa, tomando como referencia visual las pantallas existentes (mapa con pines verdes, cards de emprendimientos, categorías coloridas con íconos, mascota tortuga con lentes, mascota pájaro) pero elevando significativamente el diseño, la arquitectura de información y las funcionalidades.

IDENTIDAD VISUAL
Logo: "Yo Impulso" — verde y naranja con cohete. Siempre presente en navbar y footer.
Mascota principal: Tortuga verde con lentes sosteniendo un teléfono — usar en hero, guías, onboarding y secciones educativas.
Mascota secundaria: Pájaro verde ilustrado — puede aparecer en categorías y secciones decorativas.
Paleta obligatoria:
#19350C Verde oscuro (primario, fondos oscuros, footer)
#687D31 Verde medio (secundario, botones, badges)
#D5D3CC Beige neutro (fondos de sección, cards)
#406768 Azul grisáceo (acentos, íconos)
#6FA9BB Azul cielo (highlights, hover states)
#F5F3EE Blanco cálido (fondos limpios)
#FF6B35 Naranja (CTAs principales, cohete del logo, badges premium)
Tipografía: Sans serif moderna y legible — par tipográfico: display bold para títulos + regular para cuerpo.
Estilo: Tarjetas con bordes redondeados (12–16px radius), sombras suaves, íconos ecológicos, fotografías reales de productos. Sensación de comunidad, naturaleza, confianza e impacto positivo. NO debe parecer solo una tienda — es una plataforma de impacto + comunidad verde. Diseño responsive con potencial React/Next.js + SCSS.

ESTRUCTURA COMPLETA — TODAS LAS PÁGINAS

COMPONENTE GLOBAL: NAVBAR
Presente en todas las páginas:
Logo "Yo Impulso" a la izquierda
Links de navegación: Inicio | Emprendimientos | Mapa Verde
Botón CTA derecha: "Iniciar sesión emprendedor" (outlined, verde)
Ícono de carrito con contador (visible solo en páginas de perfil de emprendimiento individual)
Sticky al hacer scroll, con sombra suave al activarse

PÁGINA 1 — HOME / INICIO
Sección 1 — Hero:
Fondo: gradiente orgánico con textura suave usando #19350C y #687D31
Título grande blanco: "Descubre emprendimientos verdes que transforman Bolivia"
Subtítulo: "Conecta con marcas sostenibles, productos responsables y proyectos locales que cuidan el planeta."
Barra de búsqueda grande y redondeada con ícono lupa — placeholder: "Buscar productos, rubros o emprendimientos…"
Chips/pills de filtros rápidos: Alimentos · Cosmética natural · Artesanías · Hogar sostenible · Moda circular
Botones CTA: "Explorar ahora" (naranja, primario) + "Ver mapa verde" (blanco outlined, secundario)
Visual lado derecho: mockup flotante con 2–3 tarjetas de emprendimientos animadas (foto, nombre, rubro, badge verde, botón WhatsApp)
Mascota tortuga asomándose desde la esquina inferior derecha
Sección 2 — Categorías destacadas:
Título: "Explora por categoría"
Grid horizontal de 9 tarjetas cuadradas con bordes redondeados, cada una con fondo de color distintivo (referencia: pantallas actuales coloridas), ícono ilustrativo y nombre:
🍎 Alimentos y bebidas (fondo teal)
🧶 Artesanías (fondo naranja)
🌿 Cosmética natural (fondo rosa-fucsia)
🏡 Para el hogar (fondo azul-violeta)
🐾 Para las mascotas (fondo naranja cálido)
💍 Bisutería y accesorios (fondo lila)
🧴 Cuidado personal (fondo amarillo)
📓 Papelería (fondo verde)
🌱 Servicios "Vive y Aprende" (fondo azul cielo)
Sección 3 — Emprendimientos destacados:
Título: "Emprendimientos que están cambiando Bolivia"
Grid de 3–4 cards preview con botón "Ver todos" al final
Cada card: imagen, nombre, categoría, ciudad/modalidad, badge verde, indicador "Perfil verde XX%", botón "Ver perfil"
Sección 4 — Guías (una debajo de la otra):
Fondo beige #D5D3CC
Guía para consumidor: pasos numerados con íconos — Busca · Descubre · Conecta · Compra consciente. Mascota tortuga acompañando.
Guía para emprendedor: pasos — Regístrate · Completa tu perfil · Publica tu catálogo · Recibe pedidos. Mascota tortuga con laptop.
Sección 5 — ¿Cómo quieres entrar? (selector de rol):
Título: "¿Cómo quieres entrar?" — Subtítulo: "Elige tu rol y empieza ahora"


Fondo: #F5F3EE (beige claro)


2 tarjetas grandes con bordes redondeados, sombra suave, centradas horizontalmente:

 Tarjeta 1 — Emprendedor:


Ícono: tienda/cohete en círculo con fondo #687D31
Título: "Emprendedor"
Descripción: "Registra tu emprendimiento, publica tu catálogo y conecta con consumidores conscientes."
CTA: "Iniciar sesión →" (lleva a Página 5: Login Emprendedor)
Tarjeta 2 — Administrador:


Ícono: tablero/shield en círculo con fondo #19350C
Título: "Administrador"
Descripción: "Gestiona la plataforma, valida emprendimientos y supervisa el ecosistema sostenible."
CTA: "Acceder →" (lleva a Página 9: Login Administrador)
Sección 6 — Blog educativo:
Título: "Aprende a consumir de forma más responsable"
4 cards tipo blog con imagen, categoría, título y arrow:
"¿Cómo identificar un producto sostenible?"
"5 formas de reducir plástico en tus compras"
"¿Qué es economía circular?"
"Compra local, impacto global"
Sección 7 — Soporte:
Título: "¿Necesitas ayuda?"
3 cards de soporte con ícono, título y botón:
🛒 Para consumidores — "Aprende a usar la plataforma" → Botón "Ver guía"
🚀 Para emprendedores — "Registra y gestiona tu emprendimiento" → Botón "Comenzar"
🛠️ Soporte técnico — "¿Tienes dudas o consultas?" → Botón "Contactar"
Footer:
Fondo #19350C (verde oscuro)
Logo Yo Impulso blanco + texto: "Impulsado por Fundación Gaia Pacha"
Columnas: Plataforma (Inicio, Emprendimientos, Mapa Verde) · Emprendedores (Registrar, Gestión, Premium) · Legal (Términos, Privacidad) · Redes sociales (íconos Facebook, Instagram, TikTok)
Newsletter: input + botón "Recibe novedades verdes"
Créditos: "© 2025 Yo Impulso — Fundación Gaia Pacha"

PÁGINA 2 — EMPRENDIMIENTOS
Header de sección con barra de búsqueda integrada
Fila de filtros/chips por categoría con scroll horizontal: Todos · Alimentos · Artesanías · Cosmética · Hogar · Mascotas · Bisutería · Cuidado personal · Papelería · Servicios
Grid 3–4 columnas de cards de emprendimientos:
Imagen del emprendimiento (foto real)
Badge de categoría (color según categoría)
Nombre del emprendimiento (bold)
Ciudad/modalidad: etiqueta pill — "Cochabamba" / "Negocio virtual" / "Punto de entrega"
Badges sostenibles (máx. 3): "Economía circular" · "Producción local" · "Reduce plástico"
Indicador visual "Perfil verde 85%" — barra de progreso verde con porcentaje
Botón primario: "Ver perfil"
Botón pequeño secundario: ícono WhatsApp (verde, redondeado)
Emprendimientos de referencia a mostrar: Yoghi Probit, Mishitos, Alma de Rosa, Amaria, Frigus, Laboratorio J&H, Cerámica Verde, Dinos3d, Aloe Leben, Colorina by Pao

PÁGINA 3 — PERFIL INDIVIDUAL DE EMPRENDIMIENTO
Breadcrumb: Emprendimientos / [Nombre]
Columna izquierda:
Galería de imágenes con carrusel (imagen principal grande + miniaturas)
Botones de redes sociales debajo: Facebook · Instagram · TikTok (estilo pill con ícono + color de red)
Columna derecha:
Nombre del emprendimiento (H1 bold)
Categoría y ciudad/modalidad (subtítulo)
Horario de atención (ícono reloj)
Descripción detallada
Badges sostenibles
Indicador "Perfil verde XX%" con barra circular o lineal
Sección "Tangibilización de Impacto" (Plan Gratis):
Título: "El impacto de este emprendimiento"
3–4 tarjetas métricas visuales con ícono + número + descripción:
💧 "Ahorra 40% de agua en producción"
♻️ "Reduce 2kg de plástico por mes"
🌱 "Emisiones reducidas: 15% vs. producción convencional"
Mini gráfico de barras o radial mostrando el impacto
Carrito de compras: sección lateral o desplegable con productos del emprendimiento
Botón flotante sticky: "🛒 Proceder con pago por WhatsApp" (verde oscuro, ícono WhatsApp)

PÁGINA 4 — MAPA VERDE
Layout 2 columnas: filtros izquierda + mapa derecha (mapa ocupa 75% del ancho)
Panel de filtros izquierdo:
Título: "Filtrar por"
Checkboxes o toggles: Cerca de mí · Negocio virtual · Punto de venta · Punto de entrega · Ferias sostenibles
Buscador de emprendimientos integrado
Mapa interactivo (referencia visual: pantallas actuales con pines verdes sobre Cochabamba):
Pines verdes personalizados con ícono de categoría
Al hacer clic en un pin: pop-up card con foto del emprendimiento, nombre, categoría, badge verde, botones "Ver perfil" y "Cómo llegar" (Google Maps)
Mapa estilizado con colores de la paleta de la plataforma

PÁGINA 5 — LOGIN EMPRENDEDOR
Layout centrado, fondo #F5F3EE
Logo Yo Impulso arriba
Card blanca con sombra suave:
Título: "Bienvenido, emprendedor"
Mascota tortuga saludando en esquina
Campo: Correo electrónico
Campo: Contraseña (con toggle mostrar/ocultar)
Botón: "Iniciar sesión" (verde primario, ancho completo)
Separador con texto: "¿Aún no registraste tu emprendimiento?"
Link/botón secundario: "Registrar mi emprendimiento →"

PÁGINA 6 — REGISTRO DE EMPRENDIMIENTO
Layout de formulario largo, dividido en pasos/secciones con stepper visual arriba (Paso 1: Info básica → Paso 2: Ubicación → Paso 3: Sostenibilidad → Paso 4: Acceso)
Paso 1 — Información básica:
Nombre del emprendimiento
Nombres del emprendedor (2 campos: Nombres + Apellidos)
Correo del emprendimiento
Teléfono/celular
Descripción detallada (textarea)
Categoría (select con íconos)
Tipo: Producto o Servicio (radio buttons con íconos)
Upload foto de logo/imagen de presentación (área drag & drop con preview)
Links de redes sociales: Instagram · TikTok · Facebook (con íconos de cada red)
Horarios de atención: selector por día (Lunes–Domingo), toggle activo/inactivo + hora apertura/cierre
Paso 2 — Ubicación:
Mapa interactivo con pin selector (referencia: Google Maps embed con marcador arrastrable)
Dos campos debajo del mapa: Latitud (auto-completado al mover pin) + Longitud (auto-completado)
Paso 3 — Perfil sostenible:
Actividades de producción sostenibles (multiselect/checkboxes con íconos):
Uso de materiales reciclados · Producción local · Packaging biodegradable · Energía renovable · Comercio justo · Cero residuos · Otro
¿Reduce materiales/empaques no biodegradables? → Sí / No / En proceso (radio con color)
¿Resuelve problemática ambiental o social específica? → Sí / No
Selección de beneficios del producto/servicio (mínimo 1 requerido): chips multiselect con íconos:
💧 Ahorra agua · ♻️ Reduce plástico · 🌿 Sin químicos · 🌍 Reduce huella de carbono · 🤝 Apoyo comunitario · 🐾 Amigable con animales · 💚 Economía circular · Otro (campo de texto)
Nota visual: "Selecciona al menos 1 beneficio — esto define tu Perfil Verde" (requerido, con validación)
Paso 4 — Acceso:
Contraseña (con indicador de fortaleza)
Confirmación de contraseña
Checkbox: Acepto términos y condiciones
Botón: "Registrar mi emprendimiento" (verde oscuro, grande)

PÁGINA 7 — GESTIÓN DE MI EMPRENDIMIENTO (post-login emprendedor)
Header con saludo: "Hola, [Nombre del emprendimiento] 👋" + badge de plan (Gratis / Premium)
Navegación por tabs o sidebar vertical con 4 secciones:
Tab 1 — Editar perfil:
Formulario pre-llenado con todos los datos del registro
Botón: "Guardar cambios"
Tab 2 — Catálogo (🔒 Solo Plan Premium):
Si el emprendedor tiene plan Gratis: pantalla de upgrade con mensaje "Publica tu catálogo de productos y llega a más consumidores conscientes", beneficios listados y botón "Activar Plan Premium" (naranja), con mascota tortuga sosteniendo productos
Si tiene plan Premium: grid de productos/servicios existentes (card con foto, nombre, precio, stock, botones Editar/Eliminar) + botón flotante "+ Agregar producto" (o servicio) + modal de agregar/editar con campos: foto, nombre, descripción, precio, stock inicial, categoría
Tab 3 — Bandeja de entrada (🔒 Solo Plan Premium):
Si el emprendedor tiene plan Gratis: pantalla de upgrade con mensaje "Recibe solicitudes de compra y comunicaciones directas desde la plataforma", beneficios listados y botón "Activar Plan Premium" (naranja), con mascota tortuga con ícono de mensaje
Si tiene plan Premium: layout tipo inbox de 2 columnas — lista de conversaciones izquierda + detalle derecho
Lista de conversaciones: avatar del consumidor/admin, nombre, último mensaje truncado, timestamp, badge de no leído (punto verde)
Tipos de mensajes:
🛒 Solicitudes de compra: card con foto de producto, nombre del cliente, cantidad solicitada, precio total, estado (Pendiente / Confirmado / Enviado), botones "Confirmar" y "Responder por WhatsApp"
📢 Mensajes del administrador: badge "Admin" + ícono escudo, fondo ligeramente diferente al resto
Panel de detalle derecho: hilo de mensajes con timestamps, campo de respuesta + botón enviar
Tab 4 — Módulo de Ventas / Gestión de Inventarios (🔒 Solo Plan Premium):
Si el emprendedor tiene plan Gratis: pantalla de upgrade con beneficios listados y botón "Activar Plan Premium" (naranja), con imagen de mascota tortuga con gráfico


Si tiene plan Premium: dashboard completo con:

 Sub-sección: Inventario:


Tabla de productos con columnas: Foto · Producto · Stock actual · Vendidos · Estado (En stock / Bajo stock / Agotado)
Controles de ajuste de stock: botones + y – por producto, con input de cantidad
Botón: "Actualizar inventario"
Sub-sección: Métricas y estadísticas:


4 KPI cards en fila: Total ventas del mes · Ingresos estimados · Producto más vendido · Clientes nuevos
Gráfico de línea: evolución de ventas (últimos 30 días)
Gráfico de barras: ventas por producto
Gráfico de dona: distribución por categoría de producto
Sub-sección: Impacto ambiental acumulado:


Título: "Tu impacto hasta hoy"
3–4 cards visuales grandes con ícono animado + número acumulado + descripción:
💧 "X litros de agua ahorrados"
♻️ "X kg de plástico evitados"
🌱 "X kg de CO₂ no emitidos"
🛍️ "X pedidos conscientes procesados"
Mini badge compartible: "Comparte tu impacto 🌍"
Sub-sección: Asesorías (Plan Premium):


Card con opciones de agendar asesoría: Marketing sostenible · Finanzas · Gestión operativa
Botón: "Agendar asesoría" + calendario visual

PÁGINA 8 — LOGIN ADMINISTRADOR
Layout centrado, fondo #19350C (verde oscuro) con textura sutil
Logo Yo Impulso blanco centrado arriba
Card oscura semitransparente o blanca con:
Título: "Panel de Administración" + ícono escudo
Campo: Correo electrónico
Campo: Contraseña
Botón: "Acceder" (naranja, ancho completo)
No incluir opción de registro (solo admin accede por invitación)

PÁGINA 9 — PANEL DE ADMINISTRACIÓN
Sidebar izquierdo fijo con navegación: Dashboard · Solicitudes de registro · Emprendimientos activos · Bloqueados · Configuración
Header: "Panel de administración — Yo Impulso" + nombre del admin + botón cerrar sesión
Sección 1 — Dashboard (vista general):
4 KPI cards: Total emprendimientos · Solicitudes pendientes · Emprendimientos activos · Suscripciones premium
Gráfico de actividad reciente
Sección 2 — Solicitudes de registro:
Tabla con columnas: Logo · Nombre del emprendimiento · Emprendedor · Categoría · Fecha de solicitud · Estado · Acciones
Estado con badges de color: 🟡 Pendiente / 🟢 Aprobado / 🔴 Rechazado
Acciones por fila: botón "Aprobar" (verde) + "Rechazar" (rojo) + "Ver detalles" (abre modal lateral con toda la info del formulario de registro)
Modal de detalle: muestra todos los datos del emprendimiento, beneficios seleccionados, mapa de ubicación, foto del logo
Sección 3 — Emprendimientos activos:
Tabla de todos los emprendimientos aprobados con columnas: Logo · Nombre · Categoría · Plan (Gratis/Premium) · Tiempo restante de suscripción (barra de progreso + días restantes) · Estado · Acciones
Acción de "Bloquear": botón rojo que abre modal de confirmación con campo de motivo del bloqueo
Los emprendimientos bloqueados aparecen con badge rojo "Bloqueado" y botón "Desbloquear"
Filtros: Por plan · Por categoría · Por estado · Por tiempo de suscripción

ESPECIFICACIONES TÉCNICAS Y DE DISEÑO
Versión principal: Desktop 1440px de ancho
Componentes: Diseñados para reutilización en React/Next.js con Tailwind/SCSS
Estados de interacción: Incluir estados hover, active, focus, disabled para todos los componentes interactivos
Animaciones sugeridas (SCSS-ready): Hover en cards (elevación + sombra), transición de tabs, aparición de pop-ups en mapa, entrada staggered de grids
Accesibilidad: Contraste mínimo AA, labels en todos los inputs, focus rings visibles
Flujo de compra: buscar → ver perfil → carrito → WhatsApp
Flujo emprendedor: login → (registro si es nuevo) → gestión con tabs
Flujo administrador: login → panel → aprobar/rechazar/bloquear
Mascota tortuga: aparece en hero, guías, login emprendedor, estados vacíos, upgrade premium y onboarding del formulario
Propósito: Presentable en hackathon — visualmente impactante, completo y funcional