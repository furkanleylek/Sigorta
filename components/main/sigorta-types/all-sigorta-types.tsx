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

const SigortaTypes = [
    {
        title: "Kasko Sigortaları",
        linkHref: 'kaskosigortasi',
        Icon: FaCar,
    },
    {
        title: "Trafik Sigortaları",
        linkHref: 'trafiksigortasi',
        Icon: MdHealthAndSafety,
    },
    {
        title: "Deprem Sigortaları",
        linkHref: 'depremsigortasi',
        Icon: FaGripfire,
    },
    {
        title: "Sağlık Sigortaları",
        linkHref: 'sagliksigortasi',
        Icon: GiCargoCrate,
    },
    {
        title: "Konut Sigortaları",
        linkHref: 'konutsigortasi',
        Icon: GiFarmTractor,
    },
    {
        title: "Nakliyat Sigortaları",
        linkHref: 'nakliyatsigortasi',
        Icon: MdEngineering,
    },
    {
        title: "Ferdi Kaza Sigortaları",
        linkHref: 'nakliyatsigortasi',
        Icon: GiCargoCrate,
    },
    {
        title: "Mühendislik Sigortaları",
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