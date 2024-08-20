import { useState } from 'react';
import OnboardProfile from './OnboardProfile';
import OnboardIntegrations from './OnboardIntegrations';

const OnboardContainer = () => {
  const [onboardStep, setOnboardStep] = useState(1);

  const incrementOnboardStep = () => {
    setOnboardStep((prev) => prev + 1);
  };

  const decrementOnboardStep = () => {
    setOnboardStep((prev) => prev - 1);
  };

  return (
    <div>
      {onboardStep === 9 && <OnboardProfile incrementOnboardStep={incrementOnboardStep} />}
      {onboardStep === 1 && <OnboardIntegrations decrementOnboardStep={decrementOnboardStep} />}
    </div>
  );
};

export default OnboardContainer;
