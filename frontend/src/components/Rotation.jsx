import React, { useEffect, useState } from 'react';
import '../cssfiles/rotation.css';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.webp';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const RotatingCircle = () => {
  const [images] = useState([
    image1,
   image2,
    image3,
    image4,
    image5,
  ]);

  const radius = 150; // Radius of the circle
  const angleStep = 360 / images.length;

  return (
    <div className="circle-container" style={{ perspective: '700px', height: '250px', width: '250px' }}>
      <div
        className="circle"
        id="circle"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          animation: 'rotateHorizontal 10s linear infinite',
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`circle-image-${index}`}
            style={{
              transform: `rotateY(${index * angleStep}deg) translateZ(${radius}px)`,
            }}
            className="border-8 border-white"
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingCircle;
