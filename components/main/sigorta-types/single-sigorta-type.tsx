import React from 'react'
import Image from 'next/image'
import { Paragraph } from '@/components/ui/paragraph'
import Link from 'next/link'

interface SingleSigortaTypeProps {
    singleSigorta: {
        title: string
        linkHref: string
        Icon: React.ComponentType<any>; // İkon bileşeninin türünü belirtin
    }
}

const SingleSigortaType: React.FC<SingleSigortaTypeProps> = ({ singleSigorta }) => {

    const IconComponent = singleSigorta.Icon; // İkona erişim için böyle bir bileşen oluşturun

    return (
        <Link
            href={`/${singleSigorta.linkHref}`}
            className='border border-border p-8 flex flex-col items-center justify-center gap-2 group text-gray-500 hover:bg-main hover:text-white transition-all duration-400 rounded-md
'>
            <IconComponent size={62} className="text-main group-hover:text-white " />
            <h4 className='font-semibold text-base xl:text-xl text-center'>
                {singleSigorta.title}
            </h4>
        </Link>
    )
}

export default SingleSigortaType



