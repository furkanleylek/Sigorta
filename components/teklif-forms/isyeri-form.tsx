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

import { useSigortaContext } from '../context'
import { Checkbox } from '../ui/checkbox'
import FormContainer from './form-container'

const korumaOnlemleri = [
    {
        id: "Demir Kepenk",
        label: "Demir Kepenk",
    },
    {
        id: "Demir Parmaklık",
        label: "Demir Parmaklık",
    },
    {
        id: "Güvenlik",
        label: "Güvenlik",
    },
    {
        id: "Alarm",
        label: "Alarm",
    },
    {
        id: "Kamera",
        label: "Kamera",
    },
] as const


export const IsyeriForm = () => {

    const { setOpenModal } = useSigortaContext()
    const [loading, setLoading] = useState(false)
    const [isPolice, setIsPolice] = useState('')
    const [isSahipTuru, setIsSahipTuru] = useState('Şahıs')



    const formSchema = z.object({
        basvuran: z.enum(["Şahıs", "Şirket", "Yabancı Şahıs"]),
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

        dogumTarihi: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).min(2),

        isyeri: z.string().min(2),
        faaliyetKonusu: z.string().min(2),
        calısanSayısı: z.string(),
        brütalan: z.string(),
        rizikoAdresi: z.string().min(2),
        korumaOnlemleri: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
        }),
        hasar: z.enum(["var", "yok"]),


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



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            kullaniciAdi: '',
            basvuran: 'Şahıs',
            tcKimlik: '',

            rizikoAdresi: '',
            korumaOnlemleri: [''],

            police: 'yok',

            adres: '',
            telefonNumarasi: '',
            eposta: '',
            mesaj: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
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
        if (numericValue.length > 4) {
            return;
        }

        e.target.value = numericValue;

        return numericValue

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full lg:w-2/3'>
                {/* RUHSAT SAHİBİ BİLGİLERİ */}
                <TitleH2 className='mb-6'>İş Yeri Sigortası </TitleH2>
                <FormContainer className='flex flex-col gap-4'>
                    <TitleH3>Sigortalı\Sigorta Ettiren Bilgileri</TitleH3>
                    <FormField
                        control={form.control}
                        name='basvuran'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Başvuran :</FormLabel>
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
                                                <Input placeholder='Şirket ünvanınız' {...field} value={field.value as string} />
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



                </FormContainer>
                <Separator className='my-6' />
                {/* KONUT BİLGİLERİ */}
                <FormContainer>
                    <TitleH3>İş Yeri Bilgileri</TitleH3>
                    <FormField
                        control={form.control}
                        name='isyeri'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>İş Yeri Durumu:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Yapı Tarzını Seçiniz' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='Apartman Dairesi'>Apartman Dairesi</SelectItem>
                                        <SelectItem value='Magaza / Dükkan'>Mağaza / Dükkan</SelectItem>
                                        <SelectItem value='Depo'>Depo</SelectItem>
                                        <SelectItem value='İş Hanı / Ofis'>İş Hanı / Ofis</SelectItem>
                                        <SelectItem value='Fabrika'>Fabrika</SelectItem>
                                        <SelectItem value='Diger'>Diğer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='faaliyetKonusu'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Faaliyet Konusu :</FormLabel>
                                <FormControl>
                                    <Input placeholder='Faaliyet Konunuz'  {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='calısanSayısı'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Çalışan Sayısı :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={4}
                                        placeholder='Çalışan Sayınız' value={field.value as string}
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
                        name='brütalan'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brüt Alanı :</FormLabel>
                                <div className='relative'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={4}
                                            placeholder='Brüt Alanınız'
                                            value={field.value as string}
                                            onChange={(e) => {
                                                const numericValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları al

                                                if (numericValue.length <= 4) {
                                                    field.onChange(numericValue);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <span className='absolute top-2 right-10 h-full items-center text-center font-semibold text-md ordinal'>m²</span>
                                </div>
                            </FormItem>
                        )}
                    />

                    <span>BİNA BEDELİ</span>
                    <span>EMTİA BEDELİ</span>
                    <span>CAM BEDELİ</span>
                    <span>KASA MUHTEVİYATI BEDELİ</span>

                    <FormField
                        control={form.control}
                        name='rizikoAdresi'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Riziko Adresi UAVT Kodu :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={15}
                                        placeholder='Riziko Adresi'
                                        value={field.value as string}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları al

                                            if (numericValue.length <= 15) {
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
                        name="korumaOnlemleri"
                        render={() => (
                            <FormField
                                control={form.control}
                                name="korumaOnlemleri"
                                render={() => (
                                    <FormItem >
                                        <div className=' mb-4'>
                                            <FormLabel >Mevcut Koruma Önlemleri :</FormLabel>
                                        </div>
                                        <div className='flex items-center flex-wrap gap-4'>
                                            {korumaOnlemleri.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="korumaOnlemleri"
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
                        name='hasar'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>İş yerinizde hasar var mı ?  </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className='flex items-center gap-10'
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='var' id='var' />
                                            </FormControl>
                                            <Label htmlFor='var'>Var</Label>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='yok' id='yok' />
                                            </FormControl>
                                            <Label htmlFor='yok'>Yok</Label>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </FormContainer>

                <Separator className='my-6' />

                {/* POLİÇE BİLGİLERİ */}
                <FormContainer>
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
                            <div className='flex items-end space-x-2'>
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

                            </div>
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
                </FormContainer>

                <Separator className='my-6' />

                {/* İLETİŞİM BİLGİLERİ */}
                <FormContainer>
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
                </FormContainer>
                <Button className='w-full md:w-2/3 mt-6'>
                    Teklif Al
                </Button>
                {/* DOGRULAMA VE GÖNDERME  */}
            </form>


        </Form >
    )
}

