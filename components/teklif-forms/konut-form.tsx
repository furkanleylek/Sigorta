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
        id: "Panjur",
        label: "Panjur",
    },
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

const KonutForm = () => {

    const { setOpenModal } = useSigortaContext()
    const [loading, setLoading] = useState(false)
    const [isPolice, setIsPolice] = useState('')
    const [isBasvuran, setIsBasvuran] = useState('Şahıs')

    const formSchema = z.object({
        basvuran: z.enum(["Şahıs", "Yabancı Şahıs"]),
        ...(isBasvuran === 'Şahıs' ? {
            kullaniciAdi: z.string().min(2, {
                message: 'Kullanıcı ismi girilmesi gerekiyor .'
            }),
            tcKimlik: z.string().refine((value) => value.length === 11 && /^\d+$/.test(value)),
        } : {}),
        ...(isBasvuran === 'Yabancı Şahıs' ? {
            kullaniciAdi: z.string().min(2, {
                message: 'Kullanıcı ismi girilmesi gerekiyor .'
            }),
            pasaportNo: z.number(),
        } : {}),

        dogumTarihi: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).min(2),

        yapitarzi: z.string().min(2),
        ikametgah: z.enum(['sürekli', 'dönemsel']),
        binabedeli: z.string(),
        cambedeli: z.string(),
        esyabedeli: z.string(),
        kiymetliesyabedeli: z.string(),
        brütalan: z.string(),

        rizikoAdresi: z.string().min(2),
        korumaOnlemleri: z.array(z.string()).refine((value) => value.some((item) => item)).optional(),
        hasar: z.enum(["var", "yok"]),

        police: z.enum(["var", "yok"]),
        ...(isPolice === 'var' ? {
            daskPoliceNo: z.string(),
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

            ikametgah: 'sürekli',
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
            if (values.korumaOnlemleri === undefined) {
                values.korumaOnlemleri = [''];
            }
            setLoading(true)
            const URL = `https://sigorta-admin-panel.vercel.app/api/konut`
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

                {/* <TitleH2 className='mb-6'>Konut Sigortası </TitleH2> */}

                <FormContainer >
                    <TitleH3>Kişisel Bilgiler</TitleH3>
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
                                                <RadioGroupItem value='Şahıs' id='sahis' onClick={() => setIsBasvuran('Şahıs')} />
                                            </FormControl>
                                            <Label htmlFor='sahis'>Şahıs</Label>
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
                <FormContainer >
                    <TitleH3>Konut Bilgileri</TitleH3>
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
                                        <SelectItem value='Apartman Dairesi'>Apartman Dairesi</SelectItem>
                                        <SelectItem value='Müstakil Konut'>Müstakil Konut</SelectItem>
                                        <SelectItem value='Villa'>Villa</SelectItem>
                                        <SelectItem value='Diğer'>Diğer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='ikametgah'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>İkametgah Durumu :</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className='flex items-center gap-10'
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='sürekli' id='sürekli' />
                                            </FormControl>
                                            <Label htmlFor='sürekli'>Sürekli</Label>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='dönemsel' id='dönemsel' />
                                            </FormControl>
                                            <Label htmlFor='dönemsel'>Dönemsel ( Yazlık vb. )</Label>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-col md:flex-row items-center gap-3 w-full'>
                        <FormField
                            control={form.control}
                            name='binabedeli'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Bina Bedeli :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={4}
                                            placeholder='Bina Bedeliniz'
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
                        />   <FormField
                            control={form.control}
                            name='cambedeli'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Cam Bedeli :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={4}
                                            placeholder='Cam Bedeliniz'
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
                    <div className='flex flex-col md:flex-row items-center gap-3 w-full'>
                        <FormField
                            control={form.control}
                            name='esyabedeli'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Eşya Bedeli :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={4}
                                            placeholder='Eşya Bedeliniz'
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
                            name='kiymetliesyabedeli'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Kıymetli Eşya Bedeli :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={4}
                                            placeholder='Kıymetli Eşya Bedeli'
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
                        name='brütalan'
                        render={({ field }) => (
                            <FormItem>
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
                                            <FormLabel className="text-base">Mevcut Koruma Önlemleri :</FormLabel>
                                        </div>
                                        <div className='flex items-center flex-wrap gap-4'>
                                            {korumaOnlemleri.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="korumaOnlemleri"
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
                        name='hasar'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Konutunuzda hasar var mı ?  </FormLabel>
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
                    <FormField
                        control={form.control}
                        name='police'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Konutunuzun DASK poliçesi var mı ?</FormLabel>
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
                                name='daskPoliceNo'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel >Dask Poliçe Numarası :</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={4}
                                                placeholder='Dask poliçe numaranız'
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
                        </>
                    )}
                </FormContainer>

                <Separator className='my-6' />
                {/* İLETİŞİM BİLGİLERİ */}
                <FormContainer >
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

export default KonutForm