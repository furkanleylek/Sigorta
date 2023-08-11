import Image from 'next/image'
import React from 'react'
import { Paragraph } from '../ui/paragraph'
import Link from 'next/link'

const BilgilerinizGüvende = () => {
    return (
        <div className='flex items-start space-x-4 py-8'>
            <Image
                src='/lock.png'
                width={60}
                height={60}
                alt='lock'
            />
            <div className='flex flex-col gap-4'>
                <h5 className='text-xl font-semibold'>Bilgileriniz Güvence Altında </h5>
                <Paragraph className='text-xs'>
                    <span className='font-semibold'>KAHRAMANMARAŞ SİGORTA,</span> bilgilerinizi hiçbir şekilde amacının dışında kullanmamakta, 3. şahıs ve kurumlarla paylaşmamaktadır. Detaylı bilgi için <Link className='font-semibold underline underline-offset-4' href='/gizlilikpolitikası'>Gizlilik Politikamız`&lsquo;`a</Link>  göz gezdirebilirsiniz.
                </Paragraph>
            </div>
        </div>
    )
}

export default BilgilerinizGüvende