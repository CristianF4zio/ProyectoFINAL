import { Card, CardHeader, CardBody, Button,Image } from '@nextui-org/react';
import React, { ReactElement } from 'react';
import Group from '../Class/Group';

 // Importa los componentes necesarios


interface Props {
  grupo: Group; // Ajusta el tipo según tu estructura de datos
  handleGoProfileGroup: (grupo: Group) => void;
  handleAfiliacion: (grupo: Group) => void;
}

export function GroupCard ({ grupo, handleGoProfileGroup, handleAfiliacion }: Props): ReactElement {
  return (
    <li key={grupo.id}>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
          <h4 className="font-bold text-large cursor-pointer" onClick={() => handleGoProfileGroup(grupo)}>{grupo.getName()}</h4>
          <small className="text-default-500">{grupo.getTopic().getName()}</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2 mt-2 ">
          <div className="flex-col justify-between items-center ">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={grupo.getIcon()}
              width={270}
            />
            <br />
            <Button
              color="primary"
              onClick={() => handleAfiliacion(grupo)}
            >Afiliar</Button>
          </div>
        </CardBody>
      </Card>
    </li>
  );
};

export default GroupCard;
