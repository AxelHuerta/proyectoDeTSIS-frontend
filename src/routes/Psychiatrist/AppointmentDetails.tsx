import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Spinner,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
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

  // p css styles
  const pStyles = "flex justify-between md:grid md:grid-cols-2 my-4 border-b";

  // alert variables
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);

  const navigate = useNavigate();

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

  const handleDeleteCita = async () => {
    await axios
      .delete(
        `http://localhost:8080/api/alumnos/${currentCita.matricula}/citas/${currentCita.id}`,
      )
      .then((res) => {
        console.log(res);
        navigate("/citas");
      })
      .catch((error) =>
        console.log("Hubo un error al eliminar la cita", error),
      );
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

      {/* datos generales */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>¿Desea borrar esta cita?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Una vez la cita sea eliminada, no podrá recuperarse.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteCita}>
              Eliminar cita
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="pt-28 pb-12 max-w-[1080px] mx-auto">
        <h1 className="text-2xl font-bold text-center">Detalles de la cita</h1>

        {/* datos generales */}
        <div className="card bg-base-100 shadow-xl m-4">
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
        <div className="card bg-base-100 shadow-xl m-4">
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
        <div className="card bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">Motivo de la cita</h2>
            <div>
              <p>{cita.motivoCita}</p>
            </div>
          </div>
        </div>

        {/* danger zone */}
        <div className="alert bg-white m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>¿Borrar cita?</span>
          <div>
            <button
              className="btn btn-sm bg-red-500 hover:bg-red-400 text-white"
              onClick={onOpen}
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
