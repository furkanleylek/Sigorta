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
import FormContainer from './form-container'


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
    const [isBasvuran, setIsBasvuran] = useState('Şahıs')


    const formSchema = z.object({
        basvuran: z.enum(["Şahıs", "Şirket", "Yabancı Şahıs"]),
        ...(isBasvuran === 'Şahıs' ? {
            kullaniciAdi: z.string().min(2, {
                message: 'Kullanıcı ismi girilmesi gerekiyor .'
            }),
            tcKimlik: z.string().refine((value) => value.length === 11 && /^\d+$/.test(value)),
            meslek: z.string().min(2),
        } : {}),
        ...(isBasvuran === 'Şirket' ? {
            sirketUnvani: z.string().min(2),
            vergiNo: z.number(),
            faaliyetKonusu: z.string().min(2),
            calısanSayisi: z.number(),
        } : {}),
        ...(isBasvuran === 'Yabancı Şahıs' ? {
            kullaniciAdi: z.string().min(2, {
                message: 'Kullanıcı ismi girilmesi gerekiyor .'
            }),
            pasaportNo: z.number(),
            meslek: z.string().min(2),
        } : {}),

        dogumTarihi: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).min(2),

        police: z.enum(["var", "yok"]),
        ...(isPolice === 'var' ? {
            sigortaSirketi: z.string().min(2),
            policeNumarasi: z.string(),
            policeBitisTarihi: z.string(),
        } : {}),
        teminatMiktari: z.string(),
        ekTeminatlar: z.array(z.string()).refine((value) => value.some((item) => item)).optional(),

        adres: z.string(),
        telefonNumarasi: z.string().refine((value) => /^0\d{3} \d{3} \d{2} \d{2}$/.test(value)).optional(),
        eposta: z.string(),
        mesaj: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            kullaniciAdi: '',
            basvuran: 'Şahıs',
            tcKimlik: '',
            meslek: '',

            police: 'yok',

            adres: '',
            eposta: '',
            telefonNumarasi: '',
            mesaj: ''
        }
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (values.ekTeminatlar === undefined) {
                values.ekTeminatlar = [''];
            }

            setLoading(true)
            const URL = `http://localhost:3000/api/ferdikaza`
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
                <TitleH2 className='mb-6'>Ferdi Kaza Sigortası </TitleH2>
                <FormContainer>
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
                                                <RadioGroupItem value='Şahıs' id='sahis' onClick={() => setIsBasvuran('Şahıs')} />
                                            </FormControl>
                                            <Label htmlFor='sahis'>Şahıs</Label>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='Şirket' id='sirket' onClick={() => setIsBasvuran('Şirket')} />
                                            </FormControl>
                                            <Label htmlFor='sirket'>Şirket</Label>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='Yabancı Şahıs' id='yabanci-sahis' onClick={() => setIsBasvuran('Yabancı Şahıs')} />
                                            </FormControl>
                                            <Label htmlFor='yabanci-sahis'>Yabancı Uyruklu Şahıs</Label>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}

                    />
                    {
                        isBasvuran === 'Şahıs' && (
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
                                <FormField
                                    control={form.control}
                                    name='meslek'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meslek :</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Mesleğiniz' {...field} {...field} value={field.value as string} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                    }
                    {
                        isBasvuran === 'Şirket' && (
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
                                <FormField
                                    control={form.control}
                                    name='faaliyetKonusu'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Faaliyet Konusu :</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Faaliyet konusu' {...field} {...field} value={field.value as string} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='calısanSayisi'
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Çalışan Sayısı :</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Çalışan sayısı'
                                                    type='number'
                                                    {...field}
                                                    value={field.value as number ?? ''}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value ? parseInt(e.target.value) : undefined);
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
                        isBasvuran === 'Yabancı Şahıs' && (
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
                                <FormField
                                    control={form.control}
                                    name='meslek'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meslek :</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Mesleğiniz' {...field} {...field} value={field.value as string} />
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

                {/* POLİÇE BİLGİLERİ */}
                <FormContainer>
                    <TitleH3>Poliçe Bilgileri</TitleH3>

                    <FormField
                        control={form.control}
                        name='teminatMiktari'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Vefat Halinde İstenecek Teminat Miktarı :</FormLabel>
                                <div className='relative'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={7}
                                            placeholder='İstediğiniz teminat miktarı'
                                            value={field.value as string}
                                            onChange={(e) => {
                                                const numericValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları al

                                                if (numericValue.length <= 7) {
                                                    field.onChange(numericValue);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <span className='absolute top-2 right-10 h-full items-center text-center font-semibold text-md'>₺</span>
                                </div>
                            </FormItem>
                        )}
                    />

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
                                                        const value = field.value || [];
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
                                                                                ? field.onChange([...value, item.id])
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
                <Button className='w-full md:w-2/3 mt-6' type='submit'>
                    Teklif Al
                </Button>
                {/* DOGRULAMA VE GÖNDERME  */}
            </form>


        </Form >
    )
}

export default FerdiKazaForm