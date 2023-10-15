import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import BTableCita from "../../components/BTableCita";

export default function Appointments() {
  const titles = ["ID cita", "Fecha", "Hora"];
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    await axios.get("http://localhost:8080/api/citas").then((res) => {
      console.log(res.data);
      setAppointments(res.data);
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
          child={<BTableCita citaList={appointments} />}
        ></Table>
      </div>
    </>
  );
}
