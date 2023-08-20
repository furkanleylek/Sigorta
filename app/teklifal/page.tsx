import React from 'react'
import AllTeklifler from '@/components/teklifler/all-teklifler'
import Container from '@/components/ui/container'
import BilgilerinizGüvende from '@/components/teklifler/bilgileriniz-güvende'
import { Separator } from '@/components/ui/separator'
const SigortaTeklifi = () => {
    return (
        <Container>
            <div className='min-h-screen'>
                <AllTeklifler />
                <Separator className='my-6' />
                <BilgilerinizGüvende />
            </div>
        </Container>
    )
}

export default SigortaTeklifi