import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useUserData } from "../../store/Store";
import { Cita } from "../../types/Cita";
import axios from "axios";

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
        <h1>'Ta cargando</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-28 max-w-[1080px] mx-auto">
        <h1 className="text-2xl font-bold text-center">Detalles de la cita</h1>
        <Card className="my-4">
          <CardBody>
            <Heading size="md" className="text-center my-4">
              Datos generales
            </Heading>
            <div>
              {/* id cita */}
              <p className="grid grid-cols-2">
                <span className="font-bold mr-4">ID cita:</span>
                {citaId}
              </p>
              {/* matricula */}
              <p className="grid grid-cols-2">
                <span className="font-bold mr-4">Matrícula:</span>
                {currentCita.matricula}
              </p>
              {/* fecha */}
              <p className="grid grid-cols-2">
                <span className="font-bold mr-4">Fecha:</span>
                {cita?.fecha}
              </p>
              <p className="grid grid-cols-2">
                {/* hora */}
                <span className="font-bold mr-4">Hora:</span>
                {cita?.hora}
              </p>
              {/* numTrabajador */}
              <p className="grid grid-cols-2">
                <span className="font-bold mr-4">ID psiquiatra:</span>
                {cita?.NumTrabajador}
              </p>
            </div>
          </CardBody>
        </Card>

        {/* identifiación */}
        <Card className="my-4">
          <CardBody>
            <Heading size="md" className="text-center my-4">
              ¿Se identificó con algunos de los grupos?
            </Heading>
            <div>
              {/* discapacidad */}
              <p className="grid grid-cols-2">
                <span className="font-bold mr-4">
                  Persona con discapacidad:
                </span>
                {cita.discapacidad ? "Sí" : "No"}
              </p>
              {/* migrante */}
              <p className="grid grid-cols-2">
                <span className="font-bold mr-4">Persona migrante:</span>
                {cita.migrante ? "Sí" : "No"}
              </p>
              {/* comunidades indigenas */}
              <p className="grid grid-cols-2">
                <span className="font-bold mr-4">
                  Pueblos y comunidades indígenas:
                </span>
                {cita.comunidadIndigena ? "Sí" : "No"}
              </p>
            </div>
          </CardBody>
        </Card>

        {/* motivo de la cita */}
        <Card className="my-4">
          <CardBody>
            <Heading size="md" className="text-center my-4">
              Motivo de la cita
            </Heading>
            <Text>{cita.motivoCita}</Text>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
