import React from 'react';
import Lottie from 'lottie-react';
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

  return <Lottie {...defaultOptions} />;
};

export default Welcome;
