import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AddAndRemoveButton from "../utility/addAndRemoveButton";
import ClipLoader from "react-spinners/ClipLoader";
import { Formik, useFormik } from "formik";

const AddContact = ({ handleAddContact, handleEditContact }) => {
  const { state } = useLocation();
  const [disableAndLoading, setDisableAndLoading] = useState(false);
  const [dataGot, setDataGot] = useState(false);
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
  });

  // alert("hi");
  const navigate = useNavigate();
  // console.log(useLocation({...state.contact}));
  // console.log("=========>===>=>=>", { ...state.contact });
  useEffect(() => {
    // console.log("=========>===>=>=>", { ...state.contact });
    if (state) {
      setUserDetail({ ...state.contact });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisableAndLoading(true);
    let api = `https://api.genderize.io?name=${
      userDetail.name.trim().split(" ")[0]
    }`;

    const response = await fetch(api).then((res) => res.json());
    // setUserDetail((prevDetail) => ({
    //   ...prevDetail,
    //   fjdafjasdf: "djfafadf",
    // }));
    // alert(response.gender);
    // alert(JSON.stringify(userDetail));

    if (userDetail.name.trim() === "" || userDetail.email.trim() === "") {
      alert("all the fields are mendetory");
      return;
    }
    if (state) {
      handleEditContact({
        ...userDetail,
        gender: response.gender,
      });
      setDisableAndLoading(false);
      navigate("/");
    } else {
      handleAddContact({
        ...userDetail,
        gender: response.gender,
      });
      setDisableAndLoading(false);
      navigate("/");
    }
    setUserDetail({ name: "", email: "" });
  };

  return (
    <div className="addContact container-body">
      <form className="form">
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
          />
        </div>

        <AddAndRemoveButton
          actionType={state ? "Edit" : "Add"}
          disableAndLoading={disableAndLoading}
          handleSubmit={handleSubmit}
        />

        <Link to="/">
          <button className=" add-goto-list">Go to List</button>
        </Link>
      </form>
    </div>
  );
};

export default AddContact;
