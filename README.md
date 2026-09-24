# ABOGADO — Plataforma de gestión jurídica

Aplicación interna para que abogados gestionen expedientes, clientes y
documentos: creación de expedientes, ficha de clientes, gestor de archivos
tipo Drive, transferencias entre usuarios, papelera, actividad y un panel de
administración.

Este repositorio es el **frontend**, construido con datos simulados
(mock) para poder demostrar y probar toda la interfaz sin depender de un
backend. La capa de servicio (`src/services/api.js`) está aislada del resto
del código precisamente para que, cuando exista un backend real, solo haya
que reescribir esas funciones — ningún componente necesita cambiar.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. En la pantalla de inicio de sesión, cualquier
correo/contraseña entra como "Carlos Reyes" (usuario abogado de la demo).

Para generar la build de producción:

```bash
npm run build
npm run preview   # sirve la build localmente para revisarla
```

## Qué está implementado (100% funcional en el frontend, con datos simulados)

- Inicio de sesión / registro (simulado, sin backend real todavía)
- Dashboard: resumen, actividad reciente, acciones rápidas, almacenamiento
- Expedientes: listado, filtros, búsqueda, creación, ficha de detalle con
  pestañas (archivos / detalles / notas)
- Clientes: listado, búsqueda, ficha de detalle, creación, expedientes
  asociados
- Gestor de archivos: vista de cuadrícula y lista, filtros por expediente y
  tipo, subir (con progreso simulado), renombrar, eliminar (a papelera)
- Transferencias: enviar un archivo a otro usuario con mensaje, expiración y
  permiso de descarga; bandeja de recibidas/enviadas con aceptar/rechazar
- Compartidos: "compartidos conmigo" y "compartidos por mí"
- Papelera: restaurar / eliminar definitivamente
- Perfil: datos del usuario, cambio de contraseña (formulario), preferencias
  de notificaciones, cerrar sesión
- Panel de administración (`/admin`): usuarios (suspender/reactivar),
  actividad, almacenamiento
- Búsqueda global (clientes, expedientes, documentos)
- Notificaciones (panel con contador)
- Diseño responsive: sidebar con menú hamburguesa en móvil, tablas con
  scroll horizontal contenido, cuadrícula de archivos adaptable

## Qué todavía necesita un backend real

Todo lo anterior funciona en memoria durante la sesión del navegador. Nada
se guarda de verdad. Para que la aplicación sea un sistema real de
producción falta:

1. **Autenticación real** — JWT/sesión emitida por el servidor, cookie
   `httpOnly` + `Secure`, hash de contraseñas (bcrypt/argon2) en el
   servidor. Nunca contraseñas en texto plano ni tokens largos en
   `localStorage`.
2. **Almacenamiento de archivos** — un backend de objetos (S3, GCS, Azure
   Blob) con URLs firmadas de subida/descarga; el navegador nunca debe subir
   directamente a una base de datos.
3. **Base de datos** — Postgres (o similar) con las siguientes entidades:

   ```
   users            (id, name, email, password_hash, role, title, specialty, phone, suspended)
   clients          (id, name, document, phone, email, address, notes, registered_at, created_by)
   cases            (id, number, name, client_id, type, status, description, notes,
                      lawyer_id, created_at, updated_at)
   folders          (id, name, case_id, parent_id, created_by, created_at)
   files            (id, name, type, size, storage_key, case_id, folder_id, owner_id,
                      created_at, updated_at, trashed_at)
   file_transfers   (id, file_id, from_id, to_id, message, status, expires_at,
                      allow_download, sent_at, responded_at)
   shares           (id, file_id, shared_by, shared_with, permission, created_at)
   permissions      (id, role, resource, action)  -- o una tabla de roles fija
   activity_logs    (id, user_id, action, target, case_id, ip, created_at)
   notifications    (id, user_id, text, read, created_at)
   ```

4. **Autorización** — aplicar permisos por rol (Administrador / Abogado /
   Asistente) en el servidor, no solo en la interfaz.
5. **Registro de actividad e IP** — generado por el servidor en cada acción
   relevante (subida, descarga, transferencia, eliminación).
6. **Previsualización de documentos** — visor de PDF embebido (p. ej.
   PDF.js) e imágenes ya son viables sin backend adicional; una vista previa
   real de DOCX normalmente requiere convertir el documento en el servidor
   (p. ej. a PDF) o un servicio externo.
7. **Límites de almacenamiento por usuario/plan**, aplicados en el backend.

## Estructura

```
src/
├── components/   Sidebar, Header, SearchBar, NotificationPanel,
│                 FileCard, FileList, UploadModal, TransferModal, Layout
├── pages/        Login, Dashboard, Cases, CaseDetails, Clients, Files,
│                 Shared, Transfers, Trash, Profile, Admin
├── context/      AuthContext.jsx (sesión simulada)
├── data/         mockData.js (todos los datos de demostración)
├── services/     api.js (capa de servicio — reemplazar por llamadas reales)
├── utils.js      formato de fechas/tamaños, iconos de archivo
├── App.jsx
├── main.jsx
└── index.css     sistema de diseño (tokens, layout, componentes)
```

## Publicar en GitHub (`flexxxf/Abogado`)

```bash
git init
git add .
git commit -m "Estructura inicial de ABOGADO"
git branch -M main
git remote add origin https://github.com/flexxxf/Abogado.git
git push -u origin main
```

El `.gitignore` ya excluye `node_modules/`, `dist/`, `.env` y cualquier
credencial o llave.
