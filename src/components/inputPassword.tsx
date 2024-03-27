import { Input } from "@nextui-org/react";
import React from "react";

export default function InputPassword() {
    const [isVisible, setIsVisible] = React.useState(false);
  
    const toggleVisibility = () => setIsVisible(!isVisible);
  
    return (
      <Input
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? "Hide" : "Show"}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />
    );
  }
  