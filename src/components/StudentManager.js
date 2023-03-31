import React, { useEffect, useRef, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Pusher from "pusher-js";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../overide.css'
import axios from 'axios';
import { BASE_URL, PUSHER_APP_KEY, PUSHER_CLUSTER } from '../config';
import { useUser } from '../contexts/UserContext';
import AddFreeTime from './AddFreeTime';
import { toast } from 'react-toastify';

const formats = {
    timeRangeFormat: () => null, // Disable time slots in day and week views
    dateRangeFormat: ({ start, end }, culture, localizer) =>
      `${localizer.format(start, 'ddd, MMM D')}${start.getHours() >= 9 &&
      start.getHours() < 12
        ? ' (not available)'
        : ''}`, // Customize date range formatting to indicate disabled time slots
  }
const localizer = momentLocalizer(moment);

export default function StudentManager() {
    const [user] = useUser()
    const [eventList, setEventList] = useState([]);
    const[classes, setClasses] = useState([])
    const [schedule, setSchedule] = useState(function(){
      return Array(7).fill().map(() => [])
    })
    const [freeTimes, setFreeTimes] = useState(function() {
      return Array(7).fill().map(() => [])
    })
    useEffect(() => {
      const newSchedule = Array(7).fill().map(() => [])
      freeTimes.forEach((freeTime, index) => {
        sortPeriod(freeTime).forEach(time => {
          let start_time = new Date(0, 0, 0, time.start.split(":")[0], time.start.split(":")[1]); 
          let end_time = new Date(0, 0, 0, time.end.split(":")[0], time.end.split(":")[1]); 
          let time_ranges = splitTime(start_time, end_time);
          time_ranges.forEach(time_range => {
            newSchedule[index].push({
              start: `${addPrefixToTime(time_range.start.getHours())}:${addPrefixToTime(time_range.start.getMinutes())}`,
              end: `${addPrefixToTime(time_range.end.getHours())}:${addPrefixToTime(time_range.end.getMinutes())}`,
              class: classes[Math.floor(Math.random() * classes.length)]
            })
          })
        })
      })
      setSchedule(newSchedule)
    }, [classes, freeTimes])
    useEffect(() => {
      const pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_CLUSTER,
      });
      const channel = pusher.subscribe(`my-channel`);
      classes.forEach(({class_id}) => {
        channel.bind(`my-event.${class_id}`, function({data}) {
            const [year, month, day] = data.due_at.split('-') 
            const newEvent =  {title: data.description + ' - ' + data.class.name, start: new Date(year, month - 1, day), end: new Date(year, month - 1, day)}
            setEventList(prev => [...prev, newEvent])
        })
        return () => pusher.unsubscribe('my-channel')
      })
    }, [classes])

    useEffect(() => {
      axios.post(`${BASE_URL}/getFreetimes`, {user_id: user.id, access_token: user.access_token})
      .then(({data}) => {
        const newFreetimes = Array(7).fill().map(() => []);
        data.forEach(time => {
          newFreetimes[time.index].push({start: time.start, end: time.end})
        })
        setFreeTimes(newFreetimes)
      })
    }, [])

    useEffect(() => {
      axios.post(`${BASE_URL}/sclass`, {user_id: user.id, access_token: user.access_token})
      .then(({data}) => setClasses(data))
    }, [])

    useEffect(() => {
        axios.post(`${BASE_URL}/getDeadlines`, {user_id: user.id, access_token: user.access_token})
        .then(({data}) => {
            const events = data.map(event => {
                const [year, month, day] = event.due_at.split('-')
                return {
                    title: event.description + ' - ' + event.name,
                    start: new Date(year, month - 1, day),
                    end: new Date(year, month - 1, day),
                }
            })
            setEventList(events)
        })
    }, [])

    function handleRemove(index, i) {
      const newFreeTimes = [...freeTimes]
      newFreeTimes[index].splice(i, 1)
      setFreeTimes(newFreeTimes)
    }

    function sortPeriod(times) {
      times = JSON.parse(JSON.stringify(times))
      for(let i = 0; i < times.length; i++) {
        for(let j = i; j < times.length; j++) {
          if(times[i].start > times[j].start) {
            let temp = times[i]
            times[i] = times[j]
            times[j] = temp
          }
        }
      }
      return times
    }

    function splitTime(start_time, end_time) {
      let time_ranges = [];
      let current_time = new Date(start_time.getTime());
    
      while (current_time < end_time) {
        let next_time = new Date(current_time.getTime() + (2 * 60 * 60 * 1000));
        if (next_time > end_time) {
          next_time = end_time;
        }
        let time_range = { start: current_time, end: next_time };
        time_ranges.push(time_range);
        current_time = next_time;
      }
    
      return time_ranges;
    }

    function addPrefixToTime(time) {
      return time < 10 ? `0${time}` : time;
    }

    function handleUpdateFreeTimes()  {
      axios.post(`${BASE_URL}/updateFreetimes`, {user_id: user.id, access_token: user.access_token, freetimes: freeTimes})
      .then(({data}) => {
        if(data) {
          toast('thay đổi thành công')
        }
      } )
    }

    console.log(schedule);

  return (
    <div className='student-manager'>
    <Calendar
    localizer={localizer}
    events={eventList}
    formats={formats}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
    />
    <div className='mt-5'>
      <div class="relative overflow-x-auto border-b pb-2 mb-10">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Mon
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Tue
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Web
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Thu
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Fri
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Sat
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Sun
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 align-top border-b-transparent">
                    {Array(7).fill().map((item, index) => <td className='px-2 py-2'>
                        <AddFreeTime index={index} freeTimes={freeTimes} setFreeTimes={setFreeTimes}></AddFreeTime>
                        <div className='mt-5 flex flex-col gap-y-2'>
                            {sortPeriod(freeTimes[index]).map((freeTime, i) => <div className='flex items-center justify-start gap-x-2'>
                              {freeTime.start} - {freeTime.end}
                              <span onClick={() => handleRemove(index, i)} className='w-6 h-6 text-red-500 cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192M192 320l128-128"/></svg>
                              </span>
                            </div>)}
                        </div>
                    </td>)}
                  </tr>
              </tbody>
        </table>
        <button onClick={handleUpdateFreeTimes} className='bg-green-500 px-5 py-1 rounded-sm text-white'>Save</button>
      </div>
      <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Mon
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tue
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Web
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Thu
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fri
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Sat
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Sun
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 align-top border-b-transparent">
                      {schedule.map(item => <td  className=''>
                        <div className='flex flex-col gap-y-3 px-2'>
                          {item.map(study => <span title={study.class?.name} className='line-clamp-1 bg-green-500 text-white rounded-md px-3 py-1'>
                            {study.start} - {study.end} - {study.class?.name}
                          </span>)}
                        </div>
                      </td>)}
                    </tr>
                </tbody>
          </table>
      </div>
    </div>
  </div>
  )
}
