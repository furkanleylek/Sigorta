import React from 'react'
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

const formSchema = z.object({
    sahiptürü: z.enum(["sahis", "sirket", "yabanci-sahis"]),
    kullanıcıadı: z.string().min(2, {
        message: 'Kullanıcı ismi girilmesi gerekiyor .'
    }),
    tcKimlik: z.string().refine((value) => value.length === 11 && /^\d+$/.test(value)),
    plakano: z.string(),
    marka: z.string(),
    modelyılı: z.string(),
    ASBISno: z.string().refine((value) => value.length === 19 && /^\d+$/.test(value)),
    poliçe: z.enum(["var", "yok"]),
    adres: z
        .string()
        .min(10, {
            message: "Adres en az 10 karakter olmalı.",
        }),
    telefonNumarası: z.string().refine((value) => /^0\d{3} \d{3} \d{2} \d{2}$/.test(value)),
    eposta: z.string(),
    mesaj: z.string(),
})

const TrafikForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            kullanıcıadı: ''
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

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
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Sadece rakamları al

        if (numericValue.length > 11) {
            return;
        }

        e.target.value = numericValue;
    };


    return (
        <Form {...form}>
            <form className='flex flex-col gap-4 w-full md:w-2/3'>
                {/* RUHSAT SAHİBİ BİLGİLERİ */}
                <div className='flex flex-col gap-4'>
                    <TitleH2 className='mb-6'>Trafik Sigortası </TitleH2>
                    <Separator />
                    <TitleH3>Ruhsat Sahibi Bilgileri</TitleH3>
                    <FormField
                        control={form.control}
                        name='sahiptürü'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sahip Türü :</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className='flex items-center gap-10'
                                        defaultValue='sahis'
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='sahis' id='sahis' />
                                            </FormControl>
                                            <Label htmlFor='sahis'>Şahıs</Label>
                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='sirket' id='sirket' />
                                            </FormControl>
                                            <Label htmlFor='sirket'>Şirket</Label>

                                        </FormItem>
                                        <FormItem className='flex items-center space-x-2 space-y-0'>
                                            <FormControl>
                                                <RadioGroupItem value='yabancı-sahis' id='yabanci-sahis' />
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
                        name='kullanıcıadı'
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
                                        onChange={onInputChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Separator className='my-6' />
                {/* ARAÇ BİLGİLERİ */}
                <div className='flex flex-col gap-4'>
                    <TitleH3>Araç Bilgileri</TitleH3>
                    <FormField
                        control={form.control}
                        name='plakano'
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
                        name='tcKimlik'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kullanım Tarzı :</FormLabel>
                                <Select>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Kullanım Tarzını Seçiniz' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='motosiklet'>Motosiklet</SelectItem>
                                        <SelectItem value='özelotomobil'>Özel Otomobil</SelectItem>
                                        <SelectItem value='taksi'>Taksi</SelectItem>
                                        <SelectItem value='dolmus'>Dolmuş</SelectItem>
                                        <SelectItem value='minibus'>Minibüs</SelectItem>
                                        <SelectItem value='otobus'>Otobüs</SelectItem>
                                        <SelectItem value='kamyon'>Kamyon</SelectItem>
                                        <SelectItem value='kamyonet'>Kamyonet</SelectItem>
                                        <SelectItem value='diger'>Diğer</SelectItem>
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
                                <FormItem>
                                    <FormLabel>Marka : </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Marka' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='modelyılı'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model Yılı : </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={11}
                                            placeholder="Model Yılı"
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.tcKimlik ? 'border-red-500' : ''
                                                }`}
                                            onChange={onInputChange}
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
                                        onChange={onInputChange}
                                    />
                                </FormControl>
                                <FormDescription className='text-xs ml-4 italic'>
                                    Yeni tescil işlemlerinde geçici ruhsat belgesinde yazan ASBİS numarasını, diğer işlemlerde ruhsat üzerindeki seri numarayı kullanın.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Separator className='my-6' />
                {/* POLİÇE BİLGİLERİ */}
                <div className='flex flex-col gap-4'>
                    <TitleH3>Poliçe Bilgileri</TitleH3>
                    <FormField
                        control={form.control}
                        name='poliçe'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Yürürlükte poliçeniz var mı ?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className='flex items-center gap-10'
                                        defaultValue='sahis'
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
                        name='adres'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefon Numarası :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='text'
                                        maxLength={14}
                                        placeholder='Telefon Numaranız'
                                        onChange={onPhoneChange}
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
                {/* DOGRULAMA VE GÖNDERME  */}

                <Button>
                    Teklif Al
                </Button>
            </form>
        </Form>
    )
}

export default TrafikForm