import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import profileImg from "../images/profileDetail.png";
import profileImgFemale from "../images/profileDetailFemale.png";
import { CgProfile } from "react-icons/cg";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import profileImage from "../images/profileDemo.png";

const ContactsDetail = () => {
  const location = useLocation();
  const { id, name, email, gender } = location.state.contact;
  console.log(id, name, email);
  return (
    <>
      <div className="contact-detail">
        <img
          src={
            gender === "male"
              ? profileImg
              : gender === "female"
              ? profileImgFemale
              : profileImage
          }
          className="detail-image"
        />

        <div className="detail-info">
          <div className="detail-info-name">
            <CgProfile className="detail-logo" />
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
          <div className="detail-info-email">
            <FaEnvelope className="detail-logo" />
            {email}
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

export default ContactsDetail;
