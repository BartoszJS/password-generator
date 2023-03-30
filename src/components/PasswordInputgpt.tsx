import React, { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  password: string;
  onSuccess: () => void;
}

const PasswordInput = ({ password, onSuccess }: Props) => {
  const [activeInputs, setActiveInputs] = useState<number[]>([]);
  const [inputValues, setInputValues] = useState<string[]>(
    Array(password.length).fill("")
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const numActiveInputs = Math.max(Math.floor(password.length / 2), 2);
    const newActiveInputs: number[] = [];
    while (newActiveInputs.length < numActiveInputs) {
      const randInput = Math.floor(Math.random() * password.length);
      if (!newActiveInputs.includes(randInput)) {
        newActiveInputs.push(randInput);
      }
    }
    setActiveInputs(newActiveInputs);
  }, [password]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value && activeInputs.includes(index)) {
      const nextInputIndex = activeInputs.indexOf(index) + 1;
      if (nextInputIndex < activeInputs.length) {
        const nextInput = activeInputs[nextInputIndex];
        const nextInputElement = document.getElementById(`input-${nextInput}`);
        nextInputElement?.focus();
      }
    } else if (!value && activeInputs.includes(index)) {
      const prevInputIndex = activeInputs.indexOf(index) - 1;
      if (prevInputIndex >= 0) {
        const prevInput = activeInputs[prevInputIndex];
        const prevInputElement = document.getElementById(`input-${prevInput}`);
        prevInputElement?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredPassword = inputValues
      .filter((value, index) => activeInputs.includes(index))
      .join("");
    if (enteredPassword === password) {
      onSuccess();
    } else {
      alert("Incorrect password.");
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const generatePassword = async () => {
    try {
      const response = await axios.get(
        "https://passwordinator.onrender.com/generate"
      );
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={generatePassword}>Generate Password</button>
      <br />
      {inputValues.map((value, index) => {
        const isActive = activeInputs.includes(index);
        return (
          <React.Fragment key={index}>
            <input
              type={showPassword ? "text" : "password"}
              id={`input-${index}`}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              disabled={!isActive}
              maxLength={1}
              className='w-4'
            />
            {index === password.length - 1 ? (
              <br />
            ) : (
              <span style={{ margin: "0 5px" }}>A</span>
            )}
          </React.Fragment>
        );
      })}
      <br />
      <label>
        <input
          type='checkbox'
          checked={showPassword}
          onChange={handleShowPasswordToggle}
        />
        Show Password
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PasswordInput;
