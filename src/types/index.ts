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
}