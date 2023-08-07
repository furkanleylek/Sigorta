import { Button } from '@/components/ui/button'
import { TitleH2 } from '@/components/ui/h2'
import React from 'react'
import SingleNasılCalısır from './single-card-nasılcalısır'
import Container from '@/components/ui/container'
import ButtonFirst from '@/components/ui/buttonFirst'
import { Paragraph } from '@/components/ui/paragraph'

const NasılCalısırData = [
    {
        title: "Sigorta Türünü Seçiniz",
        description: 'Kasko , Trafik Sigortası , Dask , Tarsim ya da diğer sigorta ihtiyaçlarınızdan seçim yaparak form sayfasına yönlendirileceksiniz.',
        Icon: '/service-icon.webp',
    },
    {
        title: "Bilgileri Gönderin",
        description: 'Talep edilen bilgileri çok kolay bir şekilde forma doldurabilir ya da hiç zaman kaybetmeden WhatsApp ile gönderebilirsiniz.',
        Icon: '/service-icon.webp',
    },
    {
        title: "En Uygun Teklifi Alın",
        description: 'Dakikalar içinde sigorta ihtiyaçlarınız için en uygun teklifi alın ve sigorta poliçenizin teslimatı için arkanıza yaslanın !',
        Icon: '/service-icon.webp',
    },
]


const NasılCalısır = () => {
    return (
        <Container>
            <div className='flex items-center justify-between '>
                <div className='flex flex-col space-y-2'>
                    <TitleH2>
                        Tüm Sigorta İşlemleriniz için en uygun fiyat
                    </TitleH2>
                    <Paragraph className='text-gray-500 italic pl-4'>
                        Bizden teklif almadan sigorta ve kasko yaptırmayın !
                    </Paragraph>
                </div>
                <Button variant="outline" size="lg" className='hidden md:flex rounded-full hover:bg-main hover:text-white transition-all duration-500 text-xs '>
                    SİGORTA TEKLİFİ AL
                </Button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    NasılCalısırData.map((cardData) => {
                        return <SingleNasılCalısır key={cardData.title} cardData={cardData} />
                    })
                }
            </div>
            <Button variant="outline" size="lg" className='flex md:hidden w-full rounded-full hover:bg-main hover:text-white transition-all duration-500 text-xs '>
                SİGORTA TEKLİFİ AL
            </Button>
        </Container>
    )
}

export default NasılCalısır