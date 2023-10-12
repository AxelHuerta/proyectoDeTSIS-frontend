import { useState, ChangeEvent } from "react";
import "react-day-picker/dist/style.css";
import ServicesPresentational from "./ServicesPresentational";

export default function ServicesContainer() {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date("01/01/2000"),
  );

  // form info
  const [identificationData, setIdentificationData] = useState({
    discapacidad: false,
    migrante: false,
    comunidadIndigena: false,
  });

  const [timeForm, setTimeForm] = useState("");
  const [motivoCitaForm, setMotivoCitaForm] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    text: "",
  });

  const [termsForm, setTermsForm] = useState({
    shareData: false,
    truthful: false,
  });

  // isLoading varible
  const [isLoading, setIsLoading] = useState(true);

  // psiquiatra
  const [psiquiatra, setPsiquiatra] = useState("");

  // save input data
  const dateTimeFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <ServicesPresentational
      selected={selected}
      setSelected={setSelected}
      identificationData={identificationData}
      setIdentificationData={setIdentificationData}
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
      alertMessage={alertMessage}
      setAlertMessagge={setAlertMessage}
    />
  );
}
