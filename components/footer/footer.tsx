import React from 'react'
import Container from '../ui/container'
import Image from 'next/image'
import Link from 'next/link'
import { Paragraph } from '../ui/paragraph'
import { Label } from '../ui/label'

const iletisimData = [
    {
        label: 'Adres : ',
        value: 'Sigortayeri Sigorta ve Reasürans Brokerliği A.Ş Esentepe Mahallesi Kore Şehitleri Cad. No:8/1 Kat:5 Zincirlikuyu, Şişli 34394 / İstanbul'
    },
    {
        label: 'Telefon : ',
        value: '0850 724 10 50'
    },
    {
        label: 'Email : ',
        value: 'iletisim@sigortayeri.com'
    }
]

const footerData = [
    {
        title: 'Ürünler',
        subtitles: [
            {
                subtitle: 'Trafik Sigortası',
                linkHref: ''
            },
            {
                subtitle: 'Kasko Sigortası',
                linkHref: ''
            },
            {
                subtitle: 'Konut Sigortası',
                linkHref: ''
            },
            {
                subtitle: 'İş Yeri Sigortası',
                linkHref: ''
            },
            {
                subtitle: 'Dask Sigortası',
                linkHref: ''
            },
            {
                subtitle: 'Ferdi Kaza Sigortası',
                linkHref: ''
            },
        ]
    },
    {
        title: 'Kurumsal',
        subtitles: [
            {
                subtitle: 'Hakkımızda',
                linkHref: ''
            },
            {
                subtitle: 'İletişim',
                linkHref: ''
            },
        ]
    },
]

const Footer = () => {
    return (
        <div
            className="w-full h-full relative  bg-main text-white"
        >
            <Container className=' '>
                <footer className='flex text-sm justify-between'>
                    <div className='w-2/5'>
                        <Link href='/' className='font-extrabold flex items-center space-x-3'>
                            <Image
                                src='/tick.png'
                                width={40}
                                height={40}
                                alt='logo'
                            />
                            <span>maraşsigorta</span>
                        </Link>
                        {
                            iletisimData.map((e) => {
                                return (
                                    <Paragraph key={e.label}>
                                        <Label className='font-semibold'>{e.label}</Label>
                                        {e.value}
                                    </Paragraph>
                                )
                            })
                        }
                    </div>
                    {
                        footerData.map((e) => {
                            return (
                                <div key={e.title} className='flex flex-col space-y-6 '>
                                    <span>{e.title}</span>
                                    <div className='flex flex-col space-y-2'>
                                        {e.subtitles.map((e) => {
                                            return (
                                                <Link href={e.linkHref} key={e.subtitle} className='hover:underline hover:underline-offset-4'>
                                                    {e.subtitle}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </footer>
            </Container>

        </div>
    )
}

export default Footer