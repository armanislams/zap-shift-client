import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reveiws/Reviews';

const review = fetch('/reviews.json').then(res=>res.json())
const Home = () => {
    return (
        <div className='py-5'>
            <Banner></Banner>
            <Brands></Brands>
            <Reviews review={review}></Reviews>
        </div>
    );
};

export default Home;