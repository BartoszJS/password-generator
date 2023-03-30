import React, { useState } from "react";
import PasswordInput from "./components/PasswordInput";
import "./index.css";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleSuccess = () => {
    setShowModal(true);
  };

  return (
    <div className='App'>
      {showModal && (
        <div className='absolute w-full h-full z-10 bg-black/40 flex justify-center items-center'>
          <div className='w-[300px] h-[100px] text-xl bg-white rounded flex flex-col justify-center items-center'>
            Prawidłowe hasło
            <button
              className='bg-blue-500 rounded mt-1 text-l py-1 cursor-pointer px-2'
              onClick={() => setShowModal(!showModal)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <PasswordInput password='dlugosc-h' onSuccess={handleSuccess} />
    </div>
  );
};

export default App;
