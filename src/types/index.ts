export interface IInhumado {
    id: number; 
    apellido: string;
    nombre: string;
    fnac: string; // Fecha de nacimiento
    ffal: string; // Fecha de fallecimiento
    valle: string;
    sector: string;
    manzana: number;
    parcela: number;
    simbolo: number;
    ncliente: number;
  }

  export interface IInhumados {
    id: string; 
    apellido: string;
    nombre: string;
    fnac: string; // Fecha de nacimiento
    ffal: string; // Fecha de fallecimiento
    valle: string;
    sector: string;
    manzana: number;
    parcela: number;
    simbolo: number;
    ncliente: number;
    publicaciones: []; // Creo que son string, comprobarlo.
    usuario_id: string | null;
  } 

export interface IObituario {
    id: string;
    mensaje: string;
    inhumadoId: string; 
    imagen?: string; // La imagen opcional que puede adjuntarse al mensaje
    fecha?: string; // La fecha en la que se realizó la publicación
    estado?: string;
  }
  
export interface ILoginProps {
    email: string;
    password: string;
}

export interface ILoginPropsErrors {
    email?: string;
    password?: string;
}

export interface IUserSession {
    token: string;
    user: {
        apellido: string;
        dni: number;
        email: string;
        idUser: string;
        isAdmin: boolean;
        nombre: string;
        password: string;
        provider?: string;
        
    }
}
export interface IUserDetails {
  idUser: string;
  nombre: string;
  apellido: string;
  email: string;
  isAdmin: boolean;
  dni: string;
  recibirRecordatoriosAniversarios: boolean;
  phoneNumber: string;
  fechaPago: Date;
  imagenUrl: File;
}


export interface IInhumadoDetail {
  id: string;
  nombre: string;
  apellido: string;
  fnac: string;
  ffal: string;
  valle: string;
  sector: string;
  manzana: string;
  parcela: string;
  simbolo?: string;
  ncliente?: string;
  imagenUrl?: string;
}

export interface IInhumadoFormData {
  nombre: string;
  apellido: string;
  fnac: string;
  ffal: string;
  valle: string;
  sector: string;
  manzana: string;
  parcela: string;
  simbolo: string;
  ncliente: string;
}

export interface IPublicacion {
  aprobada: unknown;
  id: string;
  mensaje: string;
  imagen?: string; // Opcional
  fechaPublicacion: string; // Se asume que viene como string
}

// }
// export interface IPost {
//   id: string;             // ID único de la publicación
//   mensaje: string;       // El mensaje o texto de la publicación
//   usuarioId: string;     // ID del usuario que hizo la publicación (equivalente a 'usuarioId')
//   imagen?: string;       // URL de la imagen asociada (opcional)
//   createdAt: string;     // Fecha de creación en formato ISO
//   updatedAt: string;
//   fechaPublicacion: string; 
//   aprobada: boolean;    // Fecha de la última actualización en formato ISO
// }

