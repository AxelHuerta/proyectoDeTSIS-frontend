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
import { Link, useNavigate } from "react-router-dom";
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
    userType,
    setNombres,
    setApellidoPaterno,
    setApellidoMaterno,
    setId,
    setUserType,
    setIsAuth,
  } = useUserData((state) => state);

  const navigate = useNavigate();

  // TODO: psychiatrist links
  const menuOptions: menuOption[] = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: `${userType == "psychiatrist" ? "Pacientes" : "Psicoeducación"}`,
      link: `${userType == "psychiatrist" ? "/pacientes" : "/"}`,
    },
    {
      text: `${
        userType == "psychiatrist" ? "Calendario" : "Solicitar Servicio"
      }`,
      link: "/services",
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
    navigate("/");
  };

  return (
    <nav className="bg-teal-500 flex justify-between p-5 top-0 fixed w-full z-50">
      <span className="font-bold text-xl flex items-center text-white">
        Departamento de Psiquiatría
      </span>
      <div className="justify-center items-center hidden lg:flex">
        {/* menu area */}
        <ul className="flex items-center text-white">
          {menuOptions.map((option, index) => {
            return (
              <Link to={option.link} key={index}>
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
            {isAuth ? (
              <MenuItem className="font-bold hidden">
                {`¡Hola, ${nombres}!`}
              </MenuItem>
            ) : null}
            {menuOptions.map((option, index) => {
              return (
                <Link to={option.link} key={index}>
                  <MenuItem>{option.text}</MenuItem>
                </Link>
              );
            })}
            {isAuth ? (
              <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
            ) : (
              <MenuItem>
                <Link to={`/login`}>Iniciar Sesión</Link>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}
