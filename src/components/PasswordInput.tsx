import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface Props {
  password: string;
  onSuccess: () => void;
}

const PasswordInput = ({ password, onSuccess }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [activeInputs, setActiveInputs] = useState<number[]>([]);
  const [inputValues, setInputValues] = useState<string[]>(
    Array(password.length).fill("")
  );
  const [passwordLength, setPasswordLength] = useState<number>(0);

  const url = `https://passwordinator.onrender.com/?len=${passwordLength}`;

  const fetchAPI = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGeneratedPassword(data.data);
        console.log(data.data);
      });
  };

  useEffect(() => {
    setPasswordLength(password.length);
    setInputValues(Array(password.length).fill(""));
    let min = 2;
    let max = password.length / 2;
    let range = max - min;
    const numActiveInputs = Math.floor(Math.random() * range + min);
    // const numActiveInputs = Math.max(Math.floor(password.length / 2), 2);

    const newActiveInputs: number[] = [];
    while (newActiveInputs.length < numActiveInputs) {
      const randInput = Math.floor(Math.random() * password.length);
      if (!newActiveInputs.includes(randInput)) {
        newActiveInputs.push(randInput);
      }
    }
    const sortedNumbers = newActiveInputs.slice().sort((a, b) => a - b);

    setActiveInputs(sortedNumbers);
  }, [password]);

  useEffect(() => {
    if (passwordLength != 0) {
      fetchAPI();
    }
  }, [passwordLength]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value && activeInputs.includes(index)) {
      const nextInputIndex = activeInputs.indexOf(index) + 1;
      if (nextInputIndex < activeInputs.length) {
        const nextInput = activeInputs[nextInputIndex];
        const nextInputElement = document.getElementById(`${nextInput}`);
        nextInputElement?.focus();
      }
    } else if (!value && activeInputs.includes(index)) {
      const prevInputIndex = activeInputs.indexOf(index) - 1;
      if (prevInputIndex >= 0) {
        const prevInput = activeInputs[prevInputIndex];
        const prevInputElement = document.getElementById(`${prevInput}`);
        prevInputElement?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredPassword = inputValues.join("");
    let flag = 0;
    for (let i = 0; i < activeInputs.length; i++) {
      if (generatedPassword[activeInputs[i]] === enteredPassword[i]) {
        flag = 1;
      } else {
        flag = 0;
      }
    }
    if (flag === 1) {
      onSuccess();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && (
        <div className='absolute w-full h-full z-10 bg-black/40 flex justify-center items-center'>
          <div className='w-[300px] h-[100px] text-xl bg-white text-red-500 rounded flex flex-col justify-center items-center'>
            Nieprawidłowe hasło
            <button
              className='bg-gray-500 rounded mt-1 text-white text-l py-1 cursor-pointer px-2'
              onClick={() => setShowModal(!showModal)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className='w-full h-[100vh] flex justify-center items-center border'>
        <div>
          <div className='flex flex-wrap justify-center items-center'>
            {inputValues.map((value, index) => {
              const isActive = activeInputs.includes(index);
              return (
                <React.Fragment key={index}>
                  <div className='sm:m-2 m-1 flex justify-center items-center flex-col'>
                    <input
                      className='w-6 h-8  m-0 text-xl pl-1 border disabled:bg-[#dcdcdc] disabled:cursor-default cursor-text'
                      type={showPassword ? "text" : "password"}
                      id={`${index}`}
                      value={value}
                      disabled={!isActive}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      maxLength={1}
                    />
                    <div className='text-xs font-thin text-gray-600'>
                      {index + 1}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {showPassword ? (
              <AiFillEyeInvisible
                className='ml-2 cursor-pointer text-2xl'
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiFillEye
                className='ml-2 cursor-pointer text-2xl'
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className='flex justify-center items-center'>
            <button
              className='m-5 bg-gray-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-600 duration-150'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
