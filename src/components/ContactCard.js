import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

const ContactCard = (props) => {
  const { id, name, email, gender } = props.contact;

  let profilePic = "";
  if (gender === "male") {
    profilePic = <FcBusinessman className="profile-image" />;
  } else if (gender === "female") {
    profilePic = <FcBusinesswoman className="profile-image" />;
  } else {
    profilePic = <CgProfile className="profile-image" />;
  }

  return (
    <div key={id} className="item">
      <i>{profilePic}</i>

      <div className="detail">
        <Link
          to={`/contactdetail/${id}`}
          state={{ contact: props.contact }}
          className="Link"
        >
          <p className="name">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
          <p className="email">{email.toLowerCase()}</p>
        </Link>
      </div>

      <div className="edit-contact">
        <Link
          to={`/editcontact/${id}`}
          state={{ contact: props.contact }}
          className="Link"
        >
          <i>
            <FaUserEdit />
          </i>
        </Link>
      </div>
      <div className="delete-contact">
        <Link
          to={`/deletecontact/${id}`}
          state={{ contact: props.contact }}
          className="Link"
        >
          <i>
            <FaTrashAlt />
          </i>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
