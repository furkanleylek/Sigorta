'use client'
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { PiTrafficSignBold } from 'react-icons/pi'


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
        Icon: PiTrafficSignBold
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
        Icon: PiTrafficSignBold
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
                Icon: PiTrafficSignBold
            }
        ],
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        Icon: PiTrafficSignBold
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
                Icon: PiTrafficSignBold
            }
        ],
        description: "Visually or semantically separates content.",
        Icon: PiTrafficSignBold
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
                title: 'İnşşat All Risk',
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
        Icon: PiTrafficSignBold
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
        Icon: PiTrafficSignBold
    },
]

interface ListItemProps {
    title: string
    linkHref: string
    Icon: string
}


const ListItem: React.FC<ListItemProps> = ({ title, linkHref, Icon }) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={linkHref}
                    className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground, `}>
                    <Icon />
                    <div className='space-y-2 py-2'>
                        <h5 className="text-sm font-medium leading-none">
                            {title}
                        </h5>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

export const NavbarModal = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {
                    components.map((anabaslık) => {

                        const Icon = anabaslık.Icon
                        return (
                            <NavigationMenuItem key={anabaslık.title}>
                                <NavigationMenuTrigger className='bg-transparent uppercase '>
                                    <Icon />
                                    {anabaslık.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        {
                                            anabaslık.altbaslıklar.map((e) => {
                                                return <ListItem key={e.title} title={e.title} linkHref={e.linkHref} Icon={e.Icon} />
                                            })
                                        }
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        )
                    })
                }
            </NavigationMenuList>
        </NavigationMenu>
    )
}
