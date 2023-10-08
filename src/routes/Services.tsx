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
} from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Services() {
  const [selected, setSelected] = useState<Date>();

  const [identificationData, setIdentificationData] = useState({
    discapacidad: false,
    migrante: false,
    pueblosIndigenas: false,
  });
  const [dateForm, setDateForm] = useState("");
  const [timeForm, setTimeForm] = useState("");

  // save input data
  const dateTimeFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selected) {
      setDateForm(format(selected, "PP"));
    }
    setTimeForm(e.target.value);
    // TODO: delete this
    console.log(timeForm);
    console.log(selected ? format(selected, "PP") : "no");
  };

  // switch button values
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setIdentificationData({
      ...identificationData,
      [name]: checked,
    });

    // TODO: delete this
    console.log(identificationData);
  };

  return (
    <>
      <Navbar />
      <div className="mt-28 text-center mx-4">
        <h1 className="text-2xl font-bold">Solicitar Cita</h1>
        <span>La atención psícologica es completamente gratuita</span>
      </div>
      {/* form */}
      <Card className="my-4">
        <CardBody>
          <Text>¿Se identifica con alguno de los siguientes grupos?</Text>
          <FormControl alignItems="center" className="mt-8 flex flex-col">
            {/* discapacidad */}
            <div className="flex justify-between w-full my-4">
              <FormLabel htmlFor="discapacidad" mb="0">
                Persona con discapacidad
              </FormLabel>
              <Switch
                id="discapacidad"
                size="lg"
                colorScheme="teal"
                name="discapacidad"
                onChange={handleSwitchChange}
              />
            </div>
            {/* migrante */}
            <div className="flex justify-between w-full my-4">
              <FormLabel htmlFor="migrante" mb="0">
                Persona migrante
              </FormLabel>
              <Switch
                id="migrante"
                size="lg"
                colorScheme="teal"
                name="migrante"
                onChange={handleSwitchChange}
              />
            </div>
            {/* pueblos indigenas */}
            <div className="flex justify-between w-full my-4">
              <FormLabel htmlFor="pueblosIndigenas" mb="0">
                Pueblos y comunidades indigenas
              </FormLabel>
              <Switch
                id="pueblosIndigenas"
                size="lg"
                colorScheme="teal"
                name="pueblosIndigenas"
                onChange={handleSwitchChange}
              />
            </div>
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
            <Select placeholder="Selecciona una hora" id="time" name="time">
              <option value="9:00">9:00 am</option>
              <option value="10:00">10:00 am</option>
              <option value="11:00">11:00 am</option>
              <option value="12:00">12:00 am</option>
              <option value="13:00">1:00 pm</option>
              <option value="14:00">2:00 pm</option>
              <option value="15:00">3:00 pm</option>
              <option value="16:00">4:00 pm</option>
            </Select>
          </FormControl>
        </CardBody>
      </Card>
      {/* terminos y servicios */}
      <Card className="my-4">
        <CardBody>
          <Text>
            Para poderte brindar la orientación solicitada, es necesario activar
            las siguientes casillas
          </Text>
          <FormControl alignItems="center" className="mt-8 flex flex-col">
            <div className="flex justify-between items-center w-full my-4">
              <FormLabel htmlFor="discapacidad" mb="0">
                Autorizo compartir mis datos de contacto con la autoridad
                academica
              </FormLabel>
              <Switch id="discapacidad" size="lg" colorScheme="teal" />
            </div>
            <div className="flex justify-between items-center w-full my-4">
              <FormLabel htmlFor="discapacidad" mb="0">
                Bajo la protesta de decir la verdad, manifiesto que la
                información proporcionada es verídica
              </FormLabel>
              <Switch id="discapacidad" size="lg" colorScheme="teal" />
            </div>
          </FormControl>
        </CardBody>
      </Card>
      <div className="text-center my-5">
        <Button colorScheme="teal">Registar solicitud</Button>
      </div>
    </>
  );
}
