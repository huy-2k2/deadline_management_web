import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import { useUser } from '../contexts/UserContext'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
import StudentManager from '../components/StudentManager'
export default function Student() {
  useAuth()
  const [page, setPage] = useState('home')

  return (
    <div>
      <Header></Header>
      <div className='flex items-stretch justify-start'>
        <div className='w-[250px] flex-shrink-0'>
          <Sidebar page={page} setPage={setPage}></Sidebar>
        </div>
        <div className='flex-grow px-3 py-10 overflow-x-auto'>
          {
            page == 'home'? <Home></Home>: <StudentManager></StudentManager>
          }
        </div>
      </div>
    </div>
  )
}
