import { UserAuth } from '../../hooks/AuthContext';
import OnboardIntegrations from './OnboardIntegrations';
import OnboardProfile from './OnboardProfile';
import { useState } from 'react';

const OnboardContainer = () => {
  const { logOut, session } = UserAuth();
  console.log(session);

  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [onboardStep, setOnboardStep] = useState(1);

  const incrementOnboardStep = () => {
    setOnboardStep((prev) => prev + 1);
  };

  const decrementOnboardStep = () => {
    setOnboardStep((prev) => prev - 1);
  };

  return (
    <div>
      {/* <h1 onClick={handleSignOut}>Onboard</h1> */}
      {onboardStep === 1 && <OnboardProfile incrementOnboardStep={incrementOnboardStep} />}
      {onboardStep === 2 && <OnboardIntegrations decrementOnboardStep={decrementOnboardStep} />}
    </div>
  );
};

export default OnboardContainer;
