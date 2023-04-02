import React, { useState } from "react";
import PasswordInput from "./components/PasswordInput";
import "./index.css";
import Modal from "./components/Modal";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const handleSuccess = () => {
    setShowModal(true);
  };
  const handleFail = () => {
    setShowFail(true);
  };

  return (
    <div className='App'>
      <Modal
        color='bg-blue-500'
        text='Prawidłowe hasło'
        open={showModal}
        onClose={() => setShowModal(false)}
      />
      <Modal
        color='bg-red-500'
        text='Nieprawidłowe hasło'
        open={showFail}
        onClose={() => setShowFail(false)}
      />
      <PasswordInput
        password='dlugosc-h'
        onSuccess={handleSuccess}
        onFail={handleFail}
      />
    </div>
  );
};

export default App;
