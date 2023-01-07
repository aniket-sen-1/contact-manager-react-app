import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const AddAndRemoveButton = ({
  actionType,
  disableAndLoading,
  handleSubmit,
}) => {
  return (
    <button className="add-button" type="submit" onClick={handleSubmit}>
      {disableAndLoading ? <ClipLoader color="#36d7b7" size={18} /> : null}
      {actionType} Contact
    </button>
  );
};

export default AddAndRemoveButton;
