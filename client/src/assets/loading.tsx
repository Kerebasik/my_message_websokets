import React from 'react';

function Loader() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='256'
      height='256'
      version='1'
      viewBox='0 0 128 128'
    >
      <g>
        <path fill='#fc3' d='M70.48 35.8l-6.16-6.24-6.16 6.26L64.32.88z'></path>
        <path
          fill='#fffaea'
          d='M83.712 42.818l-2.215-8.484-8.465 2.341L95.837 9.496zM91.662 55.512l2.324-8.455-8.501-2.205 33.339-12.135zM92.2 70.48l6.24-6.16-6.26-6.16 34.94 6.16zM85.182 83.712l8.484-2.215-2.341-8.465 27.179 22.805zM72.488 91.662l8.455 2.324 2.205-8.501 12.135 33.339zM57.52 92.2l6.16 6.24 6.16-6.26-6.16 34.94zM44.288 85.182l2.215 8.484 8.465-2.341-22.805 27.179z'
        ></path>
        <path
          fill='#fff5d6'
          d='M36.338 72.488l-2.324 8.455 8.501 2.205L9.176 95.283z'
        ></path>
        <path
          fill='#ffebad'
          d='M35.8 57.52l-6.24 6.16 6.26 6.16L.88 63.68z'
        ></path>
        <path
          fill='#ffe085'
          d='M42.818 44.288l-8.484 2.215 2.341 8.465L9.496 32.163z'
        ></path>
        <path
          fill='#ffd65c'
          d='M55.512 36.338l-8.455-2.324-2.205 8.501L32.717 9.176z'
        ></path>
        <animateTransform
          attributeName='transform'
          calcMode='discrete'
          dur='1080ms'
          repeatCount='indefinite'
          type='rotate'
          values='0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64'
        ></animateTransform>
      </g>
    </svg>
  );
}

export default Loader;
