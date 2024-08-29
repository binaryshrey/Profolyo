import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { RiMenuLine, RiCloseFill } from '@remixicon/react';
import profolyo from '../../assets/profolyo-dark.svg';
import { FlipWords } from '../../components/flip-words';

import { Link } from 'react-router-dom';
import { GITHUB_URI, LINKEDIN_URI, BETTERSTACK_URI } from '../../utils/Constants';

const handleScroll = () => {
  const element = document.getElementById('features-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const users = ['Developers', 'Designers', 'Marketers', 'Founders', 'Students', 'Indie Hackers', 'Data Scientists', 'Freelancers'];

  return (
    <div className="isolate bg-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(120%_120%_at_50%_10%,#fff_30%,#0284c7_100%)]"></div>
      <div className="absolute h-1/2 -z-10 w-full bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)]"></div>
      <div className="px-6 pt-6">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1 items-center">
            <a href="/" className="-m-1.5 p-1.5">
              <img className="h-6" src={profolyo} alt="profolyo" />
            </a>
            <h4 className="ml-2 text-gray-900 sm:text-xl">Profolyo</h4>
          </div>
          <div className="flex lg:hidden">
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
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in
            </Link>
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
                Professional Portfolios For
                <FlipWords words={users} />
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">Forge Your Legacy: Create Stunning Portfolios at Lightning Fast Speed!</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/login" className="rounded-md bg-sky-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                  Get started
                </Link>
                <a href={GITHUB_URI} target="_blank" rel="noreferrer" className="text-base font-semibold leading-7 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-16">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img src="https://raw.githubusercontent.com/binaryshrey/Chronos/feat/login/src/assets/product.png" alt="App screenshot" width={2432} height={1442} className="rounded-md shadow-2xl ring-1 ring-gray-900/10" />
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
