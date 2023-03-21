import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../Context/UserContext';
import { gettasks } from '../../Features/Tasks';

const Completed = () => {

    const { user } = useContext(AuthContext)
    const [undone, setundone] = useState([])
    const navigate = useNavigate()
    const [addComment, setComment] = useState('')
    const { data: tasks, loading } = useSelector((state) => state.tasks)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(gettasks(user.email));
    }, [dispatch, user.email]);


    useEffect(() => {

        const undoneTask = tasks?.filter(task => task.done)


        setundone(undoneTask)



    }, [tasks])

    const [open, setopen] = useState('')

    const addCommentOpenClose = (id) => {
        if (id === addComment) {
            setComment('')
        }
        else {

            setComment(id)
        }
    }

    const accordianOpenClose = (id) => {
        if (id === open) {
            setopen('')
        }
        else {

            setopen(id)
        }
    }

    const handledelete = (id) => {
        console.log(id);
        fetch(`https://task-manager-v2-server.vercel.app/task/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.error('Deleted')
                dispatch(gettasks(user.email));
            })
    }

    const handleunDone = (id) => {
        fetch(`https://task-manager-v2-server.vercel.app/notcompletetask/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                toast.success('Moved To Not Completed')
                navigate('/')
                // refetch()
            })

    }


    const handleAddComment = (e) => {
        e.preventDefault()
        const form = e.target
        const comment = form.comment.value;
        const updateDoc = {
            comment
        }
        fetch(`https://task-manager-v2-server.vercel.app/addComments/${addComment}`, {
            method: 'PUT',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(updateDoc)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Comment Added')
                accordianOpenClose(addComment)
                setComment('')
                dispatch(gettasks(user.email));

        })
        
    }



    if (loading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (

        <div className='px-0 md:px-4'>
            <h1 className='text-start font-semibold text-xl my-4 mx-2 md:mx-10 text-white'>Completed</h1>
            <div>


                <div className='w-full'>
                    {
                        undone?.length === 0 ?
                            <div className='flex justify-center items-center m-20'>
                                <p className='text-xl font-semibold'>
                                    You Dont Have Any Completed Task Left
                                </p>



                            </div>
                            :
                            <>

                                {
                                    undone?.map((task, i) =>
                                        <div key={task._id} id="accordion-collapse" className=' md:w-[500px] mx-2 md:mx-10 my-2 bg-gray-800 font-semibold rounded-md' data-accordion="collapse">
                                            {
                                                addComment === task._id && <>
                                                    <form onSubmit={handleAddComment} className='bg-gray-800 shadow-lg relative z-50 gap-x-2 pr-2 flex  items-center w-full rounded text-white  md:w-[500px]'>
                                                        <input required name='comment' defaultValue={task.comments} className='border-none w-full text-white  bg-gray-800 rounded-md font-semibold shadow-md' type="text" placeholder='Add a Comment' />
                                                        <button type='submit'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                            </svg>


                                                        </button>
                                                        <p onClick={() => setComment('')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>

                                                        </p>
                                                    </form>
                                                    <div className='w-full h-screen  opacity-40 bg-black z-40  fixed top-0 left-0' >

                                                    </div>
                                                </>
                                            }
                                            <h2 className='flex items-center px-2'>

                                                <span>{i + 1}.</span>
                                                <p onClick={() => accordianOpenClose(task._id)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500   dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 " data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                                    <span className='line-through text-white'>{task.title}</span>
                                                    <button className='flex items-center gap-4'>
                                                        <p onClick={() => addCommentOpenClose(task._id)}>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                            </svg>

                                                        </p>
                                                        <svg data-accordion-icon className={`w-6 h-6 shrink-0 transition-all ${open === task._id ? 'rotate-180' : ' rotate-360 '}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                </p>

                                            </h2>
                                            <div className={`${open === task._id ? '' : 'hidden'} bg-gray-800 transition-all duration-500   rounded-md  p-2 font-semibold`} aria-labelledby="accordion-collapse-heading-1">
                                                <img className='' src={task.image} alt="" />
                                                <p className='bg-gray-700 my-2 p-2 overflow-hidden text-white font-normal text-sm shadow-lg rounded-md '>
                                                    {
                                                        task.details
                                                    }
                                                </p>
                                                <span>Comments</span>

                                                <div className='w-full bg-gray-700  rounded-md'>
                                                    {
                                                        task?.comments ?
                                                            <>
                                                                <p className='p-2'>{ task?.comments}</p>
                                                            
                                                            </>
                                                            :
                                                            <>
                                                             <p className='text-center p-5'>No Comments Yet</p>
                                                            </>
                                                   }

                                                </div>
                                                <div className='flex justify-between items-center my-2'>
                                                    <button className='px-4 py-1 bg-red-600 text-white  rounded' onClick={() => handledelete(task._id)}>Delete</button>
                                                    <button className='px-4 py-1 bg-blue-600 text-white rounded' onClick={() => handleunDone(task._id)}>Not Completed</button>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                }
                            </>
                    }

                </div>
                <div>

                </div>
            </div>

        </div>
    );
};

export default Completed;