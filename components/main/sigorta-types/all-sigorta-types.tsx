import React from 'react'

import SingleSigortaType from './single-sigorta-type'
import Container from '@/components/ui/container'
import { TitleH3 } from '@/components/ui/h3'
import { TitleH2 } from '@/components/ui/h2'

const SigortaTypes = [
    {
        title: "Kasko Sigortası",
        description: 'Kasko sigortası, kaza, çarpma, çarpılma, yanma, hırsızlık ve çalınmaya teşebbüs vs. gibi durumlarda aracı güvence altına alır. Sigortam.net üzerinden araç kasko sorgulama yaptığınızda anlaşmalı sigorta şirketlerinin araç kasko bedeli sayfasını görebilirsiniz.',
        imageUrl: '/test.jpg'
    },
    {
        title: "Kasko Sigortası",
        description: 'Kasko sigortası, kaza, çarpma, çarpılma, yanma, hırsızlık ve çalınmaya teşebbüs vs. gibi durumlarda aracı güvence altına alır. Sigortam.net üzerinden araç kasko sorgulama yaptığınızda anlaşmalı sigorta şirketlerinin araç kasko bedeli sayfasını görebilirsiniz.',
        imageUrl: '/test.jpg'
    },
    {
        title: "Kasko Sigortası",
        description: 'Kasko sigortası, kaza, çarpma, çarpılma, yanma, hırsızlık ve çalınmaya teşebbüs vs. gibi durumlarda aracı güvence altına alır. Sigortam.net üzerinden araç kasko sorgulama yaptığınızda anlaşmalı sigorta şirketlerinin araç kasko bedeli sayfasını görebilirsiniz.',
        imageUrl: '/test.jpg'
    },
    {
        title: "Kasko Sigortası",
        description: 'Kasko sigortası, kaza, çarpma, çarpılma, yanma, hırsızlık ve çalınmaya teşebbüs vs. gibi durumlarda aracı güvence altına alır. Sigortam.net üzerinden araç kasko sorgulama yaptığınızda anlaşmalı sigorta şirketlerinin araç kasko bedeli sayfasını görebilirsiniz.',
        imageUrl: '/test.jpg'
    },
    {
        title: "Kasko Sigortası",
        description: 'Kasko sigortası, kaza, çarpma, çarpılma, yanma, hırsızlık ve çalınmaya teşebbüs vs. gibi durumlarda aracı güvence altına alır. Sigortam.net üzerinden araç kasko sorgulama yaptığınızda anlaşmalı sigorta şirketlerinin araç kasko bedeli sayfasını görebilirsiniz.',
        imageUrl: '/test.jpg'
    },
    {
        title: "Kasko Sigortası",
        description: 'Kasko sigortası, kaza, çarpma, çarpılma, yanma, hırsızlık ve çalınmaya teşebbüs vs. gibi durumlarda aracı güvence altına alır. Sigortam.net üzerinden araç kasko sorgulama yaptığınızda anlaşmalı sigorta şirketlerinin araç kasko bedeli sayfasını görebilirsiniz.',
        imageUrl: '/test.jpg'
    }
]


const AllSigortaTypes = () => {
    return (
        <Container>
            <TitleH2>
                Sigorta Türleri
            </TitleH2>
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