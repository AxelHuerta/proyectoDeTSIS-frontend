import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useUserData } from "../store/Store";

type menuOption = {
  text: string;
  link: string;
};

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

  // menu options
  const menuOptions: menuOption[] = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Psicoeducación",
      link: "/",
    },
    {
      text: "Solicitar Servicio",
      link: "/",
    },
  ];

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
    <nav className="bg-teal-500 flex justify-between p-5 top-0 fixed w-full z-50">
      <span className="font-bold text-xl flex items-center text-white">
        Departamento de Psiquiatría
      </span>
      <div className="justify-center items-center hidden lg:flex">
        {/* menu area */}
        <ul className="flex items-center text-white">
          {menuOptions.map((option) => {
            return (
              <Link to={option.link}>
                <li className="mx-5">{option.text}</li>
              </Link>
            );
          })}
        </ul>

        {/* login area */}
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
      {/* menu responsive area */}
      <div className="lg:hidden">
        <Menu>
          <MenuButton
            as={IconButton}
            colorScheme="rgba(0,0,0,0)"
            icon={<HamburgerIcon className="font-bold text-2xl" />}
          />
          <MenuList className="w-full">
            {menuOptions.map((option) => {
              return (
                <Link to={option.link}>
                  <MenuItem>{option.text}</MenuItem>
                </Link>
              );
            })}
            <MenuItem className="text-center">
              <Link to={`/login`}>
                <Button colorScheme="white" variant="outline">
                  Iniciar Sesión
                </Button>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}
