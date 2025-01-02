import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {

    const dispatch = useDispatch()
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null)
    const [formData, setFormData] = useState({})
    const [updateSuccess, setUpdateSuccess] = useState(false)

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (data.success === false) {
                dispatch(updateUserFailure(data))
                return
            }
            dispatch(updateUserSuccess(data))
            setUpdateSuccess(true)
        }
        catch (error) {
            dispatch(updateUserFailure(error));
        }
    }

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE'
            })

            const data = await res.json()
            if (data.success === false) {
                dispatch(deleteUserFailure(data))
                return
            }
            dispatch(deleteUserSuccess(data))
        }
        catch (error) {
            dispatch(deleteUserFailure(error))
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-8'> Profile </h1>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

                <input type='file' ref={fileRef} hidden accept='image/*' />
                <img src={currentUser.profilePicture} alt='profile_Picture' onClick={() => fileRef.current.click()} onChange={handleChange} className='h-24 w-24 self-center rounded-full object-cover cursor-pointer' />
                <input type='text' defaultValue={currentUser.username} id='username' onChange={handleChange} placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
                <input type='email' defaultValue={currentUser.email} id='email' onChange={handleChange} placeholder='Email ID' className='bg-slate-100 rounded-lg p-3' />
                <input type='password' id='password' placeholder='Password' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' />
                <button className='bg-slate-700 text-white p-3 uppercase hover:opacity-85 disabled:opacity-80 rounded-lg'> {loading ? 'Loading...' : 'update'} </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}> Delete Account</span>
                <span className='text-red-700 cursor-pointer'> Sign out</span>
            </div>
            <p className='text-red-700 mt-5'> {error && 'something went wrong!'} </p>
            <p className='text-green-700 mt-5'> {updateSuccess && 'user details updated successfully'}</p>
        </div>
    )
}
