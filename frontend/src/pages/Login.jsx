import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email,setEmail]= useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate() 

    const handleSubmit = async (e) =>{
        
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            if(response.data.success){
                alert("Successfully Login")
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin"){
                    navigate('/admin-dashboard')
                }else{
                    navigate('/employee-dashboard')
                }
            }
            console.log("LOGIN RESPONSE:", response.data);
        }catch(error){
            console.log("FULL ERROR:", error);
            console.log("RESPONSE:", error.response);

            if(error.response){
                setError(error.response.data.error || "Request failed");
            } else {
                setError("Server not reachable");
            }
        }
    }

  return (
    <div  className='flex flex-col items-center h-screen justify-center 
    bg-gradient-to-b from-teal-600 from-25% to-cyan-100 to-50% space-y-7' >
        <h2 className='text-3xl ' >Employee Management System</h2>

        <div className='border shadow p-6 w-90 bg-white'>
            <h2 className='flex flex-col items-center font-bold text-2xl' >Login</h2>
            {error && <p className='text-red-500' >{error}</p>}

            <form onSubmit={handleSubmit}>
                <div  className='mb-4' >
                    <label htmlFor="email" className='block etext-gray-700' >Email</label>
                    <input type='email' className='w-full px-3 py-2 border rounded-[10px]' placeholder='Enter email'
                    onChange={(e)=> setEmail(e.target.value) } required/>
                </div>
                <div  className='mb-4' >
                    <label htmlFor="password" className='block etext-gray-700' >Password</label>
                    <input type='password'className='w-full px-3 py-2 border rounded-[10px]' placeholder='########'
                    onChange={(e)=> setPassword(e.target.value) } required/>
                </div>
                <div className='mb-4 flex items-center justify-between' >
                    <label className='inline-flex items-center'>
                        <input type="checkbox" className='form-checkbox' />
                        <span className='ml-2 text-gray-700' >Remeber me</span>
                    </label>
                    <a href="#" className='text-teal-600'>Forgot Password ?</a>
                </div>
                <div className='mb-4' >
                    <button type='submit' className='w-full bg-teal-600 text-whilte py-2' >Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
