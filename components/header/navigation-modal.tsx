'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { PiTrafficSignBold } from 'react-icons/pi'
import Image from 'next/image'
import { FaCar, FaGripfire } from 'react-icons/fa'
import { MdHealthAndSafety } from 'react-icons/md'
import { GiCargoCrate, GiFarmTractor } from 'react-icons/gi'
import { MdEngineering } from 'react-icons/md'
import { usePathname } from 'next/navigation'

const components = [
    {
        title: "KAZA",
        href: "/trafiksigortasi",
        altbaslıklar: [
            {
                title: 'Kasko',
                linkHref: '/kasko',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Trafik',
                linkHref: '/trafik',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Oto Sorumluluk',
                linkHref: '/otosorumluluk',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Oto Dışı Sorumluluk',
                linkHref: '/otodisisorumluluk',
                Icon: PiTrafficSignBold
            }
        ],
        description:
            "For sighted users to preview content available behind a link.",
        Icon: FaCar,
        imageSrc: '/kaza.png'
    },

    {
        title: "YANGIN",
        href: "/kaskosigortasi",
        altbaslıklar: [
            {
                title: 'Konut',
                linkHref: '/kasko',
                Icon: PiTrafficSignBold
            },
            {
                title: 'İş Yeri',
                linkHref: '/trafik',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Dask',
                linkHref: '/otosorumluluk',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Yangın',
                linkHref: '/otodisisorumluluk',
                Icon: PiTrafficSignBold
            }
        ],
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
        Icon: FaGripfire,
        imageSrc: '/trafik.png'

    },
    {
        title: "HAYAT",
        href: "/konutsigortasi",
        altbaslıklar: [
            {
                title: 'Sağlık',
                linkHref: '/kasko',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Birikimli Hayat',
                linkHref: '/trafik',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Birikimsiz Hayat',
                linkHref: '/otosorumluluk',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Emeklilik',
                linkHref: '/otodisisorumluluk',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Ferdi Kaza',
                linkHref: '/otodisisorumluluk',
                Icon: MdHealthAndSafety
            }
        ],
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        Icon: MdHealthAndSafety,
        imageSrc: '/trafik.png'

    },
    {
        title: "NAKLİYAT",
        href: "/ferdikazasigortasi",
        altbaslıklar: [
            {
                title: 'Tekne',
                linkHref: '/kasko',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Emtea',
                linkHref: '/trafik',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Blok Abonman',
                linkHref: '/otosorumluluk',
                Icon: PiTrafficSignBold
            },
            {
                title: 'CMR',
                linkHref: '/otodisisorumluluk',
                Icon: GiCargoCrate
            }
        ],
        description: "Visually or semantically separates content.",
        Icon: GiCargoCrate,
        imageSrc: '/trafik.png'

    },
    {
        title: "MÜHENDİSLİK",
        href: "/isyerisigortasi",
        altbaslıklar: [
            {
                title: 'Mak. Kırılması',
                linkHref: '/kasko',
                Icon: PiTrafficSignBold
            },
            {
                title: 'E. Cihaz',
                linkHref: '/trafik',
                Icon: PiTrafficSignBold
            },
            {
                title: 'İnşaat All Risk',
                linkHref: '/otosorumluluk',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Montaj',
                linkHref: '/otodisisorumluluk',
                Icon: PiTrafficSignBold
            }
        ],
        description: "Visually or semantically separates content.",
        Icon: MdEngineering,
        imageSrc: '/trafik.png'

    },
    {
        title: "TARIM",
        href: "/isyerisigortasi",
        altbaslıklar: [
            {
                title: 'Kümes',
                linkHref: '/kasko',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Hayvan',
                linkHref: '/trafik',
                Icon: PiTrafficSignBold
            },
            {
                title: 'Tarsim',
                linkHref: '/otosorumluluk',
                Icon: PiTrafficSignBold
            },
        ],
        description: "Visually or semantically separates content.",
        Icon: GiFarmTractor,
        imageSrc: '/trafik.png'
    },
]

export const NavbarModal = () => {

    const [openModal, setOpenModal] = useState(false)
    const [category, setCategory] = useState('')
    const pathname = usePathname()

    const getAltBasliklar = (category: string) => {
        const matchedComponent = components.find(component => component.title === category);
        return matchedComponent ? matchedComponent.altbaslıklar : [];
    };

    const altBasliklar = getAltBasliklar(category);
    return (
        <div className='w-full relative '>
            <div className={`flex items-center justify-center  ${pathname !== '/teklifal' ? 'border-b' : 'border-t'}`}>
                {
                    components.map((e, index) => {

                        const Icon = e.Icon
                        const isSeperate = index === 0;

                        return (
                            <React.Fragment key={e.title}>
                                {!isSeperate && <div className='w-[1px] h-8 bg-gray-200'></div>}
                                <Link
                                    href={e.href}
                                    className={`px-12 ${openModal && category === e.title && 'bg-gray-200'} `}
                                    onMouseOver={() => { setOpenModal(true), setCategory(e.title) }}
                                    onMouseLeave={() => setOpenModal(false)}
                                >
                                    <div
                                        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors  `}
                                    >

                                        <div className='flex flex-col items-center justify-center space-y-2 py-2 text-main'>
                                            <Icon size={32} />
                                            <h5 className="text-sm font-medium leading-none text-gray-600">
                                                {e.title}
                                            </h5>
                                        </div>
                                    </div>
                                </Link>
                            </React.Fragment>
                        )
                    })
                }
            </div>
            {
                openModal && (
                    <div
                        className='absolute top-[92px] w-full h-20 bg-gray-200 z-10 flex items-center justify-center space-x-6 text-gray-600'
                        onMouseOver={() => setOpenModal(true)}
                        onMouseLeave={() => setOpenModal(false)}
                    >

                        {
                            altBasliklar.map((altBaslik, index) => {
                                const isSeperate = index === 0;

                                return (
                                    <>
                                        {!isSeperate && <div key={index} className='w-[1px] h-8 bg-gray-300'></div>}
                                        <Link
                                            key={altBaslik.title}
                                            href={altBaslik.linkHref}
                                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-main focus:bg-accent focus:text-accent-foreground, `}>
                                            <div className='space-y-2 py-2'>
                                                <h5 className="text-sm font-medium leading-none">
                                                    {altBaslik.title}
                                                </h5>
                                            </div>
                                        </Link>
                                    </>
                                )
                            })}
                    </div>
                )
            }
        </div>
    )
}
