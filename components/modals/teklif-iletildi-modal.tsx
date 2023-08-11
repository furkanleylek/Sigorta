'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { RxCross2 } from 'react-icons/rx'
import { useSigortaContext } from '../context'
import { useRouter } from 'next/navigation'

const TeklifİletildiModal = () => {

    const { setOpenModal } = useSigortaContext()
    const router = useRouter()
    return (
        <div className="fixed inset-0 z-50 bg-background/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
                <button className='absolute right-0 top-0 m-3 p-2 rounded-full hover:bg-gray-200 ' onClick={() => setOpenModal(false)}>
                    <RxCross2 size={24} className="" />
                </button>
                <div className='flex flex-col items-center justify-center space-y-4'>
                    <Image
                        src='/tick.png'
                        width={60}
                        height={60}
                        alt='tick'
                    />
                    <h3 className="text-primary text-lg font-semibold px-2 text-center">
                        Teklifiniz şirketimiz tarafından değerlendirmeye alındı !
                    </h3>
                </div>
                <Separator className='my-4' />
                <p className='text-sm text-muted-foreground'>
                    Şirketimiz hakkında bir geri dönüşünüz , merak ettikleriniz soracak sorularınız var ise bizimle iletişime geçebilirsiniz .
                </p>
                <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end '>
                    <Button variant='outline' size="sm" onClick={() => setOpenModal(false)}>
                        Hayır, Teşekkürler
                    </Button>
                    <Button size="sm" onClick={() => { setOpenModal(false), router.push('/iletisim') }}>
                        İletişime Geç
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TeklifİletildiModal