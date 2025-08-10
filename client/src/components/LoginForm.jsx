import { useState } from "react"
import { useNavigate } from "react-router-dom";

const LoginForm = ({onLogin}) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState(' ');
    const navigate = useNavigate();

    const handleLogin =  async  (event) => {

        event.preventDefault();

        try {
            
            await onLogin({username, password});
            navigate('/home');

        }

        catch(error) {
            console.log(`Error logging in`, error);
        }

    }

    return (

            <form className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow"
                onSubmit={handleLogin}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div>
                    <label className="block mb-1 font-medium text-gray-700"> Username </label>
                    <input
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-300"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>

                <div className="mb-2">
                    <label className="block mb-1 font-medium text-gray-700"> Password </label>
                    <input 
                        className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        type="password"
                    />
                </div>

                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>

    );
}

export default LoginForm;