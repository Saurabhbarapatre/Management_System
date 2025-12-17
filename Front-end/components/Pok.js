import { useRouteError } from "react-router-dom";

const Pok = ({ onClose }) => {
  const err = useRouteError();

  return (
    <div className="error-box">
      <div className="outer-box">
        <div className="modal-box">
          <span className="cross-error" onClick={() => onClose()}>
            {" "}
            ✖
          </span>
          <span>⚠️ Unable to Fetch data</span>
        </div>
      </div>
    </div>
  );
};

export default Pok;
