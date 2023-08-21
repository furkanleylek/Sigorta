import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

interface MerakEdilenlerProps {
    merakedilenler?: {
        title: string
        description: string
    }[]
}
const MerakEdilenler: React.FC<MerakEdilenlerProps> = ({ merakedilenler }) => {
    return (
        <div className='flex flex-col gap-4 w-full lg:w-2/3'>
            {
                merakedilenler?.map((element) => {
                    return (
                        <Accordion type='single' collapsible key={element.title}>
                            <AccordionItem value='item-1'>
                                <AccordionTrigger>{element.title}</AccordionTrigger>
                                <AccordionContent>
                                    {element.description}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )
                })
            }
        </div>
    )
}

export default MerakEdilenler