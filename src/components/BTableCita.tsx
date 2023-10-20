import { Link } from "react-router-dom";
import { Cita } from "../types/Cita";
import { useUserData } from "../store/Store";
import { format } from "date-fns";
import { Spinner } from "@chakra-ui/react";

type Props = {
  citaList: Cita[];
  isLoading: boolean;
  status: number;
};

/**
 * Muestra una tabla de citas
 * @component
 */
export default function BTableCita(props: Props) {
  const { setCurrentCita } = useUserData((state) => state); // cita actual

  /**
   * establece id y matricula de la cita actual
   */
  const handleOnClick = (id: number, matricula: string) => {
    setCurrentCita({ id: id, matricula: matricula });
  };

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
      {props.citaList.length > 0 ? (
        props.citaList.map((cita) => {
          return (
            <ul
              className={"sm:flex flex-col justify-around border-b"}
              key={cita.id}
            >
              {/* link a los detalles de la cita */}
              <Link
                to={`/citas/${cita.id}`}
                onClick={() => handleOnClick(cita.id, cita.matriculaAlumno)}
                className="sm:grid sm:grid-cols-3 sm:text-center"
              >
                {/* id de la cita */}
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">ID cita</span>
                  <p className="py-2">{cita.id}</p>
                </li>
                {/* fecha */}
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">Fecha</span>
                  <p className="py-2">
                    {format(new Date(cita.fecha), "dd/MM/yyyy")}
                  </p>
                </li>
                {/* hora */}
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">Hora</span>
                  <p className="py-2">{cita.hora.slice(0, -3)}</p>
                </li>
              </Link>
            </ul>
          );
        })
      ) : (
        <p className="text-center text-lg">
          {/* si no hay citas registradas */}
          {props.status == 204 ? "No hay citas registradas" : ""}
        </p>
      )}
    </>
  );
}
