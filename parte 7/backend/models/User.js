import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    minlength: 3,
    trim: true
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
}, { timestamps: true })

// Método para establecer password
userSchema.methods.setPassword = async function(password) {
  const saltRounds = 10
  this.passwordHash = await bcrypt.hash(password, saltRounds)
}

// Método para verificar password
userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash)
}

// Ocultar passwordHash en JSON
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash
    delete returnedObject.__v
  }
})

export default mongoose.model('User', userSchema)
