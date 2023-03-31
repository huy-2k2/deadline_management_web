import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

export default function Sidebar({page, setPage}) {
    const [user] = useUser()

  return (
    <ul className='w-full border border-gray-300 min-h-[calc(100vh-90px)] h-full shadow-lg'>
        <li className='cursor-pointer' onClick={() => setPage('home')} >
            <div className={`${page == 'home' ? 'text-green-500' : 'text-gray-500'} flex gap-x-4 px-3 py-2 border-b border-b-gray-300`}>
                <span className='w-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                </span>
                <span className='text-black'>Trang chủ</span>
            </div>
        </li>
        <li className='cursor-pointer' onClick={() => setPage('management')}>
            <div className={`${page == 'management' ? 'text-green-500' : 'text-gray-500'} flex gap-x-4 px-3 py-2 border-b border-b-gray-300`}>
                <span className='w-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="64" y="176" width="384" height="256" rx="28.87" ry="28.87" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M144 80h224M112 128h288"/></svg>
                </span>
                <span className='text-black'>Quản lý</span>
            </div>
        </li>
    </ul>
  )
}
