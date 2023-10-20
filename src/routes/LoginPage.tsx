import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

/**
 * muestra la pagina de acceso al login dependiendo de si el usuario es alumno o psiquiatra
 * @component
 */
export default function LoginPage() {
  const btnStyles = "btn hover:bg-teal-700 bg-teal-800 text-white mx-2";

  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">
              Bienvenida y bienvenido al sistema de Servicios Psicológicos
            </h1>
            <p className="py-6">Ingrese según su perfil</p>
            <Link to="/login/student">
              <button className={btnStyles}>Alumno</button>
            </Link>
            <Link to="/login/psychiatrist">
              <button className={btnStyles}>Psiquiatra</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
