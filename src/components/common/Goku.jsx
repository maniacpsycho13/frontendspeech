import React from 'react';

const Goku = () => {
  return (
    <div className="w-[700px] h-[600px]   overflow-hidden relative">
      <spline-viewer
        url="https://prod.spline.design/EqROKnvsluET6lkx/scene.splinecode"
        style={{
          width: '2000px', // Increase width to avoid zooming in
          height: '1000px', // Increase height to avoid zooming in
          transform: 'scale(1.0) translate(-50%, -60%)', // Adjust scale and position to fit within the div
          transformOrigin: 'center', // Ensure scaling is applied from the center
          position: 'absolute', // Ensure proper positioning inside the div
          top: '50%',
          left: '50%',
        }}
      ></spline-viewer>
    </div>
  );
};

export default Goku;