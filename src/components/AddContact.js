import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const AddContact = ({ handleAddContact, handleEditContact }) => {
  const { state } = useLocation();
  const [userDetail, setUserDetail] = useState(
    state
      ? { ...state.contact }
      : {
          name: "",
          email: "",
          gender: "",
        }
  );
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  console.log(useLocation());
  let api = `https://api.genderize.io?name=${
    userDetail.name.trim().split(" ")[0]
  }`;

  const fetchGender = () => {
    (async function () {
      const response = await fetch(api).then((res) => res.json());
      setGender(response.gender);
    })();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userDetail.name.trim() === "" || userDetail.email.trim() === "") {
      alert("all the fields are mendetory");
      return;
    }
    if (state) {
      handleEditContact({
        ...userDetail,
        gender: gender === null ? "unknown" : gender,
      });
    } else {
      handleAddContact({
        ...userDetail,
        gender: gender === null ? "unknown" : gender,
      });
    }

    setUserDetail({ name: "", email: "" });
    navigate("/");
  };

  return (
    <div className="addContact container-body">
      <form className="form" onSubmit={handleSubmit}>
        {state ? (
          <h1 className="add-heading">Edit Contact</h1>
        ) : (
          <h1 className="edit-heading">Add Contact</h1>
        )}
        <hr />
        <div className="input-group">
          <label>Name</label>
          <input
            className="input name-input"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={userDetail.name}
            onChange={handleChange}
            onBlur={fetchGender}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            className="input name-input"
            type="text"
            name="email"
            placeholder="Enter Your Email"
            value={userDetail.email}
            onChange={handleChange}
            onBlur={fetchGender}
          />
        </div>
        {state ? (
          <button className="add-button" onClick={fetchGender}>
            Edit Contact
          </button>
        ) : (
          <button className="add-button">Add Contact</button>
        )}
        <Link to="/">
          <button className=" add-goto-list">Go to List</button>
        </Link>
      </form>
    </div>
  );
};

export default AddContact;
