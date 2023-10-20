import { ReactNode } from "react";

type Props = {
  titles: string[];
  child: ReactNode;
};

/**
 * tabla y cabecera de la tabla
 * @component
 */
export default function Table(props: Props) {
  return (
    <div className="w-[90%] max-w-[1080px] mx-auto mt-4">
      <ul className="bg-teal-600 text-white font-bold rounded-md py-2 text-center hidden sm:grid grid-cols-3">
        {props.titles.map((title) => {
          return <li key={title}>{title}</li>;
        })}
      </ul>
      {/* cuerpo de la tabla */}
      {props.child}
    </div>
  );
}
