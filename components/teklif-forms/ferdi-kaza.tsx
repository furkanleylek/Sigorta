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
import DogrulamaKodu from '../teklifler/dogrulama-kodu'
import { Button } from '../ui/button'
import { TitleH2 } from '../ui/h2'
import { Checkbox } from '../ui/checkbox'

import { useSigortaContext } from '../context'

const formSchema = z.object({
    basvuran: z.enum(["Şahıs", "Şirket", "Yabancı Şahıs"]),
    kullaniciAdi: z.string().min(2, {
        message: 'Kullanıcı ismi girilmesi gerekiyor .'
    }),
    tcKimlik: z.string().refine((value) => value.length === 11 && /^\d+$/.test(value)),
    dogumTarihi: z.string(),
    meslek: z.string().min(2),

    plakaNo: z.string().min(2),
    kullanimTarzi: z.string().min(2),
    marka: z.string().min(2),
    modelYili: z.string().min(2),
    ekAksesuarBilgileri: z.string().min(2),
    ASBISno: z.string().refine((value) => value.length === 19 && /^\d+$/.test(value)),

    police: z.enum(["var", "yok"]),
    teminatMiktari: z.number(),
    ekTeminatlar: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    sigortaSirketi: z.string().min(2),
    acentaNumarasi: z.number().min(2),
    policeNumarasi: z.string().min(2),
    yenilemeNumarasi: z.number(),
    policeBitisTarihi: z.string(),

    adres: z
        .string()
        .min(10, {
            message: "Adres en az 10 karakter olmalı.",
        }),
    telefonNumarasi: z.string().refine((value) => /^0\d{3} \d{3} \d{2} \d{2}$/.test(value)),
    eposta: z.string().min(2),
    mesaj: z.string().min(2),
})

const ekTeminatlar = [
    {
        id: "Tedavi Masrafları Teminatı",
        label: "Tedavi Masrafları Teminatı",
    },
    {
        id: "Gündelik Tazminat Teminatı",
        label: "Gündelik Tazminat Teminatı",
    },
] as const

