"use client";
import { useState } from "react";
import Welcome from "../components/Welcome";

const Register = () => {
  const [step, setStep] = useState(1);
  return <div>{step == 1 ? <Welcome nextStep={setStep} /> : <Register />}</div>;
};

export default Register;
