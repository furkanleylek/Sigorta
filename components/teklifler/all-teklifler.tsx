
'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import TrafikForm from '../teklif-forms/trafik-form'
import KaskoForm from '../teklif-forms/kasko-form'
import KonutForm from '../teklif-forms/konut-form'
import { IsyeriForm } from '../teklif-forms/isyeri-form'
import DaskForm from '../teklif-forms/dask-form'
import Image from 'next/image'
import TeklifİletildiModal from '../modals/teklif-iletildi-modal'
import { useSigortaContext } from '../context'
import FerdiKazaForm from '../teklif-forms/ferdi-kaza'
import TestForm from '../teklif-forms/test'
import { AiOutlineCar } from 'react-icons/ai'
import { FaHouseChimney } from 'react-icons/fa6'
import { GiShop } from 'react-icons/gi'
const Buttons = [
    {
        title: 'Trafik',
        content: 'trafik',
        imageSrc: '/trafik.png',
        Icon: AiOutlineCar,
    },
    {
        title: 'Kasko',
        content: 'kasko',
        imageSrc: '/kasko.png',
        Icon: AiOutlineCar,

    },
    {
        title: 'Konut',
        content: 'konut',
        imageSrc: '/konut.png',
        Icon: FaHouseChimney,

    },
    {
        title: 'İş Yeri',
        content: 'isyeri',
        imageSrc: '/isyeri.png',
        Icon: GiShop,

    },
    {
        title: 'Dask',
        content: 'dask',
        imageSrc: '/dask.png',
        Icon: AiOutlineCar,

    },
    {
        title: 'Ferdi Kaza',
        content: 'ferdikaza',
        imageSrc: '/dask.png',
        Icon: AiOutlineCar,

    }
]

const AllTeklifler = () => {

    const [content, setContent] = useState('trafik')
    const { openModal } = useSigortaContext()

    return (
        <div className='py-4 lg:py-12 flex flex-col gap-12'>
            <div className='flex items-center gap-4 space-x-4 md:space-x-10 rounded-xl overflow-x-auto border border-border p-4 shadow-xl w-auto'>

                {
                    Buttons.map((element) => {

                        const Icon = element.Icon
                        return (
                            <div
                                key={element.title}
                                className='flex flex-col items-center justify-center'
                            >
                                <div
                                    className='relative p-1 rounded-full cursor-pointer group'
                                    onClick={() => setContent(element.content)}
                                >
                                    <Icon size={36} className={`z-10 text-gray-700 group-hover:text-green-700 ${element.content === content && 'text-green-700'}  `} />
                                    <span className='absolute w-8 h-8 bg-slate-200  z-[-10] rounded-full top-0 right-0'>

                                    </span>
                                </div>
                                <span className='font-semibold text-xs md:text-sm tracking-wider text-gray-700 whitespace-nowrap'>
                                    {element.title}
                                </span>
                            </div>

                            // <div
                            //     key={element.title}
                            //     className={`flex flex-col items-center justify-center gap-2 border border-border rounded-full py-2 px-4 md:py-2 md:px-4 cursor-pointer
                            //     ${element.content === content && 'bg-main text-white'} 
                            //     hover:scale-105 transition-all
                            // `}
                            //     onClick={() => setContent(element.content)}
                            // >
                            //     <div className='relative w-6 h-6 md:w-4 md:h-4'>
                            //         <Image
                            //             src={element.imageSrc}
                            //             fill
                            //             alt={element.title}
                            //         />
                            //     </div>
                            //     <span className='font-semibold text-xs md:text-sm'>
                            //         {element.title}
                            //     </span>
                            // </div>

                        )
                    })
                }

            </div>
            {
                content === 'trafik' && (
                    <TrafikForm />
                )
            }
            {
                content === 'kasko' && (
                    <KaskoForm />
                )
            }
            {
                content === 'konut' && (
                    <KonutForm />
                )
            }

            {
                content === 'isyeri' && (
                    <IsyeriForm />
                )
            }
            {
                content === 'dask' && (
                    <DaskForm />
                )
            }
            {
                content === 'ferdikaza' && (
                    <FerdiKazaForm />
                )
            }
            {openModal &&
                (
                    <TeklifİletildiModal />

                )
            }
        </div>
    )
}

export default AllTeklifler
