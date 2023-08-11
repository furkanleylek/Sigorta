
'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import TrafikForm from '../teklif-forms/trafik-form'
import KaskoForm from '../teklif-forms/kasko-form'
import KonutForm from '../teklif-forms/konut-form'
import IsyeriForm from '../teklif-forms/isyeri-form'
import DaskForm from '../teklif-forms/dask-form'
import Image from 'next/image'


const Buttons = [
    {
        title: 'Trafik',
        content: 'trafik',
        imageSrc: '/trafik.png'
    },
    {
        title: 'Kasko',
        content: 'kasko',
        imageSrc: '/kasko.png'
    },
    {
        title: 'Konut',
        content: 'konut',
        imageSrc: '/konut.png'
    },
    {
        title: 'İşyeri',
        content: 'isyeri',
        imageSrc: '/isyeri.png'
    },
    {
        title: 'Dask',
        content: 'dask',
        imageSrc: '/dask.png'
    }
]

const AllTeklifler = () => {

    const [content, setContent] = useState('trafik')

    return (
        <div className='flex flex-col gap-12'>
            <div className='flex items-center gap-4 md:space-x-12 rounded-xl flex-1 flex-wrap'>
                {
                    Buttons.map((element) => {
                        return (
                            // <Button key={element.title} variant={element.content === content ? 'outline' : 'default'} onClick={() => setContent(element.content)}>
                            //     {element.title}
                            // </Button>
                            <div
                                key={element.title}
                                className={`flex flex-col items-center justify-center gap-2 border border-border rounded-full py-2 px-4 md:py-4 md:px-8 cursor-pointer
                                ${element.content === content && 'bg-main text-white'} 
                                hover:scale-105 transition-all
                            `}
                                onClick={() => setContent(element.content)}
                            >
                                <div className='relative w-6 h-6 md:w-12 md:h-12'>
                                    <Image
                                        src={element.imageSrc}
                                        fill
                                        alt={element.title}
                                    />
                                </div>
                                <span className='font-semibold text-xs md:text-base'>
                                    {element.title}
                                </span>
                            </div>

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
        </div>
    )
}

export default AllTeklifler
