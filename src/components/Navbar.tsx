import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useUserData } from "../store/Store";

export default function Navbar() {
  // localhost
  const {
    isAuth,
    nombres,
    apellidoPaterno,
    setNombres,
    setApellidoPaterno,
    setApellidoMaterno,
    setId,
    setUserType,
    setIsAuth,
  } = useUserData((state) => state);

  // logout
  const logout = () => {
    setIsAuth(false);
    setNombres("");
    setApellidoPaterno("");
    setApellidoMaterno("");
    setId("");
    setUserType("");
  };

  return (
    <nav className="bg-teal-500 flex justify-between p-5 fixed w-full z-50">
      <span className="font-bold text-xl flex items-center text-white">
        Departamento de Psiquiatría
      </span>
      <div className="flex justify-center items-center">
        <ul className="flex items-center text-white">
          <Link to={`/`}>
            <li className="mx-5">Inicio</li>
          </Link>
          <li className="mx-5">Psicoeducación</li>
          <li className="mx-5">Solicitar Servicio</li>
        </ul>
        {!isAuth ? (
          <Link to={`/login`}>
            <Button
              colorScheme="white"
              variant="outline"
              className="text-white"
            >
              Iniciar Sesión
            </Button>
          </Link>
        ) : (
          <Menu>
            <span className="text-white pr-5">{`¡Hola, ${nombres}!`}</span>
            <MenuButton>
              <div>
                <Avatar
                  name={`${nombres} ${apellidoPaterno}`}
                  src=""
                  className="border border-black"
                />
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
    </nav>
  );
}
