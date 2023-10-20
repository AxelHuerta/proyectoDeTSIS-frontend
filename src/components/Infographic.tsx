import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 * genera una infografia
 * @component
 */
export default function Infographic() {
  return (
    <Card>
      <CardHeader>
        {/* titulo */}
        <Heading size="md">Lorem ipsum</Heading>
      </CardHeader>
      {/* cuerpo */}
      <CardBody>
        <Text className="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, tamen
          permagna. Ullus investigandi veri, nisi inveneris, et quaerendi
          defatigatio turpis est, cum esset accusata et vituperata ab Hortensio.
        </Text>
        <Text>
          Qui liber cum et mortem contemnit, qua qui est imbutus quietus esse
          numquam potest. Praeterea bona praeterita grata recordatione renovata
          delectant. Est autem situm in nobis ut et voluptates et dolores.
        </Text>
      </CardBody>
      <CardFooter>
        {/* link a la infografia */}
        <Link to={"/article1"}>
          <Button>Consultar información</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
