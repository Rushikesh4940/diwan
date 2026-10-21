import { Hero } from '../components/Hero'
import { IntroStatement } from '../components/IntroStatement'
import { ServiceGrid } from '../components/ServiceGrid'
import { TyreDecoder } from '../components/TyreDecoder'
import { StoreProof } from '../components/StoreProof'
import { BranchList } from '../components/BranchList'
import { EnquiryForm } from '../components/EnquiryForm'
import { useSeo } from '../lib/useSeo'

export function Home() {
  useSeo(
    'Tyres, wheels and batteries in Thane & Mumbai',
    'Car and bike tyres, alloy wheels, batteries, wheel alignment and balancing at six Diwan Auto Care branches in Thane, Bhiwandi and Mumbai. Independent website concept.',
  )
  return (
    <>
      <Hero />
      <IntroStatement />
      <ServiceGrid />
      <TyreDecoder />
      <StoreProof />
      <BranchList />
      <EnquiryForm />
    </>
  )
}
