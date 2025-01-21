import React from 'react';

const NewGoku = () => {
  return (
    <div className="w-[300px] h-[300px]  overflow-hidden relative">
      <spline-viewer
        url="https://prod.spline.design/EqROKnvsluET6lkx/scene.splinecode"
        style={{
          width: '1000px', // Increase width to avoid zooming in
          height: '1000px', // Increase height to avoid zooming in
          transform: 'scale(0.5) translate(-102%, -110%)', // Adjust scale and position to fit within the div
          transformOrigin: 'center', // Ensure scaling is applied from the center
          position: 'absolute', // Ensure proper positioning inside the div
          top: '50%',
          left: '50%',
        }}
      ></spline-viewer>
    </div>
  );
};

export default NewGoku;