import React, { useState } from 'react'

export default function AddFreeTime({index, freeTimes, setFreeTimes}) {
  const [times, setTimes] = useState({start: "", end: ""})

  function handleChange(event) {
    setTimes({...times, [event.target.name]: event.target.value})
  }

  function handleSubmit() {
    if(!isValidTime()) return
    const newFreeTimes = [...freeTimes]
    newFreeTimes[index] = [...newFreeTimes[index], times]
    setFreeTimes(newFreeTimes)
    setTimes({start: "", end: ""})
  }

  function isValidTime() {
    if(!times.start || !times.end)
        return false
    if(times.start >= times.end)
        return false;
    for(let i = 0; i < freeTimes[index].length; i++) {
        if(!freeTimes[index][i].start || !freeTimes[index][i].end);
        else {
            if(freeTimes[index][i].start > times.end || times.start > freeTimes[index][i].end);
            else return false
        }
    }
    return true
  }

  return (
    <div className='inline-flex items-stretch flex-col gap-y-2'>
        <div className='flex items-center justify-start gap-x-1'>
            <label for="start" className='flex-grow'>start: </label>
            <input className='border rounded-sm' id="start" onChange={handleChange} value={times.start} type="time" name="start" />
        </div>
        <div className='flex items-center justify-start gap-x-1'>
            <label for="end" className='flex-grow'>end: </label>
            <input className='border rounded-sm' id="end" onChange={handleChange} value={times.end} type="time" name="end" />
        </div>
        <button onClick={handleSubmit} className={`${isValidTime()? 'bg-green-500': 'bg-gray-500 pointer-events-none'} text-white px-3 py-1 rounded-sm`}>Add</button>
    </div>
  )
}
