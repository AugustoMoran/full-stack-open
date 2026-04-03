import { useState } from 'react'

// Ejercicio 7.20-7.21: LoginForm con Tailwind CSS

const LoginForm = ({ onLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		onLogin({ username, password })
		setPassword('')
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="card w-full max-w-md p-8">
				<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
					📚 Welcome to BlogHub
				</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Username Field */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Username
						</label>
						<input
							type="text"
							value={username}
							onChange={handleUsernameChange}
							placeholder="Enter your username"
							className="input-field"
						/>
					</div>

					{/* Password Field */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={handlePasswordChange}
							placeholder="Enter your password"
							className="input-field"
						/>
					</div>

					{/* Submit Button */}
					<button 
						type="submit" 
						className="w-full btn-primary bg-blue-600 hover:bg-blue-700"
					>
						Login
					</button>
				</form>

				<p className="text-center text-sm text-gray-500 mt-6">
					Demo: Use mluukkai/mluukkai or jsmith/jsmith
				</p>
			</div>
		</div>
	)
}

export default LoginForm
