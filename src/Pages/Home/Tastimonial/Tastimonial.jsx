import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import q from '../../../assets/banner/icons8-get-quote-50.png';
import SectionTitle from '../../../components/SectionTitle';

const Tastimonial = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('/reviews.json')
            .then(response => response.json())
            .then((data) => {
                console.log('test', data);
                setReviews(data)
            })


    }, [])
    return (
        <section>
            <SectionTitle
                subHeading={'what our client say'}
                heading={'Testimonials'}
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper my-4 ">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                        className='text-center md:px-48'
                    >
                        <div>
                            <Rating className='w-1/2 mx-auto  my-4' style={{ maxWidth: 250 }} value={review.rating} readOnly />
                            <img src={q} className='w-16 mx-auto mb-4' alt="" />
                            <p>{review.details}</p>
                            <h3 className='text-2xl text-orange-500 font-semibold my-2'>{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
}

export default Tastimonial;