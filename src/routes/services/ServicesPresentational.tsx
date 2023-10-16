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
import {
  useState,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import InputSwitch from "../../components/InputSwitch";
import { useUserData } from "../../store/Store";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { format } from "date-fns";

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

type Props = {
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  identificationData: {
    discapacidad: boolean;
    migrante: boolean;
    comunidadIndigena: boolean;
  };
  // TODO: add type
  setIdentificationData: (identificationData: {
    discapacidad: boolean;
    migrante: boolean;
    comunidadIndigena: boolean;
  }) => void;
  timeForm: string;
  motivoCitaForm: string;
  termsForm: { shareData: boolean; truthful: boolean };
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  psiquiatra: string;
  dateTimeFormOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  motivoCitaDataForm: (e: ChangeEvent<HTMLInputElement>) => void;
  psiquiatraDataForm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSwitchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTermsOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  alertMessage: { title: string; text: string };
  setAlertMessagge: Dispatch<SetStateAction<{ title: string; text: string }>>;
};

export default function ServicesPresentational(props: Props) {
  // Alert
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  // localhost
  const { isAuth, id } = useUserData((state) => state);

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

  // psiquiatras list
  const [psiquiatras, setPsiquiatras] = useState<Psiquiatra[]>([]);
  const [addCitaSuccess, setAddCitaSuccess] = useState(false);

  const getPsiquiatras = async () => {
    await axios
      .get("http://localhost:8080/api/psiquiatras")
      .then((res) => {
        setPsiquiatras(res.data);
        props.setIsLoading(false);
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
  const handleForm = () => {
    if (
      !props.termsForm.truthful ||
      !props.termsForm.shareData ||
      props.timeForm == "" ||
      props.motivoCitaForm == "" ||
      props.psiquiatra == ""
    ) {
      props.setAlertMessagge({
        title: "Datos faltantes",
        text: "Se deben llenar todos los datos",
      });
      onOpen();
      return;
    }

    const today = new Date();
    if (props.selected && props.selected < today) {
      console.log("today", today);
      console.log("seleccioando", today);

      console.log("La fecha tiene que ser después de hoy");
      props.setAlertMessagge({
        title: "Fecha invalida",
        text: "Debes seleccionar una fecha valida",
      });
      onOpen();
      return;
    }

    // close alert
    onClose();

    let newCita: Cita = {
      NumTrabajador: props.psiquiatra,
      fecha: format(props.selected ? props.selected : new Date(), "dd/MM/yyyy"),
      hora: props.timeForm,
      motivoCita: props.motivoCitaForm,
      discapacidad: props.identificationData.discapacidad,
      comunidadIndigena: props.identificationData.comunidadIndigena,
      migrante: props.identificationData.migrante,
    };
    console.log(newCita);

    createCita(newCita);
  };

  const createCita = async (cita: Cita) => {
    props.setIsLoading(true);
    await axios
      .post(`http://localhost:8080/api/alumnos/${id}/citas`, cita)
      .then((res) => {
        console.log(res);
        setAddCitaSuccess(true);
      })
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

  if (addCitaSuccess) {
    return (
      <div className="flex min-h-screen justify-center items-center flex-col">
        <h1 className="text-2xl">Tu cita ha sido creada con exito</h1>
        <Link to={"/"}>
          <Button colorScheme="teal" className="mt-4">
            Volver al inicio
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      {props.isLoading ? (
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
                    onChange={props.handleSwitchChange}
                  />
                  {/* migrante */}
                  <InputSwitch
                    name="migrante"
                    text="Persona migrante"
                    onChange={props.handleSwitchChange}
                  />
                  {/* pueblos indigenas */}
                  <InputSwitch
                    name="comunidadadIndigena"
                    text="Pueblos y comunidades indigenas"
                    onChange={props.handleSwitchChange}
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
                  onChange={props.dateTimeFormOnChange}
                >
                  {/* date */}
                  <DayPicker
                    mode="single"
                    selected={props.selected}
                    onSelect={props.setSelected}
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
                  onChange={props.motivoCitaDataForm}
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
                  onChange={props.psiquiatraDataForm}
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
                      onChange={props.handleTermsOnChange}
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
                      onChange={props.handleTermsOnChange}
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
                    <AlertTitle>{props.alertMessage.title}</AlertTitle>
                    <AlertDescription>
                      {props.alertMessage.text}
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
