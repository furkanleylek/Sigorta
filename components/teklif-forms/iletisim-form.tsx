'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { TitleH3 } from '../ui/h3'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { TitleH2 } from '../ui/h2'

import { useSigortaContext } from '../context'
import FormContainer from './form-container'

const IletisimForm = () => {

    const { setOpenModal } = useSigortaContext()
    const [loading, setLoading] = useState(false)

    const extendFormSchema = z.object({

        kullaniciAdi: z.string().min(2, {
            message: 'Kullanıcı ismi girilmesi gerekiyor .'
        }),
        tcKimlik: z.string().refine((value) => value.length === 11 && /^\d+$/.test(value)),

        dogumTarihi: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).min(2),

        adres: z.string(),
        telefonNumarasi: z.string().refine((value) => /^0\d{3} \d{3} \d{2} \d{2}$/.test(value)),
        eposta: z.string(),
        mesaj: z.string(),

    })

    const form = useForm<z.infer<typeof extendFormSchema>>({
        resolver: zodResolver(extendFormSchema),
        defaultValues: {
            kullaniciAdi: '',
            tcKimlik: '',
            adres: '',
            telefonNumarasi: '',
            eposta: '',
            mesaj: ''
        }
    })


    async function onSubmit(values: z.infer<typeof extendFormSchema>) {
        try {
            setLoading(true)
            const URL = `https://sigorta-admin-panel.vercel.app/api/trafik`
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            form.reset();
            console.log("values:", values)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setOpenModal(true)
        }
    }

    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full lg:w-2/3 '>
                {/* <TitleH2 className='mb-6'>Trafik Sigortası </TitleH2> */}
                <FormContainer>
                    <TitleH3>İletişim Bilgileri</TitleH3>
                    <FormField
                        control={form.control}
                        name='kullaniciAdi'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adı - Soyadı : </FormLabel>
                                <FormControl>
                                    <Input placeholder='Adınız / Soyadınız' {...field} value={field.value as string} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='tcKimlik'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>T.C. Kimlik Numaranız :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={11}
                                        placeholder="Kimlik numaranız"
                                        value={field.value as string}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları al

                                            if (numericValue.length <= 11) {
                                                field.onChange(numericValue);
                                            }
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='dogumTarihi'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Doğum Tarihiniz :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="date"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='telefonNumarasi'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefon Numarası :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='text'
                                        maxLength={14}
                                        placeholder='Telefon Numaranız'
                                    // onChange={onPhoneChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='adres'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adres :</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='Adres bilgileriniz'
                                        className='resize-none'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='eposta'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-posta :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='email'
                                        placeholder='Email adresiniz'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </FormContainer>

                {/* DOĞUM TARİHİ EKLENECEK */}
                <Separator className='my-6' />
                {/* İLETİŞİM BİLGİLERİ */}
                <FormContainer>
                    <TitleH3>Mesajınız</TitleH3>
                    <FormField
                        control={form.control}
                        name='mesaj'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mesajınız :</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='İletmek istediğiniz mesajınız'
                                        className='resize-none'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </FormContainer>
                <Button className='w-full md:w-2/3 mt-6' disabled={loading ? true : false}>
                    Teklif Al
                </Button>
                {/* DOGRULAMA VE GÖNDERME  */}
            </form>
        </Form>
    )
}

export default IletisimForm








