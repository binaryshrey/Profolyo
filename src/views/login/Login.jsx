/************************************************************ IMPORTS ************************************************************/

import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/profolyo-dark.svg';
import login from '../../assets/login.svg';
import google from '../../assets/google.svg';
import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';
import loginBanner from '../../assets/login-banner.png';
import { UserAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/Toasts';

/************************************************************ IMPORTS ************************************************************/

const Login = () => {
  const navigate = useNavigate();
  const { signInFlow, session } = UserAuth();

  const handleSignInFlow = async (provider) => {
    try {
      await signInFlow(provider);
    } catch (error) {
      console.error(error.message);
      showToast(error.message, 'error');
    }
  };

  React.useEffect(() => {
    if (session) {
      if (Object.keys(session).length !== 0) {
        localStorage.setItem('email', JSON.stringify(session.email));
        navigate('/onboard');
      }
    }
  }, [session]);

  return (
    <div className="isolate bg-white h-screen">
      <div className="absolute inset-0 -z-10 w-full bg-white bg-[radial-gradient(#e3e4e7_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex">
        <div className="w-full lg:w-2/5 h-screen">
          <div className="h-screen flex flex-col">
            <Link to="/">
              <div className="flex items-center">
                <img src={logo} alt="Profolyo" className="h-6 ml-8 mt-7" />
                <h4 className="ml-2 text-gray-900 mt-7 text-xl">Profolyo</h4>
              </div>
            </Link>

            <div className="flex-1 h-screen flex flex-col mt-24">
              <div className="flex items-center justify-center flex-col mt-8">
                <img src={login} alt="Login" />
                <p className=" text-2xl mb-12 mt-4 text-black">Welcome Back.</p>
              </div>

              <div className="flex flex-col items-center justify-center m-8 space-y-2 items-center">
                <button onClick={() => handleSignInFlow('google')} type="button" className="w-64 text-black bg-white focus:ring-4 font-medium rounded-full text-sm px-8 py-2.5 text-center inline-flex items-center border">
                  <img src={google} alt="Google" className="h-6 w-6 mr-4" />
                  Sign in with Google
                </button>

                <button onClick={() => handleSignInFlow('github')} type="button" className="w-64 text-black bg-white focus:ring-4 font-medium rounded-full text-sm px-8 py-2.5 text-center inline-flex items-center border">
                  <img src={github} alt="github" className="h-6 w-6 mr-4" />
                  Sign in with Github
                </button>

                <button onClick={() => handleSignInFlow('linkedin_oidc')} type="button" className="w-64 text-black bg-white focus:ring-4 font-medium rounded-full text-sm px-8 py-2.5 text-center inline-flex items-center border">
                  <img src={linkedin} alt="linkedin" className="h-6 w-6 mr-4" />
                  Sign in with LinkedIn
                </button>
              </div>

              <div className="m-12 flex justify-center items-center text-center">
                <p className="text-black">
                  Don't have an account?{' '}
                  <Link to="/signup">
                    <span className="text-black hover:underline">Create one.</span>
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

export default Login;
