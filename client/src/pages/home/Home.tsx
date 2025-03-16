import SEO from '@/components/ui/SEO'
import React from 'react'
import HeroSection from './component/HeroSection'
import PopularCategorie from './component/PopularCategorie'
import SpecialeDesher from './component/SpecialeDesher'
import AutreServices from './component/AutreServices'

const Home: React.FC = () => {
    return (
        <div className='dark:bg-dark'>
            {/* Seo compoments */}
            <SEO
                title='Welcome to iPhone Store Cameroon - Your Trusted Apple Partner'
                description='Explore the latest iPhones and accessories at unbeatable prices. Enjoy a seamless shopping experience on our modern e-commerce platform.'
            />

            {/* App Comoments */}
            <>
                <HeroSection />
                <PopularCategorie />
                <SpecialeDesher />
                <AutreServices />
            </>
        </div>
    )
}

export default Home
