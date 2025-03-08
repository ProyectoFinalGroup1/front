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
    publicaciones: any[]; // Cambiar según el tipo de datos de las publicaciones
    usuario_id: string | null;
  } 

export interface IObituario {
    id: string;
    mensaje: string;
    inhumadoId: string; 
    // Relacionado con el inhumado
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