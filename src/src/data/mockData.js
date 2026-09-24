// Datos simulados (mock). Esta es la única fuente de datos mientras no exista
// un backend conectado. Ver src/services/api.js para la capa de servicio que
// deberá reemplazarse por llamadas reales.

export const users = [
  { id: 'u1', name: 'Marta Figueroa', email: 'marta.figueroa@abogado.app', role: 'Administrador', title: 'Socia Directora', specialty: 'Derecho Corporativo', phone: '+1 809 555 0142' },
  { id: 'u2', name: 'Carlos Reyes', email: 'carlos.reyes@abogado.app', role: 'Abogado', title: 'Asociado Senior', specialty: 'Derecho Civil', phone: '+1 809 555 0198' },
  { id: 'u3', name: 'Juan Peña', email: 'juan.pena@abogado.app', role: 'Abogado', title: 'Asociado', specialty: 'Derecho Laboral', phone: '+1 809 555 0121' },
  { id: 'u4', name: 'Elena Vargas', email: 'elena.vargas@abogado.app', role: 'Asistente', title: 'Asistente Legal', specialty: '—', phone: '+1 809 555 0187' },
]

export const currentUserId = 'u2'

export const clients = [
  { id: 'c1', name: 'Juan Pérez', document: '001-1234567-8', phone: '+1 809 555 3321', email: 'juan.perez@mail.com', address: 'Av. Winston Churchill 45, Santo Domingo', registeredAt: '2025-02-11', notes: 'Cliente recurrente, prefiere comunicación por correo.', caseIds: ['e1', 'e4'] },
  { id: 'c2', name: 'Constructora del Este SRL', document: 'RNC 130-4455621', phone: '+1 809 555 7742', email: 'legal@constructoradeleste.com', address: 'Zona Industrial de Herrera, Santo Domingo', registeredAt: '2025-04-02', notes: 'Contacto principal: Ing. Ramón Ortiz.', caseIds: ['e2'] },
  { id: 'c3', name: 'María Gómez', document: '002-8877665-1', phone: '+1 809 555 4410', email: 'maria.gomez@mail.com', address: 'Calle El Sol 12, Santiago', registeredAt: '2025-06-19', notes: '', caseIds: ['e3'] },
  { id: 'c4', name: 'Luis Fernández', document: '003-2211998-4', phone: '+1 809 555 9903', email: 'luis.fernandez@mail.com', address: 'Av. 27 de Febrero 210, Santo Domingo', registeredAt: '2025-07-30', notes: 'Referido por Carlos Reyes.', caseIds: ['e5'] },
]

export const cases = [
  {
    id: 'e1', number: '000124', name: 'Venta de inmueble — Pérez', clientId: 'c1', type: 'Derecho Civil',
    status: 'Activo', createdAt: '2025-08-01', updatedAt: '2026-09-10', lawyerId: 'u2',
    description: 'Formalización de acto de venta de inmueble ubicado en el sector Piantini.',
    notes: 'Pendiente firma del comprador ante notario.',
  },
  {
    id: 'e2', number: '000131', name: 'Contrato de construcción — Constructora del Este', clientId: 'c2', type: 'Derecho Corporativo',
    status: 'Pendiente', createdAt: '2025-09-14', updatedAt: '2026-09-18', lawyerId: 'u1',
    description: 'Revisión y negociación de contrato de obra con proveedor de acero.',
    notes: 'Esperando contrapropuesta de la contraparte.',
  },
  {
    id: 'e3', number: '000142', name: 'Demanda laboral — Gómez', clientId: 'c3', type: 'Derecho Laboral',
    status: 'Activo', createdAt: '2025-11-03', updatedAt: '2026-09-20', lawyerId: 'u3',
    description: 'Reclamación por desahucio injustificado.',
    notes: 'Audiencia preliminar programada.',
  },
  {
    id: 'e4', number: '000098', name: 'Sucesión — Familia Pérez', clientId: 'c1', type: 'Derecho de Familia',
    status: 'Cerrado', createdAt: '2025-01-20', updatedAt: '2025-05-12', lawyerId: 'u2',
    description: 'Proceso sucesoral de bienes inmuebles y cuentas bancarias.',
    notes: 'Expediente cerrado y archivado.',
  },
  {
    id: 'e5', number: '000151', name: 'Constitución de empresa — Fernández', clientId: 'c4', type: 'Derecho Corporativo',
    status: 'Archivado', createdAt: '2025-03-08', updatedAt: '2025-04-01', lawyerId: 'u2',
    description: 'Constitución de SRL y registro mercantil.',
    notes: '',
  },
]

// tipo: docx | pdf | jpg | png | xlsx | pptx | txt | zip | folder
export const files = [
  { id: 'f1', name: 'Acto_de_venta.docx', type: 'docx', size: 482000, caseId: 'e1', ownerId: 'u2', createdAt: '2026-09-10', updatedAt: '2026-09-10', trashed: false, folderId: null },
  { id: 'f2', name: 'Demanda.pdf', type: 'pdf', size: 2516582, caseId: 'e1', ownerId: 'u2', createdAt: '2026-09-08', updatedAt: '2026-09-08', trashed: false, folderId: null },
  { id: 'f3', name: 'Cedula_frente.jpg', type: 'jpg', size: 1183400, caseId: 'e1', ownerId: 'u2', createdAt: '2026-09-05', updatedAt: '2026-09-05', trashed: false, folderId: null },
  { id: 'f4', name: 'Cedula_reverso.jpg', type: 'jpg', size: 1145200, caseId: 'e1', ownerId: 'u2', createdAt: '2026-09-05', updatedAt: '2026-09-05', trashed: false, folderId: null },
  { id: 'f5', name: 'Contrato.pdf', type: 'pdf', size: 986340, caseId: 'e1', ownerId: 'u2', createdAt: '2026-08-28', updatedAt: '2026-08-28', trashed: false, folderId: null },
  { id: 'f6', name: 'Propuesta_acero.xlsx', type: 'xlsx', size: 302100, caseId: 'e2', ownerId: 'u1', createdAt: '2026-09-18', updatedAt: '2026-09-18', trashed: false, folderId: null },
  { id: 'f7', name: 'Contrato_obra_v2.docx', type: 'docx', size: 411000, caseId: 'e2', ownerId: 'u1', createdAt: '2026-09-17', updatedAt: '2026-09-19', trashed: false, folderId: null },
  { id: 'f8', name: 'Carta_desahucio.pdf', type: 'pdf', size: 640200, caseId: 'e3', ownerId: 'u3', createdAt: '2026-09-20', updatedAt: '2026-09-20', trashed: false, folderId: null },
  { id: 'f9', name: 'Evidencia_01.jpg', type: 'jpg', size: 2210500, caseId: 'e3', ownerId: 'u3', createdAt: '2026-09-19', updatedAt: '2026-09-19', trashed: false, folderId: null },
  { id: 'f10', name: 'Acta_sucesoral.pdf', type: 'pdf', size: 754300, caseId: 'e4', ownerId: 'u2', createdAt: '2025-05-10', updatedAt: '2025-05-10', trashed: false, folderId: null },
  { id: 'f11', name: 'Presentacion_cierre.pptx', type: 'pptx', size: 1980000, caseId: 'e5', ownerId: 'u2', createdAt: '2025-04-01', updatedAt: '2025-04-01', trashed: false, folderId: null },
  { id: 'f12', name: 'Borrador_antiguo.docx', type: 'docx', size: 120400, caseId: 'e1', ownerId: 'u2', createdAt: '2026-08-01', updatedAt: '2026-08-01', trashed: true, trashedAt: '2026-09-12', folderId: null },
  { id: 'f13', name: 'Fotos_expediente.zip', type: 'zip', size: 8340000, caseId: 'e3', ownerId: 'u3', createdAt: '2026-09-01', updatedAt: '2026-09-01', trashed: true, trashedAt: '2026-09-15', folderId: null },
]

export const folders = [
  { id: 'fo1', name: 'Correspondencia', caseId: 'e1', createdAt: '2026-08-15' },
  { id: 'fo2', name: 'Evidencias', caseId: 'e3', createdAt: '2026-09-02' },
]

export const transfers = [
  { id: 't1', fileId: 'f2', fileName: 'Demanda.pdf', size: 2516582, fromId: 'u2', toId: 'u1', message: 'Favor revisar antes de la audiencia.', status: 'Pendiente', sentAt: '2026-09-21T10:20:00', expiresAt: '2026-09-28', allowDownload: true },
  { id: 't2', fileId: 'f6', fileName: 'Propuesta_acero.xlsx', size: 302100, fromId: 'u1', toId: 'u2', message: 'Actualicé los montos de la propuesta.', status: 'Aceptado', sentAt: '2026-09-18T09:05:00', expiresAt: null, allowDownload: true },
  { id: 't3', fileId: 'f9', fileName: 'Evidencia_01.jpg', size: 2210500, fromId: 'u3', toId: 'u2', message: '', status: 'Pendiente', sentAt: '2026-09-19T16:40:00', expiresAt: '2026-09-26', allowDownload: false },
]

export const sharedWithMe = [
  { id: 's1', fileId: 'f6', fileName: 'Propuesta_acero.xlsx', sharedBy: 'u1', sharedAt: '2026-09-18', permission: 'Ver y descargar' },
]

export const sharedByMe = [
  { id: 's2', fileId: 'f2', fileName: 'Demanda.pdf', sharedWith: 'u1', sharedAt: '2026-09-21', permission: 'Ver y descargar' },
]

export const activity = [
  { id: 'a1', userId: 'u2', action: 'subió', target: 'Acto_de_venta.docx', caseId: 'e1', at: '2026-09-23T14:10:00' },
  { id: 'a2', userId: 'u2', action: 'compartió', target: 'Expediente #000131', caseId: 'e2', at: '2026-09-22T11:32:00' },
  { id: 'a3', userId: 'u3', action: 'creó el expediente', target: 'Demanda laboral — Gómez', caseId: 'e3', at: '2026-09-20T09:00:00' },
  { id: 'a4', userId: 'u1', action: 'transfirió', target: 'Propuesta_acero.xlsx', caseId: 'e2', at: '2026-09-18T09:05:00' },
  { id: 'a5', userId: 'u2', action: 'eliminó', target: 'Borrador_antiguo.docx', caseId: 'e1', at: '2026-09-12T17:45:00' },
]

export const notifications = [
  { id: 'n1', text: 'Recibiste un archivo de Marta Figueroa', at: '2026-09-23T09:12:00', read: false },
  { id: 'n2', text: 'Se actualizó el expediente #000131', at: '2026-09-22T15:40:00', read: false },
  { id: 'n3', text: 'Tu transferencia de Propuesta_acero.xlsx fue aceptada', at: '2026-09-18T09:10:00', read: true },
  { id: 'n4', text: 'Se eliminó un documento del expediente #000124', at: '2026-09-12T17:46:00', read: true },
]

export const storage = { usedGB: 2.4, totalGB: 10 }
