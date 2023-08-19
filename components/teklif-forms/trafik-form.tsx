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


const kullanımTarzıData = [
    {
        value: "Otomobil",
    },
    {
        value: "Taksi",
    },
    {
        value: "Dolmuş",
    },
    {
        value: "Minibüs",
    },
    {
        value: "Otobüs",
    },
    {
        value: "Kamyonet",
    },
    {
        value: "Kamyon",
    },
    {
        value: "İş Makinesi",
    },
    {
        value: "Traktör",
    },
    {
        value: "Römork",
    },
    {
        value: "Motosiklet",
    },
    {
        value: "Tanker",
    },
    {
        value: "Çekici",
    },
    {
        value: "Özel Amaçlı Taksi",
    },
    {
        value: "Tarım Makinesi",
    },
    {
        value: "Diğer",
    },
] as const


const TrafikForm = () => {

    const { setOpenModal } = useSigortaContext()
    const [loading, setLoading] = useState(false)
    const [isPolice, setIsPolice] = useState('')
    const [isSahipTuru, setIsSahipTuru] = useState('Şahıs')

    const extendFormSchema = z.object({
        sahipturu: z.enum(["Şahıs", "Şirket", "Yabancı Şahıs"]),
        ...(isSahipTuru === 'Şahıs' ? {
            kullaniciAdi: z.string().min(2, {
                message: 'Kullanıcı ismi girilmesi gerekiyor .'
            }),
            tcKimlik: z.string().refine((value) => value.length === 11 && /^\d+$/.test(value)),
        } : {}),
        ...(isSahipTuru === 'Şirket' ? {
            sirketUnvani: z.string().min(2),
            vergiNo: z.number(),
        } : {}),
        ...(isSahipTuru === 'Yabancı Şahıs' ? {
            kullaniciAdi: z.string().min(2, {
                message: 'Kullanıcı ismi girilmesi gerekiyor .'
            }),
            pasaportNo: z.number(),
        } : {}),


        plakaNo: z.string().min(2),
        kullanimTarzi: z.string().min(2),
        marka: z.string().min(2),
        modelYili: z.string().refine((value) => value.length === 4 && /^\d+$/.test(value)),
        ASBISno: z.string().refine((value) => value.length === 19 && /^\d+$/.test(value)),


        police: z.enum(["var", "yok"]),
        ...(isPolice === 'var' ? {
            sigortaSirketi: z.string().min(2),
            policeNumarasi: z.string(),
            policeBitisTarihi: z.string(),
        } : {}),


        adres: z.string(),
        telefonNumarasi: z.string().refine((value) => /^0\d{3} \d{3} \d{2} \d{2}$/.test(value)),
        eposta: z.string(),
        mesaj: z.string(),

    })

    const form = useForm<z.infer<typeof extendFormSchema>>({
        resolver: zodResolver(extendFormSchema),
        defaultValues: {
            kullaniciAdi: '',
            sahipturu: 'Şahıs',
            tcKimlik: '',
            plakaNo: '',
            marka: '',
            ASBISno: '',
            police: 'yok',
            adres: '',
            telefonNumarasi: '',
            eposta: '',
            mesaj: ''
        }
    })


    function onSubmit(values: z.infer<typeof extendFormSchema>) {
        try {
            setLoading(true)
            // const URL = `http://localhost:3001/api/trafik`
            // const response = await fetch(URL, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(values)
            // })
            // form.reset();
            console.log("values:", values)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setOpenModal(true)
        }
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

            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full md:w-2/3 '>
                <TitleH2 className='mb-6'>Trafik Sigortası </TitleH2>
                <Separator />
                <TitleH3>Ruhsat Sahibi Bilgileri</TitleH3>
                {/* RUHSAT SAHİBİ BİLGİLERİ */}

                <FormField
                    control={form.control}
                    name='sahipturu'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sahip Türü :</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    className='flex items-center gap-10'
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormItem className='flex items-center space-x-2 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='Şahıs' id='sahis' onClick={() => setIsSahipTuru('Şahıs')} />
                                        </FormControl>
                                        <Label htmlFor='sahis'>Şahıs</Label>
                                    </FormItem>
                                    <FormItem className='flex items-center space-x-2 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='Şirket' id='sirket' onClick={() => setIsSahipTuru('Şirket')} />
                                        </FormControl>
                                        <Label htmlFor='sirket'>Şirket</Label>
                                    </FormItem>
                                    <FormItem className='flex items-center space-x-2 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='Yabancı Şahıs' id='yabanci-sahis' onClick={() => setIsSahipTuru('Yabancı Şahıs')} />
                                        </FormControl>
                                        <Label htmlFor='yabanci-sahis'>Yabancı Uyruklu Şahıs</Label>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {
                    isSahipTuru === 'Şahıs' && (
                        <>
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
                        </>
                    )
                }
                {
                    isSahipTuru === 'Şirket' && (
                        <>
                            <FormField
                                control={form.control}
                                name='sirketUnvani'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Şirket Ünvanı: </FormLabel>
                                        <FormControl>
                                            <Input placeholder='Adınız / Soyadınız' {...field} value={field.value as string} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='vergiNo'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vergi Numarası: </FormLabel>
                                        <FormControl>
                                            <Input placeholder='Vergi numaranız' {...field} value={field.value as string} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </>
                    )
                }
                {
                    isSahipTuru === 'Yabancı Şahıs' && (
                        <>
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
                                name='pasaportNo'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pasaport Numarası : </FormLabel>
                                        <FormControl>
                                            <Input placeholder='Pasaport numaranız' {...field} value={field.value as string} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </>
                    )
                }



                {/* DOĞUM TARİHİ EKLENECEK */}
                <Separator className='my-6' />
                {/* ARAÇ BİLGİLERİ */}
                <TitleH3>Araç Bilgileri</TitleH3>
                <FormField
                    control={form.control}
                    name='plakaNo'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Plaka No : </FormLabel>
                            <FormControl>
                                <Input placeholder='Plaka Numarası' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='kullanimTarzi'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kullanım Tarzı :</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Kullanım Tarzını Seçiniz' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='h-40 overflow-y-scroll'>
                                    {kullanımTarzıData.map((e) => (
                                        <SelectItem key={e.value} value={e.value}>{e.value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <div className='flex items-center gap-3'>
                    <FormField
                        control={form.control}
                        name='marka'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Marka : </FormLabel>
                                <FormControl>
                                    <Input placeholder='Marka' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='modelYili'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Model Yılı : </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={4}
                                        placeholder="Model Yılınız"
                                        value={field.value as string}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları al

                                            if (numericValue.length <= 4) {
                                                field.onChange(numericValue);
                                            }
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='ASBISno'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ruhsat Belge Seri No / ASBİS No : </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={19}
                                    placeholder="Ruhsat Belge Seri Numarası"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.tcKimlik ? 'border-red-500' : ''
                                        }`}
                                // onChange={onASBISChange}
                                />
                            </FormControl>
                            <FormDescription className='text-xs ml-4 italic'>
                                Yeni tescil işlemlerinde geçici ruhsat belgesinde yazan ASBİS numarasını, diğer işlemlerde ruhsat üzerindeki seri numarayı kullanın.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className='my-6' />
                {/* POLİÇE BİLGİLERİ */}
                <TitleH3>Poliçe Bilgileri</TitleH3>
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
                        <FormField
                            control={form.control}
                            name='sigortaSirketi'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel >Sigorta Şirketi :</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Şirket adı' {...field} value={field.value as string} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='flex items-end space-x-2'>
                            <FormField
                                control={form.control}
                                name='policeNumarasi'
                                render={({ field }) => (
                                    <FormItem className='w-3/4'>
                                        <FormLabel >Poliçe Numarası :</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={4}
                                                placeholder='Poliçe Numaranız'
                                                value={field.value as string}
                                                onChange={(e) => {
                                                    const numericValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları al

                                                    if (numericValue.length <= 4) {
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
                                name='policeBitisTarihi'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel >Poliçe Bitiş Tarihi :</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Bitiş tarihi' {...field} value={field.value as string} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </>
                )}

                <Separator className='my-6' />
                {/* İLETİŞİM BİLGİLERİ */}
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
                <Button className='w-full md:w-2/3' disabled={loading ? true : false}>
                    Teklif Al
                </Button>
                {/* DOGRULAMA VE GÖNDERME  */}
            </form>
        </Form>
    )
}

export default TrafikForm








