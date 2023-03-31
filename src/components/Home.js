import React from 'react'

export default function Home() {
  return (
    <div className='w-full'>
           <h1 className='flex items-center gap-x-2 px-3 py-6 border-b border-b-gray-300'>
            <span className='text-green-500 w-6'>
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
            </span>
            <span className='text-2xl font-serif'>Trang chủ</span>
          </h1>
          <div className='px-3 py-6 bg-gray-50'>
            <div>
              <h2 className='font-serif text-xl'>THÔNG BÁO - HƯỚNG DẪN</h2>
              <span className='relative before:content-[""] before:absolute before:top-full before:left-0 before:right-0 before:h-1 before:bg-white font-semibold text-gray-600 px-3 py-2 border border-gray-300 border-b-transparent mt-6 inline-block bg-white'>Trường đại học Công    nghệ
              </span>
            </div>
            <div className='bg-white border border-gray-300 px-4 py-6'>
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
                <ul className='ml-5 pb-5'>
                    <li className='flex items-center gap-x-2 text-green-600 before:content-[""] before:w-[4px] before:h-[4px] before:bg-black'>
                        <span className='font-thin'>https://svtotnghiep.vnu.edu.vn</span>
                    </li>
                </ul>
                <ul className='flex flex-col gap-y-3 pt-6 border-t border-dashed border-t-gray-300'>
                  <li>- Thời gian đăng ký  học trực tuyến: từ 25/05/2021 - 28/05/2021.</li>
                  <li>- Sinh viên các chương trình đào tạo chuẩn không đăng ký học tại các lớp học phần dành cho sinh viên các chương trình chất lượng cao thông tư 23.
                  Ngược lại, sinh viên các chương trình chất lượng cao TT23 không đăng ký học tại các lớp học phần dành cho sinh viên chương trình đào tạo chuẩn.
                  </li>
                  <li>
                  - Sinh viên theo dõi Danh sách cấm thi tại: <span className='text-green-300'>
                     https://docs.google.com/spreadsheets/d/1YO3yyMjVQh7mHFGq4hoXYWyJAImr3MsgMKrzphOYrC8/edit?usp=sharing
                    </span>
                  </li>
                </ul>
            </div>
          </div> 
    </div>
  )
}
