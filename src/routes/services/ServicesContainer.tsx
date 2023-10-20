import { useState, ChangeEvent } from "react";
import "react-day-picker/dist/style.css";
import ServicesPresentational from "./ServicesPresentational";

/**
 * contiene la logica de la pagina de servicios
 * @component
 */
export default function ServicesContainer() {
  // variables de seleccion de la fecha
  const [selected, setSelected] = useState<Date | undefined>(
    new Date("01/01/2000"),
  );

  // identificacion con grupos
  const [identificationData, setIdentificationData] = useState({
    discapacidad: false,
    migrante: false,
    comunidadIndigena: false,
  });

  // hora
  const [timeForm, setTimeForm] = useState("");
  // motivo de la cita
  const [motivoCitaForm, setMotivoCitaForm] = useState("");

  // mensaje de alerta
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    text: "",
  });

  // terminos y servicios
  const [termsForm, setTermsForm] = useState({
    shareData: false,
    truthful: false,
  });

  // isLoading varible
  const [isLoading, setIsLoading] = useState(true);

  // psiquiatra
  const [psiquiatra, setPsiquiatra] = useState("");

  /**
   * guarda los cambios del input de fecha
   */
  const dateTimeFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeForm(e.target.value);
  };

  /**
   * guarda los cambios del input de motivo cita
   */
  const motivoCitaDataForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivoCitaForm(e.target.value);
  };

  /**
   * guarda los cambios del input del psiquiatra
   */
  const psiquiatraDataForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPsiquiatra(e.target.value);
  };

  /**
   * guarda los cambios del input de grupos
   */
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setIdentificationData({
      ...identificationData,
      [name]: checked,
    });
  };

  /**
   * guarda los cambios del input de terminos y servicios
   */
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
