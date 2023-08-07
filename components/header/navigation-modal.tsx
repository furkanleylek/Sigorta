'use client'
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { PiTrafficSignBold } from 'react-icons/pi'


const components: { title: string; href: string; description: string, Icon: string }[] = [
    {
        title: "Kasko Sigortası",
        href: "/kaskosigortasi",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
        Icon: PiTrafficSignBold
    },
    {
        title: "Trafik Sigortası",
        href: "/trafiksigortasi",
        description:
            "For sighted users to preview content available behind a link.",
        Icon: PiTrafficSignBold
    },
    {
        title: "Deprem Sigortası",
        href: "/depremsigortasi",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        Icon: PiTrafficSignBold
    },
    {
        title: "Sağlık Sigortası",
        href: "/sagliksigortasi",
        description: "Visually or semantically separates content.",
        Icon: PiTrafficSignBold
    },
    {
        title: "Konut Sigortası",
        href: "/konutsigortasi",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        Icon: PiTrafficSignBold
    },
    {
        title: "Nakliyat Sigortası",
        href: "/nakliyatsigortasi",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        Icon: PiTrafficSignBold
    },
]

interface ListItemProps {
    title: string
    description: string
    href: string
    Icon: string
}


const ListItem: React.FC<ListItemProps> = ({ title, description, href, Icon }) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground, `}>
                    <Icon />
                    <div className='space-y-2 py-2'>
                        <h5 className="text-sm font-medium leading-none">
                            {title}
                        </h5>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {description}
                        </p>
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
                <NavigationMenuItem>
                    <NavigationMenuTrigger className='bg-transparent'>SİGORTA TÜRLERİ</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            {
                                components.map((element) => {
                                    return <ListItem key={element.title} href={element.href} title={element.title} Icon={element.Icon} description={element.description} />
                                })
                            }
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
