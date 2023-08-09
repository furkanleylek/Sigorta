
'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import TrafikForm from '../teklif-forms/trafik-form'
import KaskoForm from '../teklif-forms/kasko-form'
import KonutForm from '../teklif-forms/konut-form'
import IsyeriForm from '../teklif-forms/isyeri-form'
import DaskForm from '../teklif-forms/dask-form'




const Buttons = [
    {
        title: 'Trafik Sigortası Teklif Formu',
        content: 'trafik'
    },
    {
        title: 'Kasko Sigortası Teklif Formu',
        content: 'kasko'
    },
    {
        title: 'Konut Sigortası Teklif Formu',
        content: 'konut'
    },
    {
        title: 'İşyeri Sigortası Teklif Formu',
        content: 'isyeri'
    },
    {
        title: 'Dask Sigortası Teklif Formu',
        content: 'dask'
    }
]

const AllTeklifler = () => {

    const [content, setContent] = useState('genelbilgi')

    return (
        <div className='flex flex-col gap-20'>
            <div className='flex items-center gap-4 '>
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
