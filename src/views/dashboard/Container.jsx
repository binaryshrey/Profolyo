import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import logo from '../../assets/profolyo-dark.svg';
import { UserAuth } from '../../hooks/AuthContext';
import { Link } from 'react-router-dom';
import { RiSettingsLine, RiHome6Line, RiApps2Line, RiCloseLine, RiMenuFill, RiQuestionLine } from '@remixicon/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Container = ({ Component, board, integrations, settings }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session } = UserAuth();
  const imgURL = session?.user_metadata?.picture !== undefined ? session?.user_metadata?.picture : session?.user_metadata?.avatar_url;

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: RiHome6Line, current: board },
    { name: 'Integrations', href: '/integrations', icon: RiApps2Line, current: integrations },
    { name: 'Settings', href: '/settings', icon: RiSettingsLine, current: settings },
    { name: 'Support', href: 'https://github.com/binaryshrey/Profolyo/issues', icon: RiQuestionLine },
  ];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-profolyo">
                  <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button type="button" className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <RiCloseLine className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img className="h-6 w-auto" src={logo} alt="Profolyo" />
                      <p className="text-xl pl-4">Profolyo</p>
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-profolyoExtraDark text-profolyo900' : 'text-profolyo800 hover:bg-profolyoDark hover:text-profolyo900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md')}>
                          <item.icon className={classNames(item.current ? 'text-profolyo900' : 'text-profolyo800 group-hover:text-profolyo900', 'mr-3 flex-shrink-0 h-5 w-5')} />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-profolyoExtraDark p-2">
                    <Link to="/profile" className="group block w-full flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img className="inline-block h-10 w-10 rounded-full" src={imgURL} alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-profolyo900">{session?.user_metadata?.name}</p>
                          <p className="text-sm font-medium text-profolyo700 group-hover:text-profolyo900">View profile</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col ">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-profolyo ">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4 bg-profolyo">
              <div className="flex flex-shrink-0 items-center px-4">
                <img className="h-6 w-auto text-profolyo900" src={logo} alt="Profolyo" />
                <p className="text-xl pl-4 text-profolyo900">Profolyo</p>
              </div>
              <nav className="mt-5 flex-1 space-y-1 bg-profolyo px-2">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-profolyoExtraDark text-profolyo900' : 'text-profolyo800 hover:bg-profolyoDark hover:text-profolyo900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md')}>
                    <item.icon className={classNames(item.current ? 'text-profolyo900' : 'text-profolyo800 group-hover:text-profolyo900', 'mr-3 flex-shrink-0 h-5 w-5')} />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-shrink-0 border-t border-profolyoExtraDark p-2">
              <Link to="/profile" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <img className="inline-block h-9 w-9 rounded-full" src={imgURL} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-profolyo900">{session?.user_metadata?.name}</p>
                    <p className="text-xs font-medium text-profolyo700 group-hover:text-profolyo900">View profile</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-profolyo pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button type="button" className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <RiMenuFill className="h-5 w-5 text-profolyo900" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl">
                <div className="py-4 hidden lg:block">
                  <Component />
                </div>
                <div className="py-2 overflow-y-auto lg:hidden">
                  <Component />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Container;
