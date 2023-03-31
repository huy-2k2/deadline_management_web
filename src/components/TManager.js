import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config'
import { useUser } from '../contexts/UserContext'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
export default function TManager({classDetail}) {
    const [user] = useUser()
    const [data, setData] = useState({deadlines: [], students: []})
   function getTomorrow() {
    const today = new Date()
    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)
    let result = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1 < 10 ? `0${tomorrow.getMonth() + 1}` : tomorrow.getMonth() + 1 }-${tomorrow.getDate() < 10 ? `0${tomorrow.getDate()}`: tomorrow.getDate()}`
    return result
  }

  function handleSubmit(values, {resetForm}) {
    resetForm()
    axios.post(`${BASE_URL}/createDeadline`, {user_id: user.id, access_token: user.access_token, class_id: classDetail.id, date: values.date, description: values.description})
    .then(({data: deadlines}) => {
      setData({...data, deadlines})
      toast('Tạo bài tập thành công')
    })
  }

    useEffect(() => {
        axios.post(`${BASE_URL}/classDetail`, {user_id: user.id, access_token: user.access_token, class_id: classDetail.id})
        .then(({data}) => setData(data))
    }, [])
  return (
    <div> 
      <h2 className='text-xl'>{classDetail.name}</h2>
      <div className='flex items-start justify-start gap-10 flex-col lg:flex-row mt-5'>
          {/* deadline */}
          <div>
          <h3 className='mb-3'>Danh sách bài tập</h3>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-lg">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        STT
                    </th>
                    <th scope="col" class="px-6 py-3">
                        mô tả
                    </th>
                    <th scope="col" class="px-6 py-3">
                        hạn chót
                    </th>
                </tr>
            </thead>
            <tbody>
              {data?.deadlines?.map((deadline, index) => 
              <tr key={deadline.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td class="px-6 py-4">
                    {deadline.description}
                </td>
                <td class="px-6 py-4">
                    {deadline.due_at}
                </td>
              </tr>)}
                
            </tbody>
          </table>
          <Formik
            initialValues={{ date: '', description: '' }}
            validate={values => {
              const errors = {};
              if (!values.date) {
                errors.date = 'điền thời gian';
              } 
              if(!values.description)
                errors.description = 'điền mô tả'
              return errors;
            }}
            onSubmit={handleSubmit}
     >
       {({
         values,
         errors,
         handleChange,
         handleBlur,
         handleSubmit,
         /* and other goodies */
       }) => (
        <form onSubmit={handleSubmit} className='mt-5 border rounded-lg px-4 py-2'>
        <h3 className='text-lg py-3 border-b border-b-gray-300'>thêm mới</h3>
        <div className='mt-3'>
          <label htmlFor='date' className='block mb-1 mt-3'>thời gian nộp:</label>
          <input type="date" id="date" name="date"
          className='border px-3 py-1 rounded-md'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.date}
          min={getTomorrow()}></input>
          <span className='text-red-500 block'>{errors.date}</span>
        </div>
        <div>
          <label htmlFor='des' className='mb-1 mt-3 inline-block'>mô tả:</label>
          <textarea  
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description} name='description' id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          <span className='text-red-500'>{errors.description}</span>
        </div>
        <button type='submit' className='bg-green-400 text-white px-3 py-2 rounded-md mt-4'>Thêm mới</button>
      </form>
       )}
     </Formik>
        </div>
        <div>
          <h3 className='mb-3'>Danh sách lớp</h3>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-lg">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        STT
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Tên
                    </th>
                    <th scope="col" class="px-6 py-3">
                        email
                    </th>
                </tr>
            </thead>
            <tbody>
              {data?.students?.map((student, index) => 
              <tr key={student.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td class="px-6 py-4">
                    {student.name}
                </td>
                <td class="px-6 py-4">
                    {student.email}
                </td>
              </tr>)}
                
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
