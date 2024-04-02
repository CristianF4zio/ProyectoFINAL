import { Input } from "@nextui-org/react";
import { useState } from "react";
import { deleteTopic } from "./autent";

export default function deleteTopicInput() {
    const [topicIdDelete, setTopicIdDelete]= useState('');
    const handleAcctionDe = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        deleteTopic(topicIdDelete)
        console.log(topicIdDelete);
        console.log("Eliminar Topico");
      }
    return(
        <form className="card-body">
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            key="outside"
            type="text"
            label="Name"
            labelPlacement="outside"
            placeholder="Enter their name"
            value={topicIdDelete}
            onChange={(ev) => setTopicIdDelete(ev.target.value)}
          />
        </div>
      
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleAcctionDe}>Eliminar Topico</button>
        </div>
      </form>
    )
}