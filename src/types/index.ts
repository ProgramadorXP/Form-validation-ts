export type Campo = {
    campo: string,
    valido: boolean | null
};

export type Terminos = boolean;

export type Formulario = boolean | null;

export type Expresiones = {
    usuario: RegExp,
    nombre: RegExp,
    password: RegExp,
    correo: RegExp,
    telefono: RegExp,
}