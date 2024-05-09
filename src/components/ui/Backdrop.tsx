import ReactDOM from "react-dom";

interface BackdropProps {
  onClick: () => void;
}

const Backdrop = ({ onClick }: BackdropProps) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-30 z-30 "
      onClick={onClick}
    ></div>,
    document.getElementById("backdrop-hook") as HTMLElement
  );
};

export default Backdrop;
