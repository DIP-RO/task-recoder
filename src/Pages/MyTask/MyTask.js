import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import { AuthContext } from "../../Context/UserContext";
import { gettasks } from "../../Features/Tasks";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const [undone, setundone] = useState([]);
  const navigate = useNavigate();
  const [open, setopen] = useState("");
  const [edittask, setEdittask] = useState("");
  const imgHostKey = process.env.REACT_APP_imgbbKey;
  const [animation, setanimation] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImg, setPreviewImg] = useState(undefined);

  const { data: tasks, loading } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettasks(user.email));
  }, [dispatch, user.email]);

  useEffect(() => {
    const undoneTask = tasks.filter((task) => !task.done);
    setundone(undoneTask);
  }, [tasks]);

  // IMAGE uPLOAD
  useEffect(() => {
    if (fileList?.target?.files[0]) {
      const filesize = fileList?.target?.files.item(0).size;
      const filemb = filesize / 1024;
      if (filemb > 500) {
        toast.error("Please Upload a photo under 500kb");
      } else {
        const image = fileList?.target?.files[0];
        console.log(image);
        setanimation(true);
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            console.log(imgData);
            setPreviewImg(imgData?.data?.url);
            setanimation(false);
            // setSave(true)
          });
      }
    }
  }, [fileList?.target?.files, imgHostKey]);

  const accordianOpenClose = (id) => {
    if (id === open) {
      setopen("");
    } else {
      setopen(id);
    }
  };

  const handledelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.error("Deleted");

        dispatch(gettasks(user.email));
      });
  };

  const handleDone = (id) => {
    fetch(`http://localhost:5000/donetask/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toast.success("Great");
        navigate("/completed");
        // refetch()
      });
  };

  const handleEditOpen = (id) => {
    if (id === edittask) {
      setEdittask("");
    } else {
      setEdittask(id);
    }
  };

  const handleEditsave = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const details = form?.details?.value;
    const image = previewImg;
    const updateDoc = {
      title,
      details,
      image,
    };
    fetch(`http://localhost:5000/edittask/${edittask}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateDoc),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setEdittask("");
      });
  };

  if (loading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  return (
    <section className=" px-0 md:px-10">
      <h1 className="text-start font-semibold text-xl my-4 mx-4 md:mx-10 text-white">
        My Task
      </h1>
      <div>
        <div>
          {undone?.length === 0 ? (
            <div className="flex justify-center items-center m-20">
              <p className="text-xl font-semibold">
                You Dont Have Any Task Left
              </p>
            </div>
          ) : (
            <>
              {undone?.map((task, i) => (
                <form
                  onSubmit={handleEditsave}
                  key={task._id}
                  id="accordion-collapse"
                  className=" md:w-[500px] mx-4 md:mx-10 my-2 bg-gray-900 font-semibold rounded-md"
                  data-accordion="collapse"
                >
                  <h2 className="flex items-center px-2">
                    <span>{i + 1}.</span>
                    <p
                      onClick={() => accordianOpenClose(task._id)}
                      type="button"
                      className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500   dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 "
                      data-accordion-target="#accordion-collapse-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-collapse-body-1"
                    >
                      {edittask === task._id ? (
                        <>
                          <input
                            name="title"
                            type="text"
                            className="text-gray-800 py-1 rounded overflow-hidden"
                            defaultValue={task.title}
                          />
                        </>
                      ) : (
                        <>
                          <span className="text-white">{task.title}</span>
                        </>
                      )}
                    </p>

                    {edittask === task._id ? (
                      <></>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditOpen(task._id)}
                          className="text-white px-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                        <p
                          onClick={() => handleDone(task._id)}
                          className="px-4 hover:cursor-pointer  ml-2 py-1 rounded text-gray-800 bg-white  "
                        >
                          Completed
                        </p>
                      </>
                    )}
                  </h2>
                  <div
                    className={`${
                      open === task._id ? "" : "hidden"
                    } bg-gray-800  rounded-md ease-in duration-300 p-2 font-semibold`}
                    aria-labelledby="accordion-collapse-heading-1"
                  >
                    {animation ? (
                      <div className="w-full h-24 bg-gray-700 animate-pulse"></div>
                    ) : (
                      <>
                        {previewImg ? (
                          <>
                            <img src={previewImg} alt="" />
                          </>
                        ) : (
                          <>
                            <img src={task.image} alt="" />
                          </>
                        )}
                      </>
                    )}

                    {edittask === task._id ? (
                      <>
                        <div className="relative py-2">
                          <button className="text-gray-100 px-2 py-1 bg-gray-900 rounded">
                            Edit Image
                          </button>
                          <input
                            onChange={setFileList}
                            className="left-0 opacity-0 absolute top-0 w-full bg-red-400"
                            type="file"
                          />
                        </div>

                        <textarea
                          name="details"
                          type="text"
                          className="text-gray-800 block my-2 w-full md:w-full"
                          defaultValue={task.details}
                        />
                      </>
                    ) : (
                      <>
                        <p className="bg-gray-700 my-2 p-2 w-full text-white font-normal text-sm shadow-lg rounded-md ">
                          {task.details}
                        </p>
                      </>
                    )}

                    <div>
                      {edittask === task._id ? (
                        <>
                          <div className="flex justify-between item-center">
                            <button
                              type="submit"
                              className="px-4  py-1 rounded text-gray-800 bg-white  "
                            >
                              Save
                            </button>
                            <button
                              onClick={() => handleEditOpen(task._id)}
                              className="px-4 ml-2 py-1 rounded text-gray-800 bg-white  "
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p
                            className="px-4 py-1 w-20  hover:cursor-pointer bg-red-600 text-white"
                            onClick={() => handledelete(task._id)}
                          >
                            Delete
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyTask;
