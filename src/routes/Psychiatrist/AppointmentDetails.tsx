import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardBody, Heading, Spinner, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useUserData } from "../../store/Store";
import { Cita } from "../../types/Cita";
import axios from "axios";
import { format } from "date-fns";

export default function AppointmentDetails() {
  const { currentCita } = useUserData((state) => state);

  const [cita, setCita] = useState<Cita>({
    id: 0,
    NumTrabajador: "",
    fecha: "",
    hora: "",
    matriculaAlumno: "",
    motivoCita: "",
    comunidadIndigena: false,
    migrante: false,
    discapacidad: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { citaId } = useParams();

  const pStyles = "flex justify-between md:grid md:grid-cols-2 my-4 border-b";

  const handleCita = async () => {
    await axios
      .get(
        `http://localhost:8080/api/alumnos/${currentCita.matricula}/citas/${currentCita.id}`,
      )
      .then((res) => {
        setCita({
          id: res.data.id,
          NumTrabajador: res.data.NumTrabajador,
          fecha: res.data.fecha,
          hora: res.data.hora,
          matriculaAlumno: res.data.matriculaAlumno,
          motivoCita: res.data.motivoCita,
          comunidadIndigena: res.data.comunidadIndigena,
          migrante: res.data.migrante,
          discapacidad: res.data.discapacidad,
        });

        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleCita();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen justify-center items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </div>
      </>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <div className="pt-28 max-w-[1080px] mx-auto">
        <h1 className="text-2xl font-bold text-center">Detalles de la cita</h1>

        {/* datos generales */}
        <div className="card max-w[1080px] bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">Datos generales</h2>
            <div>
              {/* id cita */}
              <p className={pStyles}>
                <span className="font-bold">ID cita:</span>
                {citaId}
              </p>
              {/* matricula */}
              <p className={pStyles}>
                <span className="font-bold">Matrícula:</span>
                {currentCita.matricula}
              </p>
              {/* fecha */}
              <p className={pStyles}>
                <span className="font-bold">Fecha:</span>
                {format(new Date(cita.fecha), "dd/MM/yyyy")}
              </p>
              <p className={pStyles}>
                {/* hora */}
                <span className="font-bold">Hora:</span>
                {cita?.hora.slice(0, -3)}
              </p>
              {/* numTrabajador */}
              <p className={pStyles}>
                <span className="font-bold">ID psiquiatra:</span>
                {cita?.NumTrabajador}
              </p>
            </div>
          </div>
        </div>

        {/* identifiación */}
        <div className="card max-w[1080px] bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">
              ¿Se identificó con algunos de los grupos?
            </h2>
            <div>
              {/* discapacidad */}
              <p className={pStyles}>
                <span className="font-bold mr-4">
                  Persona con discapacidad:
                </span>
                {cita.discapacidad ? "Sí" : "No"}
              </p>
              {/* migrante */}
              <p className={pStyles}>
                <span className="font-bold mr-4">Persona migrante:</span>
                {cita.migrante ? "Sí" : "No"}
              </p>
              {/* comunidades indigenas */}
              <p className={pStyles}>
                <span className="font-bold mr-4">
                  Pueblos y comunidades indígenas:
                </span>
                {cita.comunidadIndigena ? "Sí" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* motivo de la cita */}
        <div className="card max-w[1080px] bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">Motivo de la cita</h2>
            <div>
              <p>{cita.motivoCita}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