const FerdiKazaForm = () => {

    const { setOpenModal } = useSigortaContext()
    const [loading, setLoading] = useState(false)
    const [isPolice, setIsPolice] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            kullaniciAdi: '',
            basvuran: 'Şahıs',
            tcKimlik: '',
            meslek: '',

            plakaNo: '',
            kullanimTarzi: '',
            marka: '',
            modelYili: '',
            ekAksesuarBilgileri: '',
            ASBISno: '',

            police: 'yok',
            ekTeminatlar: [''],

            adres: '',
            telefonNumarasi: '',
            eposta: '',
            mesaj: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // try {
        //     setLoading(true)
        //     const URL = `http://localhost:3001/api/trafik`
        //     const response = await fetch(URL, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(values)
        //     })
        //     form.reset();
        // } catch (error) {
        //     console.log(error)
        // } finally {
        //     setLoading(false)
        //     setOpenModal(true)
        // }
        console.log("sa")
        console.log(values)
    }

    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Sadece rakamları al
        const formattedValue = numericValue.replace(/^0?(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?/, (match, p1, p2, p3, p4) => {
            let formatted = '';

            if (p1) {
                formatted += `0${p1}`;
            }
            if (p2) {
                formatted += ` ${p2}`;
            }
            if (p3) {
                formatted += ` ${p3}`;
            }
            if (p4) {
                formatted += ` ${p4}`;
            }

            return formatted.trim();
        });

        e.target.value = formattedValue;

        return formattedValue

    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Sadece rakamları al

        if (numericValue.length > 11) {
            return;
        }

        e.target.value = numericValue;

        return numericValue
    };

    const onASBISChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Sadece rakamları al

        if (numericValue.length > 19) {
            return;
        }

        e.target.value = numericValue;

        return numericValue

    };

    const onModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Sadece rakamları al
        console.log("inputValue:", inputValue)
        if (numericValue.length > 4) {
            return;
        }

        e.target.value = numericValue;

        return numericValue

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full md:w-2/3'>
                {/* RUHSAT SAHİBİ BİLGİLERİ */}
                <div className='flex flex-col gap-4'>
                    <TitleH2 className='mb-6'>Ferdi Kaza Sigortası </TitleH2>
                    <Separator />
                    <TitleH3>Sigortalı \ Sigorta Ettiren Bilgileri</TitleH3>
                    <FormField
                        control={form.control}
                        name='basvuran'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Başvuran:</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className='flex items-center gap-10'
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='Şahıs' id='sahis' />
                                            </FormControl>
                                            <Label htmlFor='sahis'>Şahıs</Label>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='Şirket' id='sirket' />
                                            </FormControl>
                                            <Label htmlFor='sirket'>Şirket</Label>

                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='Yabancı Şahıs' id='yabanci-sahis' />
                                            </FormControl>
                                            <Label htmlFor='yabanci-sahis'>Yabancı Uyruklu Şahıs</Label>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name='kullaniciAdi'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adı - Soyadı : </FormLabel>
                                <FormControl>
                                    <Input placeholder='Adınız / Soyadınız' {...field} />
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
                                        placeholder="Örn: 12345678901"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.tcKimlik ? 'border-red-500' : ''
                                            }`}
                                    // onChange={onInputChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name='dogumTarihi'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Doğum Tarihi : </FormLabel>
                                <FormControl>
                                    <Input placeholder='Doğum tarihiniz' type='date' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={form.control}
                        name='meslek'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meslek :</FormLabel>
                                <FormControl>
                                    <Input placeholder='Mesleğiniz' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                </div>

                <Separator className='my-6' />

                {/* POLİÇE BİLGİLERİ */}
                <div className='flex flex-col gap-4'>
                    <TitleH3>Poliçe Bilgileri</TitleH3>
                    {/* 
                    <FormField
                        control={form.control}
                        name='teminatMiktari'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Vefat Halinde İstenecek Teminat Miktarı :</FormLabel>
                                <div className='relative'>
                                    <FormControl>
                                        <Input placeholder='İstediğiniz teminat miktarı' {...field} type='number' />
                                    </FormControl>
                                    <span className='absolute top-1 right-10 h-full items-center text-center font-semibold text-xl'>₺</span>
                                </div>
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={form.control}
                        name="ekTeminatlar"
                        render={() => (
                            <FormField
                                control={form.control}
                                name="ekTeminatlar"
                                render={() => (
                                    <FormItem >
                                        <div className=' mb-4'>
                                            <FormLabel>Ek Teminatlar :</FormLabel>
                                        </div>
                                        <div className='flex items-center flex-wrap gap-4'>
                                            {ekTeminatlar.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="ekTeminatlar"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex flex-row items-center space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="text-sm font-normal">
                                                                    {item.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='police'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Yürürlükte poliçeniz var mı ?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className='flex items-center gap-10'
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='var' id='varPolice' onClick={() => setIsPolice('var')} />
                                            </FormControl>
                                            <Label htmlFor='varPolice'>Var</Label>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0' >
                                            <FormControl>
                                                <RadioGroupItem value='yok' id='yokPolice' onClick={() => setIsPolice('yok')} />
                                            </FormControl>
                                            <Label htmlFor='yokPolice'>Yok</Label>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {isPolice === 'var' && (
                        <>
                            <div className='flex items-end space-x-2'>
                                <FormField
                                    control={form.control}
                                    name='sigortaSirketi'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >Sigorta Şirketi :</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Şirket adı' {...field} />
                                            </FormControl>

                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='acentaNumarasi'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormControl>
                                                <Input placeholder='Acenta Numarası' type='number' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex items-end space-x-2'>
                                <FormField
                                    control={form.control}
                                    name='policeNumarasi'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >Poliçe Nuamarası :</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Poliçe Numaranız' {...field} />
                                            </FormControl>

                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='yenilemeNumarasi'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormControl>
                                                <Input placeholder='Yenileme Numarası' type='number' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name='policeBitisTarihi'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel >Poliçe Bitiş Tarihi :</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Poliçe Numaranız' {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                </div>



                <Separator className='my-6' />
                {/* İLETİŞİM BİLGİLERİ */}
                <div className='flex flex-col gap-4'>
                    <TitleH3>İletişim Bilgileri</TitleH3>
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
                    <FormField
                        control={form.control}
                        name='mesaj'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mesajınız :</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='İletmek istediğiniz bir mesajınız var ise'
                                        className='resize-none'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full md:w-2/3' type='submit'>
                    Teklif Al
                </Button>
                {/* DOGRULAMA VE GÖNDERME  */}
            </form>


        </Form >
    )
}

export default FerdiKazaForm