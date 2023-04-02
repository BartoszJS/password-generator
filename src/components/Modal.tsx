interface Props {
  color: string;
  text: string;
  open: boolean;
  onClose: () => void;
}

const Modal = ({ color, text, open, onClose }: Props) => {
  if (!open) return null;
  return (
    <>
      <div className='absolute w-full h-full z-10 bg-black/40 flex justify-center items-center'>
        <div className='w-[300px] h-[100px] text-xl bg-white rounded flex flex-col justify-center items-center'>
          {text}
          <button
            className={`${color} rounded mt-1 text-l py-1 cursor-pointer px-2`}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
