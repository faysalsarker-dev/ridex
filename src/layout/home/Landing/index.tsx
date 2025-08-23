
import HowItWorks from '@/components/custom/HowItWorks';
import Hero from './../../../components/custom/Hero';
import AboutUs from '@/components/custom/AboutUs';
import Testimonials from '@/components/custom/Testimonials';
import Cta from '@/components/custom/Cta';
import ServiceHighlights from '@/components/custom/ServiceHighlights';

const index = () => {
    return (
        <div className='max-w-6xl mx-auto px-2'>
            <Hero/>
            <HowItWorks/>
            <AboutUs/>
            <Testimonials/>
            <Cta/>
            <ServiceHighlights/>

        </div>
    );
};

export default index;