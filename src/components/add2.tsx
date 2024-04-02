import { Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { uploadTopic } from "./autent";

export default function AddTopicInput()  {
const [nameTopic, setnameTopic] = useState('');
const [descriptionTopic, setDescriptionTopic] = useState('');
const handleAcctionAd2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(nameTopic);
    console.log(descriptionTopic);
    console.log("Agregar Topico");
    uploadTopic(nameTopic, descriptionTopic)
  };
    return(
        <form className="card-body">
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            key="outside"
            type="text"
            label="Name"
            labelPlacement="outside"
            placeholder="Enter their name"
            value={nameTopic}
            onChange={(ev) => setnameTopic(ev.target.value)}
          />
        </div>

        <div>
          <Textarea
            isRequired
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="max-w-xs"
            value={descriptionTopic}
            onChange={(ev) => setDescriptionTopic(ev.target.value)}
          />
        </div>

      
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleAcctionAd2}>Agregar Topico</button>
        </div>
      </form>
    )
}
