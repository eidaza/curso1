const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.set('runValidators', true)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'User name required and lenght >= 3'],
    unique: true 
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, 'User phone number required, and lenght >=8 ']
  },  
})

personSchema.plugin(uniqueValidator);

personSchema.pre('findByIdAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)