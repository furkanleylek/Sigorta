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

const items = [
    {
        id: "recents",
        label: "Recents",
    },
    {
        id: "home",
        label: "Home",
    },
    {
        id: "applications",
        label: "Applications",
    },
    {
        id: "desktop",
        label: "Desktop",
    },
    {
        id: "downloads",
        label: "Downloads",
    },
    {
        id: "documents",
        label: "Documents",
    },
] as const

const DaskForm = () => {

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

        binaInsaYili: z.string(),
        yapitarzi: z.string().min(2),
        kullanimSekli: z.string().min(2),
        brutalan: z.string(),
        katSayisi: z.string(),
        rizikoAdresi: z.string().min(2),
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
            const URL = `https://sigorta-admin-panel.vercel.app/api/dask`
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full lg:w-2/3'>
                {/* RUHSAT SAHİBİ BİLGİLERİ */}
                {/* <TitleH2 className='mb-6'>Dask Sigortası </TitleH2> */}
                <FormContainer>
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
                    <TitleH3>Bina Bilgileri</TitleH3>
                    <FormField
                        control={form.control}
                        name='binaInsaYili'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bina İnşa Yılı :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={4}
                                        placeholder='Binanızın inşa yılı'
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
                        name='yapitarzi'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Yapı Tarzı :</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Yapı Tarzını Seçiniz' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='Çelik'>Çelik</SelectItem>
                                        <SelectItem value='Betonarme'>Betonarme</SelectItem>
                                        <SelectItem value='Diğer'>Diğer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='kullanimSekli'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kullanım Şekli :</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Kullanım şeklini seçiniz' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='Büro'>Büro</SelectItem>
                                        <SelectItem value='Mesken'>Mesken</SelectItem>
                                        <SelectItem value='Ticarethane'>Ticarethane</SelectItem>
                                        <SelectItem value='Diger'>Diğer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <div className='flex items-end space-x-2'>
                        <FormField
                            control={form.control}
                            name='brutalan'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Brüt Alanı :</FormLabel>
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
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='katSayisi'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Brüt Alanı :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={2}
                                            placeholder='Kat Sayısı'
                                            value={field.value as string}
                                            onChange={(e) => {
                                                const numericValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları al

                                                if (numericValue.length <= 2) {
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
                        name='hasar'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Binanızda hasar var mı ?  </FormLabel>
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


        </Form>
    )
}

export default DaskForm