import { Link } from "react-router-dom";
import { Alumno } from "../types/Alumno";
import { Spinner } from "@chakra-ui/react";

type Props = {
  alumnosList: Alumno[];
  isLoading: boolean;
  status: number;
};

export default function BTableAlumno(props: Props) {
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
              className={`${
                index % 2 == 0 ? "bg-teal-50" : "bg-teal-100"
              } rounded-md py-2 sm:flex flex-col justify-around my-2`}
              key={`${alumno.nombres}${alumno.apellidoPaterno}${alumno.apellidoMaterno}`}
            >
              <Link to={"/"} className="sm:grid sm:grid-cols-3 sm:text-center">
                <li className="grid grid-cols-2 sm:block">
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
        })
      ) : (
        <p className="text-center text-lg">
          {props.status == 204 ? "No hay pacientes registrados" : ""}
        </p>
      )}
    </>
  );
}
