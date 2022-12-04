import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
const ContactList = (props) => {
  const { contacts, handleRemoveContact } = props;
  const renderContactList = contacts.map((contact) => (
    <ContactCard
      contact={contact}
      handleRemoveContact={handleRemoveContact}
      key={contact.id}
    />
  ));
  function getKeys(event) {
    props.handleSearch(event.target.value);
  }
  return (
    <>
      <div className="list-header container-body">
        <h2 className="list-heading">Contacts List</h2>
        <Link to="/addcontact">
          <button className="add-contact ">Add Contacts</button>
        </Link>
      </div>
      <div className="search-bar container-body">
        <input
          className="input list-input"
          placeholder="Search Contact"
          value={props.search}
          onChange={getKeys}
        ></input>
      </div>
      <div className="contactList container-body">
        {renderContactList.length > 0 ? renderContactList : "No Results"}
      </div>
    </>
  );
};

export default ContactList;
