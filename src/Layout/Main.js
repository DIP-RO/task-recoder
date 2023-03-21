import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import { AuthContext } from '../Context/UserContext';

const Main = () => {
    const [openMenu, setopenMenu] = useState(true)

    const { user, logOut } = useContext(AuthContext)

    return (
        <div>
            <Header></Header>
            <div className='   '>
                <div className={`h-screen absolute md:left-0 top-[63px] z-30 col-span-0 md:col-span-1 p-3 space-y-2 w-62  backdrop-blur-md ease-in duration-300 bg-white/10 text-gray-100 ${openMenu ? 'left-0' : 'left-[-400px]'} `}>
                    <div className="flex items-center p-2 space-x-4">
                        
                        <img src={user?.photoURL ? `${user.photoURL}`:'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt="" className="w-12 h-12 rounded-full bg-gray-500" />
                        <div>
                            <h2 className="text-lg font-semibold">{user.displayName}</h2>
                            <span className="flex items-center space-x-1">
                                <span rel="noopener noreferrer" href="/" className="text-xs hover:underline text-gray-400">{user.email}</span>
                            </span>
                        </div>
                    </div>
                    <div className="divide-y  divide-gray-700">
                        <ul className="pt-2 pb-4 space-y-3 font-semibold text-sm">
                            <li  onClick={() => setopenMenu(!openMenu)} className="bg-gray-800 my-2 text-gray-50">
                                <NavLink to='/'
                                    className={`flex items-center p-2 space-x-3 rounded-md `}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                    </svg>

                                    <span>My Task</span>
                                </NavLink>
                            </li>
                            <li  onClick={() => setopenMenu(!openMenu)} className="bg-gray-800  text-gray-50">
                                <NavLink to='/addtask' className="flex items-center p-2 space-x-3 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                    <span>Add Task</span>
                                </NavLink>
                            </li>
                            <li  onClick={() => setopenMenu(!openMenu)} className="bg-gray-800 text-gray-50">
                                <NavLink  to='/completed' className="flex items-center p-2 space-x-3 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                    </svg>

                                    <span>Completed Task</span>
                                </NavLink>
                            </li>



                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm">

                            <li  onClick={() => setopenMenu(!openMenu)}>
                                <Link to='/user' className="flex items-center p-2 space-x-3 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    <span>Details</span>
                                </Link>
                            </li>
                            <li >
                                <button onClick={logOut}>
                                    <Link className="flex items-center p-2 space-x-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>

                                        <span>Logout</span>
                                    </Link>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='ml-1 md:ml-60'>
                    <Outlet></Outlet>
                    <button
                        onClick={() => setopenMenu(!openMenu)}
                    >
                        <label className=" absolute top-20 right-5 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 transition-all ${openMenu ? 'rotate-180' : 'rotate-0'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>
                        </label>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Main;