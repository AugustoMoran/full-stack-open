import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUsers } from '../actions/usersActions'
import userService from '../services/userService'

// Ejercicio 7.20-7.21: User List con Tailwind CSS

const UserList = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getUsers()
        dispatch(setUsers(fetchedUsers))
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [dispatch])

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">👥 Users Directory</h2>

      {users.length === 0 ? (
        <div className="bg-blue-50 border-l-4 border-blue-300 p-6 rounded">
          <p className="text-blue-700">No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">User</th>
                <th className="px-6 py-3 text-center font-semibold">Blogs Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, idx) => (
                <tr 
                  key={user.id} 
                  className={`hover:bg-gray-50 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-4">
                    <Link 
                      to={`/users/${user.id}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-2"
                    >
                      👤 {user.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                      {user.blogs.length}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserList
