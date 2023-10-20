import { Link } from "react-router-dom";
import { Alumno } from "../types/Alumno";
import { Spinner } from "@chakra-ui/react";

/**
 * propiedades del componente.
 */
type Props = {
  alumnosList: Alumno[];
  isLoading: boolean;
  status: number;
};

/**
 * Muestra una tabla de alumnos.
 * @component
 */
export default function BTableAlumno(props: Props) {
  /**
   * muestra una pantalla de carga
   */
  if (props.isLoading) {
    return (
      <div className="flex mt-32 justify-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </div>
    );
  }

  return (
    <>
      {props.alumnosList.length > 0 ? (
        props.alumnosList.map((alumno, index) => {
          return (
            <ul
              className={`sm:flex flex-col justify-around border-b`}
              key={index}
            >
              {/* link al perfil del usuario */}
              <Link
                to={`/patients/${alumno.matricula}`}
                className="sm:grid sm:grid-cols-3 sm:text-center"
              >
                {/* nombres del usuario */}
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">Nombres</span>
                  <p className="py-2">{alumno.nombres}</p>
                </li>
                {/* apellido paterno */}
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">
                    Apellido Paterno
                  </span>
                  <p className="py-2">{alumno.apellidoPaterno}</p>
                </li>
                {/* apellido materno */}
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">
                    Apellido Materno
                  </span>
                  <p className="py-2">{alumno.apellidoMaterno}</p>
                </li>
              </Link>
            </ul>
          );
        })
      ) : (
        <p className="text-center text-lg">
          {/* en caso de no haber pacientes registrados */}
          {props.status == 204 ? "No hay pacientes registrados" : ""}
        </p>
      )}
    </>
  );
}
