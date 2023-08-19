
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
import { AiOutlineCar, AiOutlineShop } from 'react-icons/ai'
import { FaHouseChimney, } from 'react-icons/fa6'
import { FaCarCrash } from 'react-icons/fa'
import { GiShop } from 'react-icons/gi'
import { FaHouseDamage } from 'react-icons/fa'
import { FaStarOfLife } from 'react-icons/fa'
import { MdOutlineReportProblem } from 'react-icons/md'
import { LiaStarOfLifeSolid, LiaHouseDamageSolid, LiaCarCrashSolid } from 'react-icons/lia'
const Buttons = [
    {
        title: 'Trafik',
        content: 'trafik',
        imageSrc: '/trafik.png',
        renkKodu: '#096F04',
        Icon: AiOutlineCar,
    },
    {
        title: 'Kasko',
        content: 'kasko',
        imageSrc: '/kasko.png',
        renkKodu: '#BB0B1A',
        Icon: LiaCarCrashSolid,

    },
    {
        title: 'Konut',
        content: 'konut',
        imageSrc: '/konut.png',
        renkKodu: '#0738E9',
        Icon: LiaHouseDamageSolid,

    },
    {
        title: 'İş Yeri',
        content: 'isyeri',
        imageSrc: '/isyeri.png',
        renkKodu: '#E07513',
        Icon: AiOutlineShop,

    },
    {
        title: 'Dask',
        content: 'dask',
        imageSrc: '/dask.png',
        renkKodu: '#780EEC',
        Icon: MdOutlineReportProblem,

    },
    {
        title: 'Ferdi Kaza',
        content: 'ferdikaza',
        imageSrc: '/dask.png',
        renkKodu: '#780EEC',
        Icon: LiaStarOfLifeSolid,

    }
]

const AllTeklifler = () => {

    const [content, setContent] = useState('trafik')
    const { openModal } = useSigortaContext()

    return (
        <div className='py-4 lg:py-8 flex flex-col gap-12 w-full'>
            <div className='flex items-center gap-4 space-x-4 md:space-x-10 rounded-xl overflow-x-auto border border-border p-4 shadow-xl lg:w-max'>
                {
                    Buttons.map((element) => {

                        const Icon = element.Icon

                        const isActive = element.content === content;

                        const itemStyle = {
                            color: isActive ? element.renkKodu : 'gray',
                        };


                        return (
                            <div className='flex flex-col gap-20' key={element.title}>
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
                                    <span className='font-semibold text-xs md:text-sm tracking-wider text-gray-700 whitespace-nowrap'>
                                        {element.title}
                                    </span>
                                </div>
                                <div
                                    key={element.title}
                                    className='flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-all'
                                    onClick={() => setContent(element.content)}
                                >
                                    <div
                                        className={`${element.content === content && 'bg-main rounded-full'} p-3`}
                                    >
                                        <Image
                                            src={element.imageSrc}
                                            width={26}
                                            height={26}
                                            alt={element.title}
                                        />
                                    </div>
                                    <span className='font-semibold text-xs md:text-sm tracking-wider text-gray-700 whitespace-nowrap'>
                                        {element.title}
                                    </span>
                                </div>
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
