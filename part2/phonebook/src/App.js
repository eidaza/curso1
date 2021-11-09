import React, { useState, useReducer, useEffect  } from 'react'
import PersonForm from './components/PersonForm'
import Find from './components/Find'
import PersonNumbers from './components/PersonNumbers'
import phoneService from './services/phone'
import Notification from './components/Notification'

const App = () => {
const [ persons, setPersons ] = useState([]) 
const [ newName, setNewName ] = useState('')
const [ newPhone, setNewPhone ] = useState('')
const [filterInput, setFilterInput] = useReducer(
  (state, newState) => ({ ...state, ...newState }),
  {
    name: "",
    number: ""    
  }
);
const [message, setMessage] = useState(null)
const [tipCol,SetTipCol] = useState(null)

/*
import axios from 'axios'
useEffect(() => {
  console.log('effect')
  axios
    .get('http://192.168.57.125:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}, [])
*/
useEffect(() => {
  phoneService
  .getAll()
  .then(initialPhones => {
    setPersons(initialPhones)
  })
  .catch(error => {
    SetTipCol (null)
    setMessage(
      `No conection to server`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  })   
}, [])

const handleFilterNames = event => {
  const { name, value } = event.target;
  setFilterInput({ [name]: value });
};
const filterNames = list => {
  return list.filter(item => {
    return (
      item.name.toLowerCase().includes(filterInput.name.toLowerCase()) &&
      item.number
        .toLowerCase()       
    );
  });
};
const namesList = filterNames(persons);

const addName = (event) => {
  event.preventDefault();
  const nameObject ={
    name : newName, 
    number : newPhone     
  }
  const permod = persons.map(x => (x.name))

  if (permod.includes(newName)) {
    /*window.alert(`${newName} is already added to phonebook`);    */
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
      const phnBkCh = persons.find(n => n.name === newName)
      var id = phnBkCh.id
      const changeNumb = persons.map(x =>(x.id !== id? x : nameObject))      
      phoneService
      .update(id, nameObject)
        .then(() => {
        setPersons(changeNumb)        
      })
      .catch(error => {
        SetTipCol (null)
        setMessage(`Error update ${newName} from server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      SetTipCol (`ok`)
      setMessage(`Update ${newName} to server`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)      
      setNewName('')
      setNewPhone('')
          
    }
  } else {
  /*setPersons(Object.values(persons).concat(nameObject))            */  
    phoneService
      .create(nameObject)
        .then(returnedName => {
        setPersons(persons.concat(returnedName))
      })     
      .catch(error => {
        SetTipCol (null)
        setMessage(`Error add ${newName} from server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      SetTipCol(`ok`)
      setMessage(`Add ${newName} to server`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)     
      setNewName('')
      setNewPhone('')    
  }   
}
 
const handlePersonChange = (event) => {     
  setNewName(event.target.value)
}

const handlePhoneChange = (event) => {     
  setNewPhone(event.target.value)
}

const delPersBook = (id) => {
  var perSH = persons.find(n => n.id === id)
  if (window.confirm(`Do you really want delete ${perSH.name} ?`)) {
     phoneService
    .deletePhone(id)
    .then(setPersons(persons.filter(n => n.id !== id)))
    .catch(error => {
      SetTipCol (null)
      setMessage(
        `${perSH.name} was already deleted from server`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)     
      setPersons(persons.filter(n => n.id !== id))
    })
    SetTipCol(`ok`)    
    setMessage(`${perSH.name} was deleted from server`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)    
  }
} 

return (
    
    <div> 
      <h1>Phonebook</h1> 
      <Notification message={message} tipmsg = {tipCol}/>     
        {< Find searchValue = {filterInput} handleChangeValue ={handleFilterNames}/>}
      <h3>Add a new</h3>
        {<
          PersonForm action ={addName} handle={handlePersonChange} value= {newName} 
          hanPho ={handlePhoneChange}  valuePhon = {newPhone}        
        />}               
      <h3>Numbers</h3>
        {/*{namesList.map (x=> 
          <PersonNumbers key={x.name} name= {x.name} number= {x.number} />
        )}*/}
        {namesList.map (x=> 
          <PersonNumbers key={x.name} name= {x.name} number= {x.number} 
          delPersBook = {() => delPersBook(x.id)}
          />
        )}
    </div>
  )
}

export default App