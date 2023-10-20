import { Spinner } from "@chakra-ui/react";
import Navbar from "./Navbar";

type Props = {
  text: string;
};

/**
 * pagina de carga
 * @component
 */
export default function Loading(props: Props) {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen justify-center items-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
        <p>{props.text}</p>
      </div>
    </>
  );
}
