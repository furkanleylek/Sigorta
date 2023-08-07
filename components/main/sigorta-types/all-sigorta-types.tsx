import React from 'react'

import SingleSigortaType from './single-sigorta-type'
import Container from '@/components/ui/container'
import { TitleH3 } from '@/components/ui/h3'
import { TitleH2 } from '@/components/ui/h2'
import { Paragraph } from '@/components/ui/paragraph'

const SigortaTypes = [
    {
        title: "Kasko Sigortası",
        description: 'Aracınızı olası kaza ve hasarlara karşı koruyan kasko sigortası, sürüş keyfinizi güven içinde yaşamanızı sağlar .',
        imageUrl: '/test.jpg',
        linkHref: 'kaskosigortasi'
    },
    {
        title: "Trafik Sigortası",
        description: 'Trafikte oluşabilecek zararları karşılayarak sizleri maddi yüklerden koruyan trafik sigortası, güvenli seyahat etmenizi sağlar .',
        imageUrl: '/test.jpg',
        linkHref: 'trafiksigortasi'
    },
    {
        title: "Deprem Sigortası",
        description: 'Değerli konutunuzu deprem riskine karşı koruyan sigorta, beklenmedik anlarda gelecek güvence ile sizi rahatlatır .',
        imageUrl: '/test.jpg',
        linkHref: 'depremsigortasi'
    },
    {
        title: "Sağlık Sigortası",
        description: 'Sağlık giderlerinizi karşılayarak sizlere en iyi tedavi imkanını sunan sağlık sigortası, sağlığınıza değer verir .',
        imageUrl: '/test.jpg',
        linkHref: 'sagliksigortasi'
    },
    {
        title: "Konut Sigortası",
        description: 'Ev ve eşyalarınızı yangın, hırsızlık gibi risklere karşı koruyan konut sigortası, huzurlu bir yaşam alanı sunar .',
        imageUrl: '/test.jpg',
        linkHref: 'konutsigortasi'
    },
    {
        title: "Nakliyat Sigortası",
        description: 'Eşyalarınızın taşınması sırasında oluşabilecek hasarlara karşı güvence sağlayan nakliyat sigortası, taşınma sürecinizi kolaylaştırır .',
        imageUrl: '/test.jpg',
        linkHref: 'nakliyatsigortasi'
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
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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