import React, { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/UserContext';

const UserPage = () => {
    const { user, forgetPass, setuserProfile, } = useContext(AuthContext)
    const [editprofile, seteditProfile] = useState(false)
    
    const handleUserProfile = (event) => {
        event.preventDefault()
        const name = event.target.name.value;
            const profile = {
                displayName: name,
                photoURL:user?.photoURL
        }
        setuserProfile(profile)
            .then(() => {
            toast.success('Updated Please to make the change or Reload the page')
            })
            .then(err => {
            console.log(err)
        })
    }

    const handleforgetpass = () => {
        forgetPass(user?.email)
            .then(() => {
                toast.success('Password Reset Email Sent!')
            })
            .then(err => {
                console.log(err)
            })
    }
    return (
        <section className='px-0 md:px-10'>
            <div className='mx-4 transition-all my-4 md:mx-10'>
                <p className='text-xl font-semibold text-white my-2'>Profile</p>
                <img src={user?.photoURL} alt="" />

                {
                    editprofile ?
                        <div className='flex my-2 transition-all items-center gap-2'>
                            <form onSubmit={handleUserProfile}>
                                <input name='name' className='py-1 text-gray-600 rounded' type="text" />
                                <button className='px-4 ml-2 py-1 bg-white hover:cursor-pointer  font-semibold text-gray-800 mt-2 rounded'>Save</button>


                            </form>
                            <button onClick={()=>seteditProfile(!editprofile)} className='px-4 py-1 bg-white hover:cursor-pointer  font-semibold text-gray-800 mt-2 rounded'>X</button>
                        </div>
                        :
                        <>
                            <div className='flex transition-all items-center gap-3 text-white'>
                                <h1 className='text-xl my-2 font-semibold text-white'>{user.displayName}</h1>
                                <span onClick={() => seteditProfile(!editprofile)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>

                                </span>
                            </div>
                        </>
                }


                <p>{user.email}</p>
                <p onClick={handleforgetpass} className='px-4 py-1 bg-white hover:cursor-pointer w-40 font-semibold text-gray-800 mt-2 rounded'>
                    Change Password
                </p>
            </div>
        </section>
    );
};

export default UserPage;