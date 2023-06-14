import React from 'react';
import Lottie from 'react-lottie';
import WelcomeConfetti from '../../../assets/images/Welcome.json';

const Welcome = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: WelcomeConfetti,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} />;
};

export default Welcome;
