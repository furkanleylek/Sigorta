import React from 'react'
import { BsFacebook, BsTwitter, BsFillTelephoneFill } from 'react-icons/bs'
import { Separator } from '../ui/separator'

const SocialLinks = () => {
    return (
        <div className='flex items-center gap-2'>
            <div className='flex items-center gap-3'>
                <BsFacebook size={16} />
                <span className='border-l-2 h-6'></span>
                <BsTwitter size={16} />
            </div>
            <span className='border-l-2 h-6'></span>
            <div className='flex items-center gap-3'>
                <BsFillTelephoneFill size={16} />
                <span className='text-sm font-semibold'>0 536 821 18 94</span>
            </div>
        </div>
    )
}

export default SocialLinks