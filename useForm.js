import { useState } from "react";

export const useForm = ( initialForm = {} ) => {
  // hook mantener el estado.
  const [formState, setFormState] = useState(initialForm);
    
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    
    setFormState({
      ...formState, // spread operator: mantener todo lo que ya existia.
      [name]: value, // actualizar el valor del input.
    });
    };  
  const onResetForm = () => {
    setFormState(initialForm);
  };
    
    return {
        ...formState, // esto es para desestructurar.
        formState,
        onInputChange,
        onResetForm
  }
}
