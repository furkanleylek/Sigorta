import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

const MerakEdilenlerData = [
    {
        title: 'Lorem Ipsum',
        description: ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'
    },
    {
        title: 'Lorem Ipsum',
        description: ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'
    },
    {
        title: 'Lorem Ipsum',
        description: ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'
    },
    {
        title: 'Lorem Ipsum',
        description: ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'
    },
    {
        title: 'Lorem Ipsum',
        description: ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'
    },
    {
        title: 'Lorem Ipsum',
        description: ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'
    }
]

const MerakEdilenler = () => {
    return (
        <div className='flex flex-col gap-4'>
            {
                MerakEdilenlerData.map((element) => {
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