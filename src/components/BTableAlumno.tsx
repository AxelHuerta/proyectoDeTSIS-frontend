import { Link } from "react-router-dom";
import { Alumno } from "../types/Alumno";

type Props = {
  alumnosList: Alumno[];
};

export default function BTableAlumno(props: Props) {
  return (
    <>
      {props.alumnosList.map((alumno, index) => {
        return (
          <ul
            className={`${
              index % 2 == 0 ? "bg-teal-50" : "bg-teal-100"
            } rounded-md py-2 sm:flex flex-col justify-around my-2`}
            key={`${alumno.nombres}${alumno.apellidoPaterno}${alumno.apellidoMaterno}`}
          >
            <Link to={"/"} className="sm:flex justify-around">
              <li className="grid grid-cols-2">
                <span className="font-bold py-2 sm:hidden">Nombres</span>
                <p className="py-2">{alumno.nombres}</p>
              </li>
              <li className="grid grid-cols-2 sm:block">
                <span className="font-bold py-2 sm:hidden">
                  Apellido Paterno
                </span>
                <p className="py-2">{alumno.apellidoPaterno}</p>
              </li>
              <li className="grid grid-cols-2 sm:block">
                <span className="font-bold py-2 sm:hidden">
                  Apellido Materno
                </span>
                <p className="py-2">{alumno.apellidoMaterno}</p>
              </li>
            </Link>
          </ul>
        );
      })}
    </>
  );
}
