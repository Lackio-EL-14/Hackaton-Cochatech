<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# 🚀 Documentación de la API - Hackathon Cochatech (MVP - Bloque 1)

Esta sección documenta los endpoints desarrollados para la Fase 1 (MVP) del backend. La API está construida con **NestJS** y utiliza **MariaDB** (desplegado en Aiven) para la persistencia de datos.

La seguridad perimetral se maneja mediante **Tokens JWT**. Para los endpoints privados, se debe enviar el token en la cabecera HTTP:
`Authorization: Bearer <TU_TOKEN_JWT>`

---

## 🔐 1. Módulo de Autenticación (`/auth`)

Maneja el registro y la emisión de tokens JWT con claims de roles (`ADMIN`, `ENTREPRENEUR`).

### Registrar un Usuario
* **Método:** `POST`
* **Ruta:** `/auth/register`
* **Acceso:** Público
* **Payload (Body JSON):**
  ```json
  {
    "email": "emprendedor@cochatech.com",
    "password": "password123",
    "role": "ENTREPRENEUR" // Puede ser "ADMIN" o "ENTREPRENEUR"
  }


Respuesta de Éxito (201 Created): Retorna el objeto del usuario creado (sin la contraseña).

### Iniciar Sesión (Login)

* **Método:** `POST`
* **Ruta:** `/auth/login`
* **Acceso:** `Público`
* **Payload (Body JSON):**

```json
{
  "email": "emprendedor@cochatech.com",
  "password": "password123"
}
```
Respuesta de Éxito (200 OK): 
```json
{
"access_token": "eyJhbGciOiJIUz...",
"user": {
"id": "uuid-del-usuario",
"email": "emprendedor@cochatech.com",
"role": "ENTREPRENEUR",
"isPremium": false
}
}
```
## 🏪 2. Módulo de Negocios (/business)

Gestión del perfil comercial de los emprendedores y visualización pública del catálogo de negocios activos.

### Obtener Catálogo Público (Lectura)

* **Método:** `GET`
* **Ruta:** `/business`
* **Acceso: Público (No requiere Token)**

* **Descripción: Retorna todos los negocios con estado "APPROVED". Inyecta el atributo booleano calculado isOpen basado en el objeto operatingHours y la hora actual del servidor.**

Respuesta de Éxito (200 OK): Arreglo de negocios aprobados con el flag "isOpen": true/false.

### Registrar un Negocio (Escritura)
* **Método:** `POST`
* **Ruta:** `/business`
* **Acceso: Privado (Requiere Token JWT)**
* **Rol Requerido: ENTREPRENEUR**

**Payload (Body JSON):**

```json
{
  "name": "Eco-Market Cochabamba",
  "description": "Tienda de productos orgánicos y empaques compostables.",
  "latitude": -17.3935,
  "longitude": -66.1570,
  "salesType": "AMBOS",
  "contactPhone": "+59171234567",
  "operatingHours": {
    "lun": {"open": "08:00", "close": "18:00", "closed": false},
    "mar": {"open": "08:00", "close": "18:00", "closed": false}
  }
}
```
Respuesta de Éxito (201 Created): Retorna el objeto del negocio creado. El sistema fuerza internamente el estado a "PENDING".

### Editar un Negocio (Actualización)
* **Método:** `PUT`
* **Ruta:** `/business`
* **Acceso: Privado (Requiere Token JWT)**
* **Rol Requerido: ENTREPRENEUR**

* **Descripción: Modifica el perfil comercial del emprendedor logueado. Al detectar cambios, el sistema reinicia el status a "PENDING" de forma automática y limpia cualquier razón de rechazo (rejectionReason).**

* **Payload: Mismo formato que el POST.**

## 🛡️ 3. Módulo de Administración (/admin)
**Herramientas de moderación para que los administradores controlen qué negocios son visibles en la plataforma.**

* **Aprobar / Rechazar Negocio**
* **Método:** `PATCH`
* **Ruta:** `/admin/business/:id/status (Reemplazar :id por el ID del negocio)`
* **Acceso: Privado (Requiere Token JWT)**

* **Rol Requerido: ADMIN**

**Payload para Aprobar (Body JSON):**
```json
{
  "status": "APPROVED"
}
```

**Payload para Rechazar (Body JSON):**

```json
{
  "status": "REJECTED",
  "rejectionReason": "La descripción del impacto ambiental es insuficiente."
}
```

**Reglas de validación: Si el estado es "REJECTED", el campo rejectionReason es estrictamente obligatorio.**

Respuesta de Éxito (200 OK): Retorna el negocio actualizado con su nuevo estado.
