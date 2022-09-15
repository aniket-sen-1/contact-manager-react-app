import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import profileImg from "../images/profileDetail.png";
import { CgProfile } from "react-icons/cg";
import { FaEnvelope, FaArrowLeft, FaTrashAlt } from "react-icons/fa";

const DeleteContact = (props) => {
  const location = useLocation();
  const { id, name, email } = location.state.contact;
  //   console.log(id, name, email);
  console.log(location);
  console.log(props);
  return (
    <>
      <div className="contact-detail">
        <img src={profileImg} className="detail-image" />

        <div className="detail-info ">
          <div className="detail-info-name">
            <CgProfile className="detail-logo" />
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
          <div className="detail-info-email">
            <FaEnvelope className="detail-logo" />
            {email}
          </div>
          <div className="confirm-delete">
            <div className="confirm-delete-heading">
              <h2>ARE YOU SURE ?</h2>
            </div>
            <div className="yes-no">
              <div className="yes-delete ">
                <Link to="/" className="Link">
                  <button
                    onClick={() => props.handleRemoveContact(id)}
                    className="yes-no-button"
                  >
                    Delete
                  </button>
                </Link>
              </div>
              <div className="no-delete yes-no-button">
                <Link to="/" className="Link">
                  <button className="yes-no-button">Cancel</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-goto-list">
          <Link to="/" className="goto-list-icon">
            <FaArrowLeft />
          </Link>
        </div>
      </div>
    </>
  );
};

export default DeleteContact;
