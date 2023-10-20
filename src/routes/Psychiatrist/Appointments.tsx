import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import BTableCita from "../../components/BTableCita";

/**
 * muestra el listado de citas
 * @component
 */
export default function Appointments() {
  const titles = ["ID cita", "Fecha", "Hora"];
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [status, setStatus] = useState<number>(0);

  /**
   * hace la peticion de todas las citas
   */
  const getAppointments = async () => {
    await axios.get("http://localhost:8080/api/citas").then((res) => {
      setAppointments(res.data);
      setStatus(res.status);
      setIsloading(false);
    });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-32">
        <h1 className="text-2xl font-bold text-center">Listado de citas</h1>
        <Table
          titles={titles}
          child={
            <BTableCita
              citaList={appointments}
              isLoading={isLoading}
              status={status}
            />
          }
        ></Table>
      </div>
    </>
  );
}
