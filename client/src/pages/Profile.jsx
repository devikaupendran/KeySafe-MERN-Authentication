import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {

    const { currentUser } = useSelector((state) => state.user)
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'> Profile </h1>
            <form className='flex flex-col gap-4'>
                <img src={currentUser.profilePicture} alt='profile_Picture' className='h-24 w-24 self-center rounded-full object-cover cursor-pointer'/>
                <input type='text' defaultValue={currentUser.username} id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3'/>
                <input type='email' defaultValue={currentUser.email} id='email' placeholder='Email ID' className='bg-slate-100 rounded-lg p-3' />
                <input type='password' id='password' placeholder='Password' className='bg-slate-100 p-3 rounded-lg'/>
                <button className='bg-slate-700 text-white p-3 uppercase hover:opacity-85 disabled:opacity-80 rounded-lg'> update </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'> Delete Account</span>
                <span className='text-red-700 cursor-pointer'> Sign out</span>
            </div>
        </div>
    )
}
