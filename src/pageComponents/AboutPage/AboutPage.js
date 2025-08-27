import AboutSec from '@/components/AboutComponents/AboutSec'
import BreadcrumbBanner from '@/components/BreadcrumbBanner/BreadcrumbBanner'
import { CONTACT_BG_7 } from '@/constants/images'
import React from 'react'

const AboutPage = () => {
    return (
        <div>
            <BreadcrumbBanner
                backgroundImage={CONTACT_BG_7}
                breadcrumb={["Home", "About Us"]}
                title="About Us"
            />
            <AboutSec />

        </div>
    )
}

export default AboutPage