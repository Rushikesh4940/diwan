import { Hero } from '../components/Hero'
import { IntroStatement } from '../components/IntroStatement'
import { ServiceGrid } from '../components/ServiceGrid'
import { TyreDecoder } from '../components/TyreDecoder'
import { InspectionBand } from '../components/InspectionBand'
import { BranchList } from '../components/BranchList'
import { EnquiryForm } from '../components/EnquiryForm'
import { useSeo } from '../lib/useSeo'

export function Home() {
  useSeo(
    'Tyres, wheels and batteries in Thane & Bhiwandi',
    'Car and bike tyres, alloy wheels, batteries, wheel alignment and balancing at four Diwan Auto Care branches in Thane and Bhiwandi. Independent website concept.',
  )
  return (
    <>
      <Hero />
      <IntroStatement />
      <ServiceGrid />
      <TyreDecoder />
      <InspectionBand />
      <BranchList />
      <EnquiryForm />
    </>
  )
}
