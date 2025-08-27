
import HowItWorks from '@/components/custom/HowItWorks';
import Hero from './../../../components/custom/Hero';
import AboutUs from '@/components/custom/AboutUs';
import Testimonials from '@/components/custom/Testimonials';
import Cta from '@/components/custom/Cta';
import ServiceHighlights from '@/components/custom/ServiceHighlights';
import FeaturesShowcase from '@/components/custom/FeaturesShowcase';
import ContactForm from '@/components/custom/ContactForm';
import FAQSection from '@/components/custom/FAQSection';

const index = () => {
    return (
        <div className='max-w-6xl mx-auto px-2 overflow-x-hidden'>
            <Hero/>
            <HowItWorks/>
            <FeaturesShowcase/>
            <ServiceHighlights/>
            <AboutUs/>
            <Testimonials/>
            <Cta/>
            <ContactForm/>
            <FAQSection/>

        </div>
    );
};

export default index;