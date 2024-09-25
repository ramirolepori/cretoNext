export type clientes = {
    id: number;
    nombre: string;
    email: string;
    created_at: Date;
  };

  export type logins = {
    id: number;
    cliente_id: number;
    password_hash: string;
    last_login: Date;
  };

  export type proyectos = {
    id: number;
    cliente_id: number;
    nombre: string;
    descripcion: Text;
    fecha_inicio: Date;
    fecha_fin: Date;
    created_at: Date;
  };

  export type tipo_servicios = {
    id: number;
    nombre: string;
    descripcion: Text;
  };

  export type proyectos_servicios = {
    proyecto_id: number;
    servicio_id: number;
    precio: number;
  };
  