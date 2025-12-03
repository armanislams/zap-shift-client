import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({r}) => {
    const { userName, review, user_photoURL } = r;
    return (
      <div>
        <div className="max-w-sm rounded-2xl bg-white p-6 shadow-md border border-gray-200">
          {/* Quote icon */}
          <FaQuoteLeft className="text-teal-400 text-2xl mb-3" />

          {/* Message */}
          <p className="text-gray-700 leading-relaxed mb-4">{review}</p>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-300 my-4" />

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10  ">
              <img className="rounded-full" src={user_photoURL} alt="" />
            </div>
            <div>
              <h3 className="font-semibold text-teal-900">{userName}</h3>
              <p className="text-gray-500 text-sm">Senior Product Designer</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ReviewCard;