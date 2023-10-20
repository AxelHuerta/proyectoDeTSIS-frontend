import React from "react";
import { useState } from "react";
import { useUserData } from "../store/Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChangeEvent } from "react";
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  FormControl,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

type Props = {
  loginType: string;
};

/**
 * componente para el inicio de sesion
 * @component
 */
export default function LoginInput(props: Props) {
  // visibilidad del password
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // datos del input
  const [formData, setFormData] = useState({
    id: "", // matricula o numero de trabajador
    password: "",
  });

  // mensajes de error sobre los inputs
  const [errorMesagge, setErrorMesagge] = useState("");
  const [showErrorMesagge, setShowErrorMesagge] = useState(false);

  // localhost variables
  const {
    setIsAuth,
    setId,
    setNombres,
    setApellidoPaterno,
    setApellidoMaterno,
    setUserType,
  } = useUserData((state) => state);

  // link to main page
  const navigate = useNavigate();

  /**
   * realiza el inicio de sesion
   */
  const login = async () => {
    axios
      // mocklab
      // .post("https://ko485.wiremockapi.cloud/api/psiquiatras/login")
      // stoplight
      // `https://virtserver.swaggerhub.com/RICARDOPONC932_1/ServiciosPsicologicos2/1.0.0/api/${
      //    loginType == "student" ? "alumnos" : "psiquiatras"
      .post(
        `http://localhost:8080/api/${
          props.loginType == "student" ? "alumnos" : "psiquiatras"
        }/login`,
        props.loginType == "student"
          ? {
              matricula: formData.id,
              password: formData.password,
            }
          : { numTrabajador: formData.id, password: formData.password },
      )
      .then((res) => {
        if (res.data.error) {
          console.log("Hay un error");
        }
        console.log(res.data);
        setId(
          props.loginType == "student"
            ? res.data.matricula
            : res.data.numTrabajador,
        );
        setNombres(res.data.nombres);
        setApellidoPaterno(res.data.apellidoPaterno);
        setApellidoMaterno(res.data.apellidoMaterno);
        setIsAuth(true);
        setUserType(props.loginType);
        navigate("/");
      })
      .catch((error) => {
        handlerErrorCodes(error.response.status);
      });
  };

  /**
   * manejar codigos d error
   */
  const handlerErrorCodes = async (error: number) => {
    // HTTP code 404
    if (error == 404) {
      setErrorMesagge(
        `No se encontro ${
          props.loginType == "student"
            ? "la matrícula"
            : "el número de trabajador"
        }`,
      );
      setShowErrorMesagge(true);
    } else if (error == 403) {
      console.log("La contraseña es incorrecta");
    } else {
      console.log("Error desconocido");
    }
  };

  /**
   * tomar los datos del formulario
   */
  const formOnClick = () => {
    if (formData.id == "" || formData.password == "") {
      setErrorMesagge("Los campos no deben de estar vacíos");
      setShowErrorMesagge(true);
      return;
    }
    login();
  };

  /**
   * guardar cambios del formulario
   */
  const formOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mx-6 md:mx-14 lg:mx-30 bg-base-100">
        {/* titulo */}
        <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
        <FormControl
          onChange={formOnChange}
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl p-5"
        >
          {/* input: matricula o numero de trabajador */}
          <Input
            id="id"
            placeholder={`${
              props.loginType == "student"
                ? "Matrícula del alumno"
                : "Número de trabajador"
            }`}
            className="my-5"
            name="id"
          />

          {/* input: password */}
          <InputGroup size="md">
            <Input
              id="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Contraseña"
              className="my-5"
              name="password"
            />
            <InputRightElement width="4.5rem" className="my-5">
              {/* boton: mostar u ocultar password */}
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* mensaje de error */}
          <Alert
            status="warning"
            style={{ display: `${showErrorMesagge ? "" : "none"}` }}
          >
            <AlertIcon />
            {errorMesagge}
          </Alert>
          {/* alertError */}
          <Button colorScheme="teal" onClick={formOnClick} className="mt-5">
            Iniciar Sesión
          </Button>
        </FormControl>
      </div>
    </>
  );
}
