import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useUserData } from "../store/Store";

export default function NavbarPsychiatrist() {
  // localhost variables
  const {
    nombres,
    apellidoPaterno,
    setIsAuth,
    setNombres,
    setApellidoPaterno,
    setApellidoMaterno,
    setId,
    setUserType,
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
    <nav className="bg-teal-500 flex justify-around p-5 fixed w-full z-50">
      <span className="font-bold text-xl flex items-center text-white">
        Departamento de Psiquiatría
      </span>
      <div className="flex">
        <ul className="flex items-center text-white">
          <li className="mx-5">Inicio</li>
          <li className="mx-5">Pacientes</li>
          <li className="mx-5">Calendario</li>
        </ul>
        <Menu>
          <MenuButton>
            <Avatar
              name={`${nombres} ${apellidoPaterno}`}
              src=""
              className="border border-black"
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}
