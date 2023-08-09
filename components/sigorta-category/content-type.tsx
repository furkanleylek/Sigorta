'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import GenelBilgi from './genel-bilgi'
import MerakEdilenler from './merakedilenler'
import TestForm from '../teklif-forms/test-form'

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

const ContentType = () => {

    const [content, setContent] = useState('genelbilgi')
    console.log(content)

    return (
        <>
            <div className='flex items-center gap-4'>
                {
                    Buttons.map((element) => {
                        return (
                            <Button key={element.title} variant='outline' onClick={() => setContent(element.content)}>
                                {element.title}
                            </Button>
                        )
                    })
                }
            </div>
            {
                content === 'genelbilgi' && (
                    <GenelBilgi />
                )
            }
            {
                content === 'merakedilenler' && (
                    <MerakEdilenler />
                )
            }
            {
                content === 'teklifformu' && (
                    <TestForm />
                )
            }
        </>
    )
}

export default ContentType