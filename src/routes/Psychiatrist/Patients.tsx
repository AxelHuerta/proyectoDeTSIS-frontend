import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import axios from "axios";
import BTableAlumno from "../../components/BTableAlumno";

export default function Patients() {
  const titles = ["Nombres", "Apellido Paterno", "Apellido Materno"];
  const [students, setStudents] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const getAlumnos = async () => {
    await axios.get("http://localhost:8080/api/alumnos").then((res) => {
      console.log(res.data);
      setStudents(res.data);
      setIsloading(false);
    });
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-32">
        <h1 className="text-2xl font-bold text-center">Listado de pacientes</h1>
        <Table
          titles={titles}
          child={<BTableAlumno alumnosList={students} isLoading={isLoading} />}
        ></Table>
      </div>
    </>
  );
}
