import React from 'react';
import { useNavigate } from 'react-router';

const Unauthorized = () => {
    const navigate = useNavigate()
    return (
        <div className='px-12 py-10'>
            <h1 className="py-5 text-4xl text-red-500">FORBIDDEN / UNAUTHORIZED ACCESS , PLEASE RETURN</h1>
                <button onClick={()=> navigate('/')} className="btn">Return Home</button>
        </div>
    );
};

export default Unauthorized;