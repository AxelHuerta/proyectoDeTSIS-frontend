import Navbar from "../components/Navbar";
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
import InputSwitch from "../components/InputSwitch";
import { useUserData } from "../store/Store";
import { Link } from "react-router-dom";
import axios from "axios";

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

export default function Services() {
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
    comunidadadIndigena: false,
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
      comunidadIndigena: identificationData.comunidadadIndigena,
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

  if (!isAuth) {
    return (
      <>
        <Navbar />
        <div className="mt-28 text-center mx-4">
          <h1 className="text-2xl font-bold">Solicitar Cita</h1>
          <span>Para poder solicitar cita debes iniciar sesión</span>
          <br />
          <Link to="/login/student">
            <Button colorScheme="teal" className="text-center mt-4">
              Inciar Sesión
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="h-[90vh] flex justify-center items-center">
          <Spinner
            thickness="6px"
            speed="0.75s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </div>
      ) : (
        <div>
          <div className="mt-28 text-center mx-4">
            <h1 className="text-2xl font-bold">Solicitar Cita</h1>
            <span>La atención psícologica es completamente gratuita</span>
          </div>
          {/* form */}
          <div className="max-w-[1080px] mx-auto">
            <Card className="my-4">
              <CardBody>
                <Text>¿Se identifica con alguno de los siguientes grupos?</Text>
                <FormControl
                  alignItems="center"
                  className="mt-8 grid md:grid-cols-2 lg:grid-cols-3"
                >
                  {/* discapacidad */}
                  <InputSwitch
                    name="discapacidad"
                    text="Persona con discapacidad"
                    onChange={handleSwitchChange}
                  />
                  {/* migrante */}
                  <InputSwitch
                    name="migrante"
                    text="Persona migrante"
                    onChange={handleSwitchChange}
                  />
                  {/* pueblos indigenas */}
                  <InputSwitch
                    name="comunidadadIndigena"
                    text="Pueblos y comunidades indigenas"
                    onChange={handleSwitchChange}
                  />
                </FormControl>
              </CardBody>
            </Card>

            {/* date and time form */}
            <Card className="my-4">
              <CardBody>
                <Text>Por favor, seleccione fecha y hora para su cita</Text>
                <FormControl
                  alignItems="center"
                  className="mt-8 flex flex-col"
                  onChange={dateTimeFormOnChange}
                >
                  {/* date */}
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                  />
                  {/* hour */}
                  <Select
                    placeholder="Selecciona una hora"
                    id="time"
                    name="time"
                  >
                    {hours.map((hour) => {
                      return (
                        <option value={hour} key={hour}>
                          {hour}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </CardBody>
            </Card>

            {/* motivo cita */}
            <Card className="my-4">
              <CardBody>
                <Text>Motivo de la cita</Text>
                <FormControl
                  alignItems="center"
                  className="mt-8 flex flex-col"
                  onChange={motivoCitaDataForm}
                >
                  <Textarea
                    placeholder="Motivo por el cual solicita orientación psícologica"
                    size="md"
                    resize="none"
                    id="motivoCita"
                    name="motivoCita"
                    style={{ height: "300px" }}
                  />
                </FormControl>
              </CardBody>
            </Card>

            {/* choose pshychiatrist */}
            <Card className="my-4">
              <CardBody>
                <Text>Selecciona un psiquiatra</Text>
                <FormControl
                  alignItems="center"
                  className="mt-8 flex flex-col"
                  onChange={psiquiatraDataForm}
                >
                  <Select
                    placeholder="Selecciona un psiquiatra"
                    id="psiquiatra"
                    name="psiquiatra"
                  >
                    {psiquiatras.length > 0
                      ? psiquiatras.map((psiquiatra) => {
                          return (
                            <option
                              value={psiquiatra.numTrabajador}
                              key={psiquiatra.numTrabajador}
                            >
                              {`${psiquiatra.nombres} ${psiquiatra.apellidoPaterno} ${psiquiatra.apellidoMaterno}`}
                            </option>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </CardBody>
            </Card>

            {/* terminos y servicios */}
            <Card className="my-4">
              <CardBody>
                <Text>
                  Para poderte brindar la orientación solicitada, es necesario
                  activar las siguientes casillas
                </Text>
                <FormControl alignItems="center" className="mt-8 flex flex-col">
                  <div className="flex justify-between items-center w-full my-4">
                    <FormLabel htmlFor="discapacidad" mb="0">
                      Autorizo compartir mis datos de contacto con la autoridad
                      academica
                    </FormLabel>
                    <Switch
                      id="shareData"
                      size="lg"
                      colorScheme="teal"
                      name="shareData"
                      onChange={handleTermsOnChange}
                    />
                  </div>
                  <div className="flex justify-between items-center w-full my-4">
                    <FormLabel htmlFor="discapacidad" mb="0">
                      Bajo la protesta de decir la verdad, manifiesto que la
                      información proporcionada es verídica
                    </FormLabel>
                    <Switch
                      id="truthful"
                      size="lg"
                      colorScheme="teal"
                      name="truthful"
                      onChange={handleTermsOnChange}
                    />
                  </div>
                </FormControl>
              </CardBody>
            </Card>
            <div className="text-center my-5">
              {isVisible ? (
                <Alert status="warning">
                  <AlertIcon />
                  <Box className="mx-auto">
                    <AlertTitle>Datos faltantes</AlertTitle>
                    <AlertDescription>
                      Debes completar el formulario
                    </AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={onClose}
                  />
                </Alert>
              ) : null}
              <Button colorScheme="teal" onClick={handleForm}>
                Registar solicitud
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
