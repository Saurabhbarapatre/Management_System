import { useState } from "react";
import Update from "./Update";

const List = ({ res, Show }) => {
  const [update, setupdate] = useState(false);

  const handleDelete = async () => {
    const Item = await fetch(`http://localhost:3000/Incoming/${res.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (Item.ok) {
      Show();
    }
  };

  return (
    <div className="row">
      <div className="cell ">{res.name}</div>
      <div className="cell ">{res.age}</div>
      <div className="cell ">{res.City}</div>
      <div className="cell">
        <button className="del" onClick={handleDelete}>
          Delete
        </button>
        {"   "}
        <button className="del" onClick={() => setupdate(true)}>
          Update
        </button>
        {update && <Update down={() => setupdate(false)} prop={res} />}
      </div>
    </div>
  );
};

export default List;
