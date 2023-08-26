
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
import { BsShop } from 'react-icons/bs'
import { LuHeartHandshake } from 'react-icons/lu'
import { FaGripfire } from 'react-icons/fa'
import { MdOutlineHealthAndSafety } from 'react-icons/md'
import { BiBuildingHouse } from 'react-icons/bi'
import { PiCarDuotone } from 'react-icons/pi'

const Buttons = [
    {
        title: 'Trafik',
        content: 'trafik',
        imageSrc: '/trafik.png',
        renkKodu: '#096F04',
        Icon: PiCarDuotone,
    },
    {
        title: 'Kasko',
        content: 'kasko',
        imageSrc: '/kasko.png',
        renkKodu: '#BB0B1A',
        Icon: MdOutlineHealthAndSafety,

    },
    {
        title: 'Konut',
        content: 'konut',
        imageSrc: '/konut.png',
        renkKodu: '#0738E9',
        Icon: BiBuildingHouse,

    },
    {
        title: 'İş Yeri',
        content: 'isyeri',
        imageSrc: '/isyeri.png',
        renkKodu: '#E07513',
        Icon: BsShop,

    },
    {
        title: 'Dask',
        content: 'dask',
        imageSrc: '/dask.png',
        renkKodu: '#780EEC',
        Icon: FaGripfire,

    },
    {
        title: 'Ferdi Kaza',
        content: 'ferdikaza',
        imageSrc: '/dask.png',
        renkKodu: '#780EEC',
        Icon: LuHeartHandshake,

    }
]

const AllTeklifler = () => {

    const [content, setContent] = useState('trafik')
    const { openModal } = useSigortaContext()

    return (
        <div className='py-4 lg:py-8 flex flex-col items-center gap-12 w-full'>
            <div className='flex items-center justify-between gap-4 space-x-4 md:space-x-10 rounded-xl overflow-x-auto border border-border p-4 shadow-xl w-full lg:w-2/3'>
                {
                    Buttons.map((element) => {

                        const Icon = element.Icon

                        const isActive = element.content === content;

                        const itemStyle = {
                            color: isActive ? element.renkKodu : 'gray',
                        };


                        return (
                            <div
                                key={element.title}
                                className='flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-all'
                                onClick={() => setContent(element.content)}
                            >
                                <div
                                    className='relative p-1 rounded-full '
                                >
                                    <Icon size={36} className={`z-10 group-hover:text-green-700`} style={itemStyle} />
                                    <span className='absolute w-8 h-8 bg-slate-100  z-[-10] rounded-full top-0 right-0'>

                                    </span>
                                </div>
                                <span className='font-semibold text-xs md:text-sm tracking-wider  whitespace-nowrap' style={itemStyle}>
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
