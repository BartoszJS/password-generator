import React, { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface Props {
  password: string;
  onSuccess: () => void;
  onFail: () => void;
}

const PasswordInput = ({ password, onSuccess, onFail }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [activeInputs, setActiveInputs] = useState<number[]>([]);
  const [inputValues, setInputValues] = useState<string[]>(
    Array(password.length).fill("")
  );

  const url = `https://passwordinator.onrender.com/?len=${password.length}`;

  const fetchPassword = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data: { data: string }) => {
        setGeneratedPassword(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setInputValues(Array(password.length).fill(""));

    const min = 2;
    const max = password.length / 2;
    const range = max - min;
    const numActiveInputs = Math.floor(Math.random() * range + min);

    const newActiveInputs: number[] = [];
    while (newActiveInputs.length < numActiveInputs) {
      const randInput = Math.floor(Math.random() * password.length);
      if (!newActiveInputs.includes(randInput)) {
        newActiveInputs.push(randInput);
      }
    }
    //const sortedNumbers = newActiveInputs.slice().sort((a, b) => a - b);
    const sortedNumbers = [...newActiveInputs].sort();

    setActiveInputs(sortedNumbers);
  }, [password]);

  useEffect(() => {
    return () => fetchPassword();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (activeInputs.includes(index)) {
      if (value) {
        const nextInputIndex = activeInputs.indexOf(index) + 1;
        if (nextInputIndex < activeInputs.length) {
          const nextInput = activeInputs[nextInputIndex];
          const nextInputElement = document.getElementById(`${nextInput}`);
          nextInputElement?.focus();
        }
      } else if (!value) {
        const prevInputIndex = activeInputs.indexOf(index) - 1;
        if (prevInputIndex >= 0) {
          const prevInput = activeInputs[prevInputIndex];
          const prevInputElement = document.getElementById(`${prevInput}`);
          prevInputElement?.focus();
        }
      }
    }
  };

  const handleSubmit = () => {
    const enteredPassword = inputValues.join("");
    let flag = false;
    for (let i = 0; i < activeInputs.length; i++) {
      if (generatedPassword[activeInputs[i]] === enteredPassword[i]) {
        flag = true;
      } else {
        flag = false;
      }
    }
    if (flag === true) {
      onSuccess();
    } else {
      onFail();
    }
  };

  return (
    <>
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
