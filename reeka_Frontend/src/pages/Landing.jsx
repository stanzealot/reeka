import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import GLightbox from 'glightbox';
import AOS from 'aos';
import 'glightbox/dist/css/glightbox.css';
import 'aos/dist/aos.css';
import { Spin } from 'antd';


import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';

import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import HeroTerms from '../components/terms/HeroTerms';
import UpdatePriceModal from '../components/modals/UpdatePriceModal';



function Landing() {
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

 
  const [isStoreModal,setStoreModal] = useState(false)


  const [isGetApp,setIsGetApp] = useState(false)
  
    
  
    
  
  
  //   useEffect(() => {
  //     if(isStoreModal) {
  //       document.body.style.overflow = 'hidden';
  //     } else{
  //       document.body.style.overflow = 'unset';
  
  //     }
  //  }, [isStoreModal ]);
   // Fetch properties from the backend
   const fetchProperties = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get('http://localhost:4000/api/property');
      setProperties(response.data);
      console.log('Data fetched:', response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }finally {
      setLoading(false); // Stop loading
    }
  };

   useEffect(() => {
    fetchProperties();
  }, []);
  
  
    useEffect(() => {
      // Initialize GLightbox
      const lightbox = GLightbox({
        selector: '.glightbox',
      });
  
      // Initialize AOS (Animate On Scroll)
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
  
      // Cleanup on component unmount
      return () => {
        lightbox.destroy();
      };
    }, []);

    // Handler to open the modal
  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };
    
  
    return (
      <div className='page'>
      
      <Header />

      {/* <Hero setIsGetApp={setIsGetApp}  /> */}
      <HeroTerms
        subtitle="Transforming Rental Management"
        title="Rental Management That Elevates Your Business"
        description="Reeka is your trusted partner in modern rental management. We provide innovative tools and solutions to streamline operations, maximize efficiency, and elevate your business to new heights. Whether you're managing a single property or a large portfolio, Reeka is here to make your life easier."
      />

      <main id="">
    
      <section id="gallery" class="gallery">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Rentals</h2>
          <p>Check our Properties</p>
        </div>
       
          {loading ? (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Spin size="large" />
              </div>
            ) : (
              <div className="row g-0" data-aos="fade-left" style={{ gap: '20px' }}>
                {properties.map((property) => (
                  <ProductCard key={property.id} property={property} onUpdatePriceClick={handleOpenModal}
                />
                ))}
              </div>
            )}
          
        </div>
      
      </section>
      
     
  
    
  
      </main>
      {/* Render the UpdatePriceModal */}
      {isModalOpen && selectedProperty && (
        <UpdatePriceModal
          property={selectedProperty}
          setIsModalOpen={setIsModalOpen}
          onPriceUpdate={fetchProperties}
        />
      )}
     
     
     
      <ToastContainer />
      </div>
      
    );
}

export default Landing