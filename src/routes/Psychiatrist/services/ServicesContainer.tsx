import {
  Card,
  CardBody,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Button,
  Spinner,
  Textarea,
  useDisclosure,
  Alert,
  Box,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useState, ChangeEvent, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import InputSwitch from "../../../components/InputSwitch";
import { useUserData } from "../../../store/Store";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import ServicesPresentational from "./ServicesPresentational";

type Psiquiatra = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numTrabajador: string;
};

type Cita = {
  NumTrabajador: string;
  fecha: string;
  hora: string;
  motivoCita: string;
  discapacidad: boolean;
  comunidadIndigena: boolean;
  migrante: boolean;
};

export default function ServicesContainer() {
  const [selected, setSelected] = useState<Date>();

  // Alert
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  // localhost
  const { isAuth, id } = useUserData((state) => state);

  // form info
  const [identificationData, setIdentificationData] = useState({
    discapacidad: false,
    migrante: false,
    comunidadIndigena: false,
  });

  const [dateForm, setDateForm] = useState("");
  const [timeForm, setTimeForm] = useState("");
  const [motivoCitaForm, setMotivoCitaForm] = useState("");

  const [termsForm, setTermsForm] = useState({
    shareData: false,
    truthful: false,
  });

  // time options
  const hours = [
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
  ];

  // isLoading varible
  const [isLoading, setIsLoading] = useState(true);

  // psiquiatras list
  const [psiquiatras, setPsiquiatras] = useState<Psiquiatra[]>([]);

  // psiquiatra
  const [psiquiatra, setPsiquiatra] = useState("");

  // save input data
  const dateTimeFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selected) {
      setDateForm(format(selected, "dd/MM/yyyy"));
    }
    setTimeForm(e.target.value);
  };

  // motivo cita
  const motivoCitaDataForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivoCitaForm(e.target.value);
  };

  // pshychiatrist info
  const psiquiatraDataForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPsiquiatra(e.target.value);
  };

  // switch button values
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setIdentificationData({
      ...identificationData,
      [name]: checked,
    });
  };

  const handleTermsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setTermsForm({
      ...termsForm,
      [name]: checked,
    });
  };

  const getPsiquiatras = async () => {
    await axios
      .get("http://localhost:8080/api/psiquiatras")
      .then((res) => {
        setPsiquiatras(res.data);
        setIsLoading(false);
      })
      // TODO: handleErrors
      .catch(() =>
        console.log("Ocurrio un error al listar a los psiquiataras"),
      );
  };

  // login pshychiatrist list
  useEffect(() => {
    getPsiquiatras();
  }, []);

  // TODO:
  // post cita
  const handleForm = () => {
    if (
      !termsForm.truthful ||
      !termsForm.shareData ||
      dateForm == "" ||
      timeForm == "" ||
      motivoCitaForm == "" ||
      psiquiatra == ""
    ) {
      onOpen();
      return;
    }

    // close alert
    onClose();

    let newCita: Cita = {
      NumTrabajador: psiquiatra,
      fecha: dateForm,
      hora: timeForm,
      motivoCita: motivoCitaForm,
      discapacidad: identificationData.discapacidad,
      comunidadIndigena: identificationData.comunidadIndigena,
      migrante: identificationData.migrante,
    };
    console.log(newCita);

    createCita(newCita);
  };

  const createCita = async (cita: Cita) => {
    await axios
      .post(`http://localhost:8080/api/alumnos/${id}/citas`, cita)
      .then((res) => console.log(res))
      .catch((e: any) => console.log("Hubo un error al agendar la cita", e));
  };

  return (
    <ServicesPresentational
      selected={selected}
      setSelected={setSelected}
      identificationData={identificationData}
      setIdentificationData={setIdentificationData}
      dateForm={dateForm}
      timeForm={timeForm}
      motivoCitaForm={motivoCitaForm}
      termsForm={termsForm}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      psiquiatra={psiquiatra}
      dateTimeFormOnChange={dateTimeFormOnChange}
      motivoCitaDataForm={motivoCitaDataForm}
      psiquiatraDataForm={psiquiatraDataForm}
      handleSwitchChange={handleSwitchChange}
      handleTermsOnChange={handleTermsOnChange}
    />
  );
}
