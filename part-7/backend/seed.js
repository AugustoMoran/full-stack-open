import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

// Usuarios de prueba
const testUsers = [
  {
    name: 'Mluukkai',
    username: 'mluukkai',
    password: 'mluukkai'
  },
  {
    name: 'John Smith',
    username: 'jsmith',
    password: 'jsmith'
  },
  {
    name: 'Jane Developer',
    username: 'jane',
    password: 'jane123'
  }
]

const seedDB = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Limpiar usuarios existentes
    await User.deleteMany({})
    console.log('🗑️  Cleared existing users')

    // Crear nuevos usuarios
    for (const userData of testUsers) {
      const user = new User({
        name: userData.name,
        username: userData.username
      })
      await user.setPassword(userData.password)
      await user.save()
      console.log(`✅ Created user: ${userData.username}`)
    }

    console.log('\n📊 Database seeded successfully!')
    console.log('\n🔐 Test Credentials:')
    testUsers.forEach(u => {
      console.log(`  • ${u.username} / ${u.password}`)
    })

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

seedDB()
