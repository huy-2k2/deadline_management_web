import Header from '../components/Header'
import { Formik } from 'formik';
import { BASE_URL } from '../config';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

export default function Login() {
    const [,setUser] = useUser()
    useAuth()
    function handleSubmit(values, {setFieldError}) {
        axios.post(`${BASE_URL}/login`, values)
        .then(({data}) => {
            if(data) {
                setUser(data)
            } else {
                setFieldError('email', 'email hoạc mật khẩu không đúng')
            }
        })
    }
   
  return (
   <div>
        <Header></Header>
        <div className='flex items-start justify-between gap-x-3 px-5 mt-5 flex-col md:flex-row gap-y-4'>
            <div className='flex flex-col gap-y-3'>
                <h2 className='text-xl font-serif'>THÔNG BÁO</h2>
                <p className='text-red-500 text-sm'>Khuyến cáo: trong trường hợp các bạn dùng trình duyệt chrome bị lỗi hãy thử chuyển sang Microsoft Edge (IE). </p>
                <ul className='ml-5'>
                    <li className='flex items-center gap-x-2 text-green-700 before:content-[""] before:w-[4px] before:h-[4px] before:bg-black'>
                        <span className='font-semibold'>(Video) Hướng dẫn sử dụng Cổng thông tin đào tạo - Đăng ký học</span>
                        <img src="/images/icon_new.gif" alt="" />
                    </li>
                    <li className='flex items-center gap-x-2 text-green-600 before:content-[""] before:w-[4px] before:h-[4px] before:bg-black'>
                        <span className='font-thin'>(Video) Bài giảng môn Tin học cơ sở  | Câu hỏi ôn tập</span>
                    </li>
                    <li className='flex items-center gap-x-2 text-green-600 before:content-[""] before:w-[4px] before:h-[4px] before:bg-black'>
                        <span className='font-thin'>Kỹ năng học tập hiệu quả ở bậc đại học </span>
                    </li>
                    <li className='flex items-center gap-x-2 text-green-600 before:content-[""] before:w-[4px] before:h-[4px] before:bg-black'>
                        <span className='font-thin'>(Video) Hướng dẫn đăng ký học bổng</span>
                    </li>
                    <li className='flex items-center gap-x-2 text-green-600 before:content-[""] before:w-[4px] before:h-[4px] before:bg-black'>
                        <span className='font-thin'>[Video/Ảnh]Lễ trao học bổng Yamada 2018</span>
                    </li>
                </ul>
                <h3 className='font-sans'>Cổng thông tin dành cho sinh viên đã tốt nghiệp</h3>
                <ul className='ml-5'>
                    <li className='flex items-center gap-x-2 text-green-600 before:content-[""] before:w-[4px] before:h-[4px] before:bg-black'>
                        <span className='font-thin'>https://svtotnghiep.vnu.edu.vn</span>
                    </li>
                </ul>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                    errors.email = 'nhập email';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Email không hợp lệ';
                    }
                    if(!values.password) {
                        errors.password = "nhập mật khẩu"
                    }
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit} className='w-full md:w-[480px] border border-gray-300 shadow-md'>
                    <h2 className='text-lg font-semibold p-4 bg-green-500 text-white'>Đăng nhập hệ thống</h2>
                    <div className='px-3 py-4 flex flex-col gap-y-5'>
                        <div className='flex flex-col gap-y-1'>
                            <label className='' for="email">Tên truy cập</label>
                            <div className='relative w-full'>
                                <input placeholder='Tên truy cập' className='outline-none border border-gray-400 shadow-sm w-full px-3 py-[6px]' type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} id='email' />
                                <span className='absolute right-3 top-1/2 -translate-y-1/2 w-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>
                                </span>
                            </div>
                           <span className='text-red-500'>
                                {errors.email && touched.email && errors.email}
                           </span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <label className='' for="password">Mật khẩu</label>
                            <div className='relative w-full'>
                                <input placeholder='Mật khẩu' className='outline-none border border-gray-400 shadow-sm w-full px-3 py-[6px]'  name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password} type="password" id='password' 
                                />
                                <span className='absolute right-3 top-1/2 -translate-y-1/2 w-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M336 208v-95a80 80 0 00-160 0v95" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="96" y="208" width="320" height="272" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                                </span>
                            </div>
                            <span className='text-red-500'>
                                {errors.password && touched.password && errors.password}
                            </span>
                        </div>
                    </div>
                    <div className='p-3'>
                        <div className='border border-transparent border-t-gray-200 p-2 flex items-center justify-between'>
                            <span className='text-green-600'>quên mật khẩu?</span>
                            <button className='flex items-center justify-center gap-x-1 px-3 py-1 text-white bg-green-500 border border-gray-400' type='submit'>
                                <span className='w-5'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M192 176v-40a40 40 0 0140-40h160a40 40 0 0140 40v240a40 40 0 01-40 40H240c-22.09 0-48-17.91-48-40v-40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M288 336l80-80-80-80M80 256h272"/></svg>
                                </span>
                                <span>
                                    Đăng nhập
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            )}
     </Formik>
        </div>
   </div>
    )
}
