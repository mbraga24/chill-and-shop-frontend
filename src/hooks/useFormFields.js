import { useState } from "react";

export default initialState => {
  const [fields, setValues] = useState(initialState);
  
  return [
    fields,
    function(event) {
      setValues({
        ...fields,
        [event.target.name]: event.target.value
      });
    }
  ];
}