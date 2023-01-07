import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ContactsDetail from "./components/ContactsDetail";
import DeleteContact from "./components/DeleteContact";
import demoData from "./data/demoData";
function App() {
  const key = "contacts";
  const localData = JSON.parse(localStorage.getItem(key));
  const [contacts, setContacts] = useState(localData ? localData : demoData);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      {
        id: uuidv4(),
        ...newContact,
      },
    ]);
  };

  const RemoveContact = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const editContact = (editedContact) => {
    const editedContactList = contacts.map((contact) => {
      if (contact.id === editedContact.id) {
        return {
          // id: contact.id,
          ...contact,
          name: editedContact.name,
          email: editedContact.email,
          gender: editedContact.gender,
        };
      } else {
        return contact;
      }
    });
    setContacts(editedContactList);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(contacts));
  }, [contacts]);

  const handleSearch = (search) => {
    setSearch(search);
    if (search !== "") {
      const newSearchResult = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(newSearchResult);
    }
  };
  console.log("parent rendered");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route
            index
            element={
              <ContactList
                contacts={search ? searchResult : contacts}
                handleRemoveContact={RemoveContact}
                search={search}
                handleSearch={handleSearch}
              />
            }
          />
          <Route
            path="/addcontact"
            element={
              <AddContact
                handleAddContact={handleAddContact}
                handleEditContact={editContact}
              />
            }
          />
          <Route
            path="/editcontact"
            element={
              <AddContact
                handleAddContact={handleAddContact}
                handleEditContact={editContact}
              />
            }
          />
          <Route path="/contactdetail" element={<ContactsDetail />} />
          <Route
            path="/deletecontact"
            element={<DeleteContact handleRemoveContact={RemoveContact} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
