import React from 'react'

import SingleSigortaType from './single-sigorta-type'
import Container from '@/components/ui/container'
import { TitleH3 } from '@/components/ui/h3'
import { TitleH2 } from '@/components/ui/h2'
import { Paragraph } from '@/components/ui/paragraph'
import { FaCar, FaGripfire } from 'react-icons/fa'
import { MdOutlineHealthAndSafety } from 'react-icons/md'
import { GiCargoCrate, GiFarmTractor } from 'react-icons/gi'
import { MdEngineering, MdOutlineEngineering } from 'react-icons/md'
import { LuHeartHandshake } from 'react-icons/lu'
import { BiBuildingHouse } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
import { IoCarSportOutline } from 'react-icons/io5'
const SigortaTypes = [
    {
        title: "Trafik Sigortaları",
        linkHref: 'kaskosigortasi',
        Icon: IoCarSportOutline,
    },
    {
        title: "Kasko Sigortaları",
        linkHref: 'trafiksigortasi',
        Icon: MdOutlineHealthAndSafety,
    },
    {
        title: "Konut Sigortaları",
        linkHref: 'depremsigortasi',
        Icon: BiBuildingHouse,
    },
    {
        title: "İş Yeri Sigortaları",
        linkHref: 'sagliksigortasi',
        Icon: BsShop,
    },
    {
        title: "Dask Sigortaları",
        linkHref: 'konutsigortasi',
        Icon: FaGripfire,
    },
    {
        title: "Nakliyat Sigortaları",
        linkHref: 'nakliyatsigortasi',
        Icon: GiCargoCrate,
    },
    {
        title: "Ferdi Kaza Sigortaları",
        linkHref: 'nakliyatsigortasi',
        Icon: LuHeartHandshake,
    },
    {
        title: "Mühendislik Sigortaları",
        linkHref: 'nakliyatsigortasi',
        Icon: MdOutlineEngineering,
    },
    {
        title: "Tarım Sigortaları",
        linkHref: 'nakliyatsigortasi',
        Icon: GiFarmTractor,
    }
]


const AllSigortaTypes = () => {
    return (
        <Container>
            <div className='flex flex-col space-y-2'>
                <TitleH2>
                    Ürünler
                </TitleH2>
            </div>
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
                {
                    SigortaTypes.map((sigorta) => {
                        return <SingleSigortaType key={sigorta.title} singleSigorta={sigorta} />
                    })
                }
            </div>
        </Container>

    )
}

export default AllSigortaTypes