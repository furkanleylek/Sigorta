import React from 'react'

import SingleSigortaType from './single-sigorta-type'
import Container from '@/components/ui/container'
import { TitleH3 } from '@/components/ui/h3'
import { TitleH2 } from '@/components/ui/h2'
import { Paragraph } from '@/components/ui/paragraph'
import { FaCar, FaGripfire } from 'react-icons/fa'
import { MdHealthAndSafety } from 'react-icons/md'
import { GiCargoCrate, GiFarmTractor } from 'react-icons/gi'
import { MdEngineering } from 'react-icons/md'
import { LuHeartHandshake } from 'react-icons/lu'
import { BiBuildingHouse } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
const SigortaTypes = [
    {
        title: "Trafik Sigortaları",
        linkHref: 'kaskosigortasi',
        Icon: FaCar,
    },
    {
        title: "Kasko Sigortaları",
        linkHref: 'trafiksigortasi',
        Icon: MdHealthAndSafety,
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
        Icon: MdEngineering,
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
                    Sigorta Türleri
                </TitleH2>
                <Paragraph className='text-gray-500 italic pl-4'>
                    Farklı risklere karşı korunma ihtiyacını karşılamak için hayat sigortası, sağlık sigortası, otomobil sigortası gibi çeşitli güvence sistemleri sunulur. Her bir sigorta türü, özel ihtiyaçlarına yönelik koruma sağlar                            </Paragraph>
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