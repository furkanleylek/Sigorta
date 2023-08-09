import React from 'react'
import AllTeklifler from '@/components/teklifler/all-teklifler'
import Container from '@/components/ui/container'
const SigortaTeklifi = () => {
    return (
        <Container>
            <div className='pt-16 h-screen'>
                <AllTeklifler />
            </div>
        </Container>
    )
}

export default SigortaTeklifi