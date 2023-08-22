'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import GenelBilgi from './genel-bilgi'
import MerakEdilenler from './merakedilenler'
import KaskoForm from '../teklif-forms/kasko-form'
import TrafikForm from '../teklif-forms/trafik-form'
import KonutForm from '../teklif-forms/konut-form'
import { IsyeriForm } from '../teklif-forms/isyeri-form'
import DaskForm from '../teklif-forms/dask-form'
import IletisimForm from '../teklif-forms/iletisim-form'
import FerdiKazaForm from '../teklif-forms/ferdi-kaza'


interface SigortaCategoryProps {
    categoryItems?: {
        title: string
        description: string
        linkHref: string
        merakedilenler: {
            title: string
            description: string
        }[]
        genelbilgiler: {
            title: string
            description: {
                paragraph: string
            }[]
        }[]
    }
}

const Buttons = [
    {
        title: 'Genel Bilgi',
        content: 'genelbilgi'
    },
    {
        title: 'Merak Edilenler',
        content: 'merakedilenler'
    },
    {
        title: 'Teklif Formu',
        content: 'teklifformu'
    }
]

const ContentType: React.FC<SigortaCategoryProps> = ({ categoryItems }) => {

    const [content, setContent] = useState('genelbilgi')
    return (
        <>
            <div className='flex items-center gap-4 w-full lg:w-2/3'>
                {
                    Buttons.map((element) => {
                        return (
                            <Button key={element.title} variant={element.content === content ? 'default' : 'outline'} onClick={() => setContent(element.content)}>
                                {element.title}
                            </Button>
                        )
                    })
                }
            </div>
            {
                content === 'genelbilgi' && (
                    <GenelBilgi genelbilgiler={categoryItems?.genelbilgiler} />
                )
            }
            {
                content === 'merakedilenler' && (
                    <MerakEdilenler merakedilenler={categoryItems?.merakedilenler} />
                )
            }
            {
                content === 'teklifformu' && (
                    <>

                        {
                            categoryItems?.title === 'Kasko Sigortası' && (
                                <KaskoForm />
                            )
                        }
                        {
                            categoryItems?.title === 'Trafik Sigortası' && (
                                <TrafikForm />
                            )
                        }
                        {
                            categoryItems?.title === 'Konut Sigortası' && (
                                <KonutForm />
                            )
                        }
                        {
                            categoryItems?.title === 'İşyeri Sigortası' && (
                                <IsyeriForm />
                            )
                        }
                        {
                            categoryItems?.title === 'Dask Sigortası' && (
                                <DaskForm />
                            )
                        }
                        {
                            categoryItems?.title === 'Ferdi Kaza Sigortası' && (
                                <FerdiKazaForm />
                            )
                        }
                        {
                            categoryItems?.title && (
                                <IletisimForm />
                            )
                        }
                    </>


                )
            }
        </>
    )
}

export default ContentType