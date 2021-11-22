const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phonenumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.9gu2m.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,  
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
const person = new Person({
    name: name,
    number: phonenumber,    
})
person.save().then(result => {
  console.log(`added ${name} number ${phonenumber} to phonebook`)
  mongoose.connection.close()
})
}else  {  
          Person.find({}).then(result => {
          result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
        })
}