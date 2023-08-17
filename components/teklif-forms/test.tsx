'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
const TestForm = () => {
    const [seriNoNumber, setSeriNoNumber] = useState(0)
    const [seriNoString, setSeriNoString] = useState('')

    function onSubmit() {
        console.log(seriNoNumber, '', seriNoString)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='flex border border-border'>
                    <input value={seriNoString} onChange={(e) => setSeriNoString(e.target.value)} className='w-1/4' />
                    <input type='number' value={seriNoNumber} onChange={(e) => setSeriNoNumber(e.target.valueAsNumber)} className='w-3/4 border-l-4 pl-4' />
                </div>
                <Button>Submit</Button>
            </form>
        </div>
    )
}

export default TestForm