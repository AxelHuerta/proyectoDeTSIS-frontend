import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Alumno } from "../../types/Alumno";

/**
 * muestra los detalles de un paciente
 * @component
 */
export default function PatientDetails() {
  // datos del paciente
  const [patient, setPatient] = useState<Alumno>({
    matricula: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    genero: "",
    telefonoMovil: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // id del paciente en la url
  const { patientId } = useParams();

  // estilos de los parrafos
  const pStyles = "flex justify-between md:grid md:grid-cols-2 my-4 border-b";

  /**
   * hace la peticion get de un paciente
   */
  const handlePatient = async () => {
    await axios
      .get(`http://localhost:8080/api/alumnos/${patientId}`)
      .then((res) => {
        setPatient({
          matricula: res.data.matricula,
          nombres: res.data.nombres,
          apellidoPaterno: res.data.apellidoPaterno,
          apellidoMaterno: res.data.apellidoMaterno,
          email: res.data.email,
          genero: res.data.genero,
          telefonoMovil: res.data.telefonoMovil,
        });

        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handlePatient();
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
      <div className="pt-28 pb-12 max-w-[1080px] mx-auto">
        <h1 className="text-2xl font-bold text-center">Detalles del alumno</h1>
        {/* datos generales */}
        <div className="card bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">Datos generales</h2>
            <div>
              {/* matricula */}
              <p className={pStyles}>
                <span className="font-bold">Matrícula:</span>
                {patientId}
              </p>
              {/* nombres */}
              <p className={pStyles}>
                <span className="font-bold">Nombres:</span>
                {patient.nombres}
              </p>
              <p className={pStyles}>
                {/* hora */}
                <span className="font-bold">Apellido Paterno:</span>
                {patient.apellidoPaterno}
              </p>
              {/* numTrabajador */}
              <p className={pStyles}>
                <span className="font-bold">Apellido Materno:</span>
                {patient.apellidoMaterno}
              </p>
            </div>
          </div>
        </div>

        {/* otros datos */}
        <div className="card bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">Otros datos</h2>
            <div>
              {/* email */}
              <p className={pStyles}>
                <span className="font-bold">Email:</span>
                {patient.email}
              </p>
              {/* genero */}
              <p className={pStyles}>
                <span className="font-bold">Género:</span>
                {patient.genero}
              </p>
              <p className={pStyles}>
                {/* telefono movil */}
                <span className="font-bold">Teléfono Móvil:</span>
                {patient.telefonoMovil}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
