import React from 'react';
import { useText } from '../../hooks/useText';

const Banner = () => {
  const t = useText("banner");

  return (
    <div className="w-full py-2.5 font-medium text-sm text-green-800 text-center bg-gradient-to-r from-[#ABFF7E] to-[#FDFEFF]">
      <p>
        <span className="px-3 py-1 rounded-lg text-white bg-green-600 mr-2">{t.badge}</span>
        {t.text}
      </p>
    </div>
  )
}

export default Banner;