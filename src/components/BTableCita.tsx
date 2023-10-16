import { Link } from "react-router-dom";
import { Cita } from "../types/Cita";
import { useUserData } from "../store/Store";
import { format } from "date-fns";
import { Spinner } from "@chakra-ui/react";

type Props = {
  citaList: Cita[];
  isLoading: boolean;
};

export default function BTableCita(props: Props) {
  const { setCurrentCita } = useUserData((state) => state);

  const handleOnClick = (id: number, matricula: string) => {
    setCurrentCita({ id: id, matricula: matricula });
  };

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
        props.citaList.map((cita, index) => {
          return (
            <ul
              className={`${
                index % 2 == 0 ? "bg-teal-50" : "bg-teal-100"
              } rounded-md py-2 sm:flex flex-col justify-around my-2`}
              key={cita.id}
            >
              <Link
                to={`/citas/${cita.id}`}
                onClick={() => handleOnClick(cita.id, cita.matriculaAlumno)}
                className="sm:grid sm:grid-cols-3 sm:text-center"
              >
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">ID cita</span>
                  <p className="py-2">{cita.id}</p>
                </li>
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">Fecha</span>
                  <p className="py-2">
                    {format(new Date(cita.fecha), "dd/MM/yyyy")}
                  </p>
                </li>
                <li className="grid grid-cols-2 sm:block">
                  <span className="font-bold py-2 sm:hidden">Hora</span>
                  <p className="py-2">{cita.hora}</p>
                </li>
              </Link>
            </ul>
          );
        })
      ) : (
        <p></p>
      )}
    </>
  );
}
