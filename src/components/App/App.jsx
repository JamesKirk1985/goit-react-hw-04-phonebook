import { useState, useEffect } from "react";
import { ContactForm } from "../PhoneBook/ContactForm/ContactForm";
import { Filter } from "../PhoneBook/Filter/Filter";
import { ContactList } from "../PhoneBook/ContactList/ContactList";
import css from './App.module.css'

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);  
  const [filterKey, setFilterKey] = useState('')
  

  useEffect(() => {
    const storageContact = localStorage.getItem('contacts')   
    if (storageContact && storageContact.length>0) 
    {setContacts( JSON.parse(storageContact) )} 
  }, [])

  useEffect(() => {         
  localStorage.setItem("contacts", JSON.stringify(contacts))    
  },[contacts])
  
  function addContact (contactObj) {     
    setContacts((prev) => {    
          if (prev.some(({ name }) => (contactObj.name.trim() === name.trim()))) {
      alert(`${contactObj.name.trim()} is already in contacts`)
      return
      }  
      return [...prev, contactObj]
    })     
  }

  function filterAdd (searchName) {
    setFilterKey(searchName)    
  } 
  
  function filterFunction(filterKey) {    
       let filterContact = contacts.filter((item) => (
       item.name.toLowerCase().includes(filterKey.toLowerCase())))
    return filterContact
    }

  function deleteContact (contactId) {
    setContacts((prev) => {
      return contacts.filter((item) => (item.id !== contactId))
      }) 
  }
  
    return (    
      <div>
        <ContactForm addContact={addContact} />
        
        <h2 className={css.title}>Contacts</h2>  
        <Filter filterAdd={filterAdd} />
        
        <ContactList          
          contactsList={contacts}
          filterContact={filterFunction(filterKey)}
          deleteContact={deleteContact}           
        />                  
      </div>
    )
    
}
  
