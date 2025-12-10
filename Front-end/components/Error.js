const Error = ({ message }) => {
  return (
    <div className="error">
      <div className="outer-box">
        <div className="modal-box">
          <span className="cross-error" onClick={() => message()}>
            {" "}
            ✖
          </span>
          <span>⚠️ Unable to Fetch data</span>
        </div>
      </div>
    </div>
  );
};

export default Error;
