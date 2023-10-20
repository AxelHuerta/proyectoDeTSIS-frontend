import { FormLabel, Switch } from "@chakra-ui/react";

type Props = {
  name: string;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * switch de un formulario
 * @component
 */
export default function InputSwitch(props: Props) {
  return (
    <div className="flex justify-between  w-full my-4 px-4">
      <FormLabel htmlFor={props.name} mb="0">
        {props.text}
      </FormLabel>
      <Switch
        id={props.name}
        size="lg"
        colorScheme="teal"
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}
