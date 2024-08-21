/************************************************************ IMPORTS ************************************************************/

import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/profolyo-dark.svg';
import register from '../../assets/register.svg';
import google from '../../assets/google.svg';
import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';
import loginBanner from '../../assets/login-banner.png';
import { UserAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/Toasts';
import { supabase } from '../../utils/Supabase';

/************************************************************ IMPORTS ************************************************************/

const Register = () => {
  const navigate = useNavigate();
  const { signInFlow, session } = UserAuth();
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;

  const handleSignUpFlow = async (provider) => {
    try {
      await signInFlow(provider);
    } catch (error) {
      console.error(error.message);
      showToast(error.message, 'error');
    }
  };

  React.useEffect(() => {
    const handleNavigate = async () => {
      if (session) {
        if (Object.keys(session).length !== 0) {
          localStorage.setItem('email', JSON.stringify(session.email));
          const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).select().eq('EmailID', session.email);
          if (error) {
            showToast(error.message, 'error');
          }
          if (data?.length > 0) {
            data[0].ProfolyoCreated ? navigate('/dashboard') : navigate('/editor');
          } else {
            navigate('/onboard');
          }
        }
      }
    };
    handleNavigate();
  }, [session]);
  return (
    <div className="isolate bg-white h-screen">
      <div className="absolute inset-0 -z-10 w-full bg-white bg-[radial-gradient(#e3e4e7_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex">
        <div className="w-full lg:w-2/5 h-screen">
          <div className="h-screen flex flex-col">
            <Link to="/">
              <div className="flex items-center">
                <img src={logo} alt="Profolyo" className="h-6 ml-6 mt-6" />
                <h4 className="ml-2 text-gray-900 mt-6 text-xl">Profolyo</h4>
              </div>
            </Link>

            <div className="flex-1 h-screen flex flex-col mt-24">
              <div className="flex items-center justify-center flex-col mt-8">
                <img src={register} alt="register" />
                <p className=" text-2xl mb-12 mt-4 text-black">Join Profolyo.</p>
              </div>

              <div className="flex flex-col items-center justify-center m-8 space-y-2 items-center">
                <button onClick={() => handleSignUpFlow('google')} type="button" className="w-64 text-black bg-white focus:ring-4 font-medium rounded-full text-sm px-8 py-2.5 text-center inline-flex items-center border">
                  <img src={google} alt="Google" className="h-6 w-6 mr-4" />
                  Sign up with Google
                </button>

                <button onClick={() => handleSignUpFlow('github')} type="button" className="w-64 text-black bg-white focus:ring-4 font-medium rounded-full text-sm px-8 py-2.5 text-center inline-flex items-center border">
                  <img src={github} alt="github" className="h-6 w-6 mr-4" />
                  Sign up with Github
                </button>

                <button onClick={() => handleSignUpFlow('linkedin_oidc')} type="button" className="w-64 text-black bg-white focus:ring-4 font-medium rounded-full text-sm px-8 py-2.5 text-center inline-flex items-center border">
                  <img src={linkedin} alt="linkedin" className="h-6 w-6 mr-4" />
                  Sign up with LinkedIn
                </button>
              </div>

              <div className="m-12 flex justify-center items-center text-center">
                <p className="text-black">
                  Already have an account?{' '}
                  <Link to="/login">
                    <span className="text-black hover:underline">Login.</span>
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex-none">
              <div className="text-sm font-medium text-muted-foreground opacity-70 m-4 text-black ml-8 ">&copy; 2024 Profolyo Inc.</div>
            </div>
          </div>
        </div>
        <div className="lg:block hidden w-3/5 h-screen bg-slate-100">
          <img src={loginBanner} alt="Sign IN" className="object-contain h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default Register;
