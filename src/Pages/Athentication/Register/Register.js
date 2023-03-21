import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/UserContext';
// import { AuthContext } from '../../Context/UserContext';

const Register = () => {


    const { signUp, setuserProfile } = useContext(AuthContext)
    const [error, setError] = useState('')

    const location = useLocation();
    const frome = location.state?.from?.pathname || '/';

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
      
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);
      
        if (password.length < 6) {
            setError('Please should be at least 6 characters.');
            return;
        }
        
        setError('');
        signUp(email, password)
            .then(result => {
                const user = result.user;
                form.reset()
                handleUserProfile(name)
                setTimeout(() => {
                    navigate(frome, { replace: true })

                }, 300);
                toast.success('Register SuccessFully')
                console.log("🚀 ~ file: RegisterPage.js ~ line 21 ~ handleSubmit ~ user", user)
            })
            .catch(error => {
                console.log('error', error);
                setError(error.message)
            })




    }


    const handleUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        console.log(profile);
        setuserProfile(profile)
            .then((result) => { console.log(result.user); })
            .catch(error => console.log(error))
    }

    return (
        <div className='flex justify-center py-4 px-4 md:py-10'>
            <div className="w-full max-w-md mt-4 md:mt-20 p-8 space-y-3 rounded bg-gray-900 border border-blue-600 shadow-2xl text-gray-100">
                <h1 className="text-2xl font-bold text-blue-600 text-center">Register</h1>
                <form onSubmit={handleSubmit} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="name" className="block text-gray-100 font-semibold">Full Name</label>
                        <input type="text" name="name" id="name" placeholder="Full name" className="w-full px-4 py-3 rounded border-gray-700 bg-blue-100 text-gray-900 focus:border-violet-400" />
                    </div>
                  
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-gray-100 font-semibold">Email</label>
                        <input type="text" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded border-gray-700 bg-blue-100 text-gray-900 focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-gray-100 font-semibold">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded border-gray-700 bg-blue-100 text-gray-900 focus:border-violet-400" />
                        <div className="flex justify-end text-xs text-gray-400">

                        </div>
                        <div>
                            <p className="text-red-500">{error}</p>
                        </div>
                    </div>
                    <button type='submit' className="block w-full p-3 text-center rounded font-semibold text-gray-50 bg-blue-600">Sign Up</button>
                </form>

                <p className="text-xs text-center sm:px-6 text-gray-400">Already have an account?
                    <Link rel="noopener noreferrer" to="/auht/login" className="underline text-gray-100">Sign IN</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;