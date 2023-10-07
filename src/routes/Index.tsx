import Navbar from "../components/Navbar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
  Image,
} from "@chakra-ui/react";
import Carousel from "../components/Carousel";

export default function Index() {
  return (
    <>
      <Navbar />
      {/* slider */}
      <Carousel />
      {/* infografias */}
      <div className="m-20">
        <h1 className="text-2xl uppercase font-bold text-center my-5">
          Infografías
        </h1>
        <div className="grid grid-cols-3 gap-10 m-10">
          <Card>
            <CardHeader>
              <Heading size="md">Lorem ipsum</Heading>
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
              <Heading size="md">Dolor sit amet</Heading>
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
              <Heading size="md">Qui minim labore</Heading>
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

      {/* el otro */}
      <div className="grid grid-cols-2 gap-10 bg-gray-300 p-20">
        <div className="m-auto">
          <h2 className="text-2xl font-bold mb-5">Atención Clínica</h2>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            quos, commodi modi vel asperiores dolore quia est consequuntur
            exercitationem voluptates pariatur debitis dolorum soluta deleniti,
            explicabo ea, aliquid inventore quidem.
          </p>
          <Button>Consultar información</Button>
        </div>
        <div className="flex justify-center">
          <Image src="https://images.pexels.com/photos/6712704/pexels-photo-6712704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>
      </div>
    </>
  );
}
