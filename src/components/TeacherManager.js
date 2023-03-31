import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config'
import { useUser } from '../contexts/UserContext'
import TManager from './TManager'

export default function TeacherManager() {
    const [user] = useUser()
    const [classDetail, setclassDetail] = useState(null);
    const [classes, setClasses] = useState([])
    useEffect(() => {
        if(!classDetail) {
            axios.post(`${BASE_URL}/tclass`, {user_id: user.id, access_token: user.access_token})
            .then(({data}) => setClasses(data))
        }
    }, [])
  return (
    <div className='p-5'>
        {!classDetail ? 
            <div className='flex items-start justify-start gap-8 flex-wrap cursor-pointer'>
                {classes.map(cl =>
                <div onClick={() => setclassDetail(cl)} className='w-[300px] shadow-xl rounded-md'>
                    <img className='max-w-full h-[200px] object-cover' src={`/images/bgcourse${cl.id % 3 + 1}.jpg`} alt="" />
                    <div className='px-5 py-2'>
                        <p className='text-xl text-gray-700 font-semibold line-clamp-1'>{cl.name}</p>
                        <p className='mt-2 text-gray-500'>Học kỳ II năm học 2022 - 2023</p>
                    </div>
                </div>)
                }
               
            </div>:
            <div className=''>
                <TManager classDetail={classDetail}></TManager>
            </div>
        }
    </div>
  )
}
