import Navbar from "../components/Navbar";
import { Button, Image } from "@chakra-ui/react";
import Carousel from "../components/Carousel";
import Infographic from "../components/Infographic";

/**
 * muestra el index
 * @component
 */
export default function Index() {
  return (
    <>
      <Navbar />
      {/* slider */}
      <Carousel />
      {/* infografias */}
      <div className="mx-0 md:px-10 py-40 bg-[#f0f7f7]">
        <h1 className="text-2xl uppercase font-bold text-center">
          Infografías
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-10">
          <Infographic />
          <Infographic />
          <Infographic />
        </div>
      </div>

      {/* atencion clinica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-300 p-20">
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
        <div className="hidden lg:flex justify-center">
          <Image
            src="https://images.pexels.com/photos/6712704/pexels-photo-6712704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="hidden md:block max-w-lg"
          />
        </div>
      </div>
    </>
  );
}
