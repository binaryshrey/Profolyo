import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import banner from '../../assets/banner.webp';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { supabase } from '../../utils/Supabase';
import { showToast } from '../../components/Toasts';
import profolyo from '../../assets/profolyo-dark.svg';
import { FlipWords } from '../../components/flip-words';
import { UserNameInput } from '../../components/usernameInput';
import { RiCloseCircleFill, RiCheckboxCircleFill } from '@remixicon/react';
import { GITHUB_URI, LINKEDIN_URI, BETTERSTACK_URI } from '../../utils/Constants';
import { RiMenuLine, RiCloseFill, RiArrowRightLine, RiCheckLine, RiCloseLine } from '@remixicon/react';

const HeroSection = () => {
  const [userName, setUserName] = useState('');
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserNameCheck, setShowUserNameCheck] = React.useState(false);
  const [userNameAvailable, setUserNameAvailable] = React.useState(false);
  const [userNameCheckLoading, setUserNameCheckLoading] = React.useState(false);

  const users = ['Developers', 'Designers', 'Marketers', 'Founders', 'Students', 'Indie Hackers', 'Data Scientists', 'Freelancers'];
  const VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME;

  React.useEffect(() => {
    const handleUserNameCheck = async () => {
      setUserNameCheckLoading(true);
      let isAvailable = true;
      try {
        const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME).select();
        if (error) throw error;

        for (let name = 0; name < data.length; name++) {
          if (data[name].UserName === userName) {
            isAvailable = false;
            break;
          }
        }
        if (isAvailable) {
          setUserNameAvailable(true);
        } else {
          setUserNameAvailable(false);
        }
        setShowUserNameCheck(true);
      } catch (error) {
        console.error('Error checking username:', error.message);
        showToast(`Error checking username: ${error.message}`, 'error');
      } finally {
        setUserNameCheckLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (userName) {
        handleUserNameCheck();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [userName]);

  const handleScroll = () => {
    const element = document.getElementById('features-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="isolate bg-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(120%_120%_at_50%_10%,#fff_30%,#605f5e_100%)]"></div>
      <div className="absolute h-1/2 -z-10 w-full bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)]"></div>
      <div className="px-6 pt-6">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1 items-center">
            <a href="/" className="-m-1.5 p-1.5">
              <img className="h-6" src={profolyo} alt="profolyo" />
            </a>
            <h4 className="ml-2 text-gray-900 sm:text-xl">Profolyo</h4>
          </div>
          <div className="flex lg:hidden gap-4">
            <div className="p-1 pr-3 pl-3 bg-profolyo500 rounded-full cursor-pointer">
              <Link to="/signup" className="text-sm font-semibold leading-6 text-gray-900">
                Join Profolyo
              </Link>
            </div>
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <RiMenuLine className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href={GITHUB_URI} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-6 text-gray-900">
              Github
            </a>
            <a onClick={handleScroll} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
              Features
            </a>
            <a href={BETTERSTACK_URI} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-6 text-gray-900">
              Status
            </a>
            <a href={LINKEDIN_URI} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-6 text-gray-900">
              Contact
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex gap-4 justify-center items-center">
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Log in
              </Link>
              <div className="p-1 pr-3 pl-3 bg-profolyo500 rounded-full cursor-pointer">
                <Link to="/signup" className="text-sm font-semibold leading-6 text-gray-900">
                  Join Profolyo
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <img className="h-8" src={profolyo} alt="" />
              </a>
              <h4 className="ml-2 text-gray-900 sm:text-2xl">Profolyo</h4>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <RiCloseFill className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a href={GITHUB_URI} target="_blank" rel="noreferrer" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">
                    Github
                  </a>
                  <a onClick={handleScroll} className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10 cursor-pointer">
                    Features
                  </a>
                  <a href={BETTERSTACK_URI} target="_blank" rel="noreferrer" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">
                    Status
                  </a>
                  <a href={LINKEDIN_URI} target="_blank" rel="noreferrer" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">
                    Contact
                  </a>
                </div>
                <div className="py-6">
                  <Link to="/login" className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10">
                    Log in
                  </Link>
                  <Link to="/signup" className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10">
                    Join Profolyo
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
      <main>
        <div className="relative py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">The Fastest Way To Build</h1>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Professional Portfolios <br className="sm:hidden" />
                For
                <FlipWords words={users} />
              </h1>
              <p className="mt-6 text-sm sm:text-lg leading-8 text-gray-600">Create Minimalistic Portfolios at Lightning Fast Speed!</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
                <div className={`w-80 sm:w-96 p-2 flex justify-center font-semibold items-center border border-2 border-profolyoDark rounded-full backdrop-blur bg-white/50  ${isInputFocus ? 'ring ring-profolyoExtraDark ring-offset-2' : ''} `}>
                  <img className="ml-2 sm:ml-0 h-5 mr-2" src={profolyo} alt="profolyo" />
                  <p>profolyo.me/</p>
                  <UserNameInput className="w-32 sm:w-40" type="text" id="username" placeholder="LukeSkywalker" maxLength="20" value={userName} onChange={() => setUserName(event.target.value)} onFocus={() => setIsInputFocus(true)} onBlur={() => setIsInputFocus(false)} />
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-profolyoExtraDark rounded-full ml-2 sm:ml-6 flex justify-center items-center">
                    {userName.length === 0 && <RiArrowRightLine className="h-6 w-6 text-profolyo800" />}
                    {userName.length > 0 && (
                      <>
                        {!showUserNameCheck && <Loader2 className="h-6 w-6 animate-spin" />}
                        {!userNameCheckLoading && showUserNameCheck && userNameAvailable && <RiCheckboxCircleFill className="h-6 w-6 text-profolyo800" />}
                        {!userNameCheckLoading && showUserNameCheck && !userNameAvailable && <RiCloseCircleFill className="h-6 w-6 text-profolyo800" />}
                      </>
                    )}
                  </div>
                </div>
                {userName.length === 0 && <p className="text-sm mt-2">Claim your username before it’s too late!</p>}
                {userName.length > 0 && (
                  <>
                    {!showUserNameCheck && <p className="text-sm mt-2">Claim your username before it’s too late!</p>}
                    {!userNameCheckLoading && showUserNameCheck && !userNameAvailable && <p className="text-sm mt-2">This username is already taken, you’re a little late. 😐</p>}
                    {!userNameCheckLoading && showUserNameCheck && userNameAvailable && <p className="text-sm mt-2">Yes! This username is available. 😄</p>}
                  </>
                )}
              </div>
            </div>
            <div className="mt-20 flow-root sm:mt-16">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img src={banner} alt="App screenshot" width={2432} height={1442} className="rounded-md shadow-2xl ring-1 ring-gray-900/10" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div id="features-section"></div>
    </div>
  );
};

export default HeroSection;
