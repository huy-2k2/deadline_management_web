import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Home from '../components/Home'
import Sidebar from '../components/Sidebar'
import TeacherManager from '../components/TeacherManager'
import useAuth from '../hooks/useAuth'

export default function Teacher() {
  useAuth()
  const [page, setPage] = useState('home')
  return (
    <div>
    <Header></Header>
    <div className='flex items-stretch justify-start'>
      <div className='w-[250px] flex-shrink-0'>
        <Sidebar page={page} setPage={setPage}></Sidebar>
      </div>
        <div className='flex-grow'>
          {
            page == 'home'? <Home></Home>: <TeacherManager></TeacherManager>
          }
        </div>
      </div>
  </div>
  )
}
