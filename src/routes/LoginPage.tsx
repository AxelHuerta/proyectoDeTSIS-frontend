import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div>
        <h2 className="pt-52 text-2xl font-bold text-center">
          Bienvenida y bienvenido al sistema de Servicios Psicológicos
        </h2>
        <h3 className="text-xl font-bold text-center">
          Ingrese según su perfil
        </h3>
        <div className="text-center m-5">
          <Link to={"/login/student"}>
            <Button colorScheme="teal" variant="outline" className="m-5">
              Alumno
            </Button>
          </Link>
          <Link to={"/login/psychiatrist"}>
            <Button colorScheme="teal" variant="outline" className="m-5">
              Psiquiatra
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
