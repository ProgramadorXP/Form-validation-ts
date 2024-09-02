import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCircleCheck,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import { Campo } from "../types";

type InputProps = {
  estado: Campo,
  cambiarEstado: Dispatch<SetStateAction<Campo>>,
  htmlFor: string,
  labelInput: string,
  name: string,
  tipo: string,
  leyendaError: string,
  expresionRegular?: RegExp,
  funcion?: () => void
};

const Input = ({ estado, cambiarEstado, htmlFor, labelInput, name, tipo, leyendaError, expresionRegular, funcion }: InputProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    cambiarEstado({ ...estado, campo: e.target.value });
  };
  const validacion = () => {
    if (expresionRegular && expresionRegular.test(estado.campo)) {
      cambiarEstado({ ...estado, valido: true });
    } else {
      cambiarEstado({ ...estado, valido: false });
    }

    if (funcion) {
      funcion();
    }
  }
  return (
    <div className="">
      <label htmlFor={htmlFor} className="cursor-pointer font-medium">
        {labelInput}
      </label>
      <div className="relative mt-1">
        <input
          value={estado.campo}
          onChange={onChange}
          onBlur={validacion}
          onKeyUp={validacion}
          id={name}
          type={tipo}
          autoComplete="false"
          className={`${estado.valido || estado.valido === null ? 'border-transparent focus:border-blue-600' : 'border-red-600 focus:border-red-600'} w-full px-1 h-[40px] rounded-md font-medium outline-none border-2 transition-all duration-200`}
        />
        <FontAwesomeIcon
          className={`${estado.valido ? 'block' : 'hidden'} absolute right-[15px] top-3 text-green-600`}
          icon={faCircleCheck}
        />
        <FontAwesomeIcon
          className={`${estado.valido === false ? 'block' : 'hidden'} absolute right-[15px] top-3 text-red-600`}
          icon={faCircleXmark}
        />
      </div>
      <p className={`${estado.valido === false ? 'block' : 'hidden'} mt-2 text-red-600 font-normal w-fit p-1 rounded-sm`}>
        <FontAwesomeIcon className="mr-1" icon={faTriangleExclamation} />
        {leyendaError}
      </p>
    </div>
  );
};

export default Input;
