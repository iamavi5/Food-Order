import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    postalCode: true,
    street: true,
    city: true,
  });
  const isEmpty = (value) => {
    return value.trim() === "";
  };
//   const isNotSixChars = (value) => {
//     value = value.trim();
//     return value.length() !== 6;
//   };
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const nameInput = nameInputRef.current.value.toString();
    const streetInput = streetInputRef.current.value.toString();
    const postalInput = postalInputRef.current.value.toString();
    const cityInput = cityInputRef.current.value.toString();

    const enteredNameIsValid = !isEmpty(nameInput);
    const enteredStreetIsValid = !isEmpty(streetInput);
    const enteredPostalIsValid = !isEmpty(postalInput);
    const enteredCityIsValid = !isEmpty(cityInput);


    setFormInputValidity({
        name: enteredNameIsValid,
        postalCode: enteredPostalIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
      });
      
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    
    if (!formIsValid) {
      return
    }
    props.onConfirm({
        name: nameInput,
        street: streetInput,
        postalCode: postalInput,
        city : cityInput
    });
  };
  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">You Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid Street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid Postal Code!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
