import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import useAuth from '../hooks/useAuth'
import useClick from '../hooks/useClick'

export default function Header() {
  const [user, setUser] = useUser()
  const [isDrop, refParentDrop, refChildDrop] = useClick()
  function handleSignout() {
    setUser(null)
  }
  return (
    <div className='flex items-center justify-start shadow-md px-4 py-2'>
      <Link className='h-[76px]' to='/'>
        <img className='max-h-full' src="/images/logo.png" alt="" />
      </Link>
      <h2 className='text-[#27703A] uppercase text-2xl ml-5 font-serif hidden md:block'>CỔNG THÔNG TIN ĐÀO TẠO ĐẠI HỌC</h2>
      {user && 
      <div className='text-white ml-auto cursor-pointer relative'>
        <p ref={refParentDrop} className='px-3 py-2 bg-green-500 flex items-center'>
          <span className='hidden md:block'>Chào mừng {user.name} </span>
          <span className='w-4 ml-1 mt-1'>
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144 144-144"/></svg>          </span>
        </p>
        <ul ref={refChildDrop} className={`${isDrop? 'block' : 'hidden'} text-black absolute z-10 w-max top-[calc(100%+5px)] right-0 border border-gray-300 shadow-md bg-white`}>
          <li className='flex items-center gap-x-2 px-4 py-2 border-b hover:bg-gray-200'> 
            <span className='w-4'>
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>
            </span>
            cập nhật tài khoản</li>
          <li onClick={handleSignout} className='flex items-center gap-x-2 px-4 py-2 hover:bg-gray-200'> 
            <span className='w-4'>
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
            </span>
            đăng xuất</li>
        </ul>
      </div>
      }
    </div>
  )
}
