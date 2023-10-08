import { FormLabel, Switch } from "@chakra-ui/react";

type Props = {
  name: string;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputSwitch(props: Props) {
  return (
    <div className="flex justify-between md:justify-normal w-full my-4">
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
