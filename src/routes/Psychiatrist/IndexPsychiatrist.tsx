import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";

function IndexPsychiatrist() {
  return (
    <div>
      <Navbar />
      <div className="pt-32 max-w-[1080px] mx-auto">
        <h1 className="text-2xl font-bold text-center">
          Portal de Servicios Psicológicos Integrados
        </h1>
        <p>
          El{" "}
          <span className="font-bold">
            Portal de Servicios Psicológicos Integrados
          </span>
          es una herramienta que el departamento de psiquiatría pone a
          disposición de las y los psicologos para facilitar su labor cotidiana.
        </p>
        <p className="mt-5">
          El objetivo del portal es: Lorem ipsum dolor sit amet, officia
          excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem
          pariatur mollit ex esse exercitation amet. Nisi anim cupidatat
          excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est
          aliquip amet voluptate voluptate dolor minim nulla est proident.
          Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt
          ex occaecat reprehenderit commodo officia dolor Lorem duis laboris
          cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi
          laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit
          commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint
          cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        </p>
        {/* tools */}
        <h2 className="text-2xl font-bold my-10 text-center">
          Esta herrmaiente permite
        </h2>
        <div className="bg-teal-400 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          <Card>
            <CardHeader>
              <Heading size="sm">Tener control de los pacientes</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>Consultar información</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="sm">Visualizar citas por calendario</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>Consultar información</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="sm">Visualizar percentil por gráficas</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>Consultar información</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default IndexPsychiatrist;
