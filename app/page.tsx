import AllSigortaTypes from '@/components/main/sigorta-types/all-sigorta-types'
import NasılCalısır from '@/components/main/nasıl-calısır/nasıl-calısır'
import Landing from '@/components/main/landing/landing'
import Hakkımızda from '@/components/main/hakkımızda/hakkımızda'
import İletisim from '@/components/main/iletisim/iletisim'
export default function Home() {
  return (
    <main className="w-full flex h-full relative flex-col justify-center items-center space-y-12 lg:space-y-20 md:pt-0">
      <Landing />
      <NasılCalısır />
      <Hakkımızda />
      <AllSigortaTypes />
      <İletisim />
    </main>
  )
}
