import { useState } from "react";
import { nanoid } from 'nanoid'
import css from './ContactForm.module.css'

export const ContactForm = ({addContact}) => {

  const [contactData, setContactData] = useState({
    name: '',
    number: ''
  })

  function inputChange({ target: { value, name } }) {      
    
    setContactData((prev) => {
      const newContactData = {
        name: prev.name,
        number: prev.number
      }
      newContactData[name] = value;      
      return newContactData
    })
  }
  
  function handelSubmit (e)  {
        e.preventDefault()  
     
        const contactObj = {
            name: contactData.name,
            number: contactData.number,
            id: nanoid()
        }
        addContact(contactObj)
}

return (
          <form className={css.form } onSubmit={handelSubmit}>
            <label className={css.label }>
                Name<br/>
              <input
                className={css.input }
                type="text"
                name="name"
                onChange={inputChange}
                value={contactData.name}
                required />
          </label>
          <label className={css.label }>
            Number<br/>
              <input
              className={css.input }
              type="tel"
              name="number"
              onChange={inputChange}
              value={contactData.number}
              required />
          </label >
            <button className={css.button } type="submit">Add contact</button>
      </form>  )

}


    
