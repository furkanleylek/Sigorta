
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
        title: 'İş Yeri',
        content: 'isyeri',
        imageSrc: '/isyeri.png'
    },
    {
        title: 'Dask',
        content: 'dask',
        imageSrc: '/dask.png'
    },
    {
        title: 'Ferdi Kaza',
        content: 'ferdikaza',
        imageSrc: '/dask.png'
    }
]

const AllTeklifler = () => {

    const [content, setContent] = useState('trafik')
    const { openModal } = useSigortaContext()

    return (
        <div className='flex flex-col gap-12'>
            <div className='flex items-center gap-4 md:space-x-6 rounded-xl flex-1 flex-wrap'>
                {
                    Buttons.map((element) => {
                        return (
                            // <Button key={element.title} variant={element.content === content ? 'outline' : 'default'} onClick={() => setContent(element.content)}>
                            //     {element.title}
                            // </Button>
                            <div
                                key={element.title}
                                className={`flex flex-col items-center justify-center gap-2 border border-border rounded-full py-2 px-4 md:py-2 md:px-4 cursor-pointer
                                ${element.content === content && 'bg-main text-white'} 
                                hover:scale-105 transition-all
                            `}
                                onClick={() => setContent(element.content)}
                            >
                                <div className='relative w-6 h-6 md:w-4 md:h-4'>
                                    <Image
                                        src={element.imageSrc}
                                        fill
                                        alt={element.title}
                                    />
                                </div>
                                <span className='font-semibold text-xs md:text-sm'>
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
