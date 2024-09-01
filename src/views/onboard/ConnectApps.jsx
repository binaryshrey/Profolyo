import React from 'react';
import { Link } from 'react-router-dom';
import { RiCheckLine } from '@remixicon/react';
import { supabase } from '../../utils/Supabase';
import { Button } from '../../components/button';
import { UserAuth } from '../../hooks/AuthContext';
import { showToast } from '../../components/Toasts';
import { UserProfile } from '../../hooks/ProfileContext';
import { ScrollArea } from '../../components/scroll-area';
import { EditorInput } from '../../components/editor-input';
import { integrations } from '../../services/data/integrations';
import { EditorTabs, EditorTabsContent, EditorTabsList, EditorTabsTrigger } from '../../components/editor-tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog';

const ConnectApps = ({ container }) => {
  const { session } = UserAuth();
  const { appConnections, connectAppConnection, disConnectAppConnection, handleAppUsernameChange } = UserProfile();
  const [userName, setUserName] = React.useState('');
  const [updateUserName, setUpdateUserName] = React.useState('');
  const recommendedApps = integrations.filter((app) => app.type.includes('Recommended'));
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;

  const handleEditUserName = (val) => {
    setUserName(val);
  };

  const handleEditUpdateUserName = (val) => {
    setUpdateUserName(val);
  };

  const handleAppUserNameSubmit = (appName, urlPrefix) => {
    if (userName === '') {
      showToast('UserName cannot be blank!', 'error');
    } else {
      connectAppConnection(appName);
      handleAppUsernameChange(appName, userName, `${urlPrefix}${userName}`);
      setUserName('');
      showToast(`${appName} Connected!`, 'success');
    }
  };

  const handleAppUserNameUpdateSubmit = (appName, urlPrefix) => {
    if (updateUserName === '') {
      showToast('UserName cannot be blank!', 'error');
    } else {
      connectAppConnection(appName);
      handleAppUsernameChange(appName, updateUserName, `${urlPrefix}${updateUserName}`);
      setUserName('');
      showToast(`${appName} Connected!`, 'success');
    }
  };

  const handleAppDisconnect = (appName) => {
    disConnectAppConnection(appName);
    showToast(`${appName} Disconnected!`, 'success');
  };

  const setUpConnectedApp = (appName) => {
    setUpdateUserName(appConnections[appName]['username']);
  };

  React.useEffect(() => {
    const updateConnectionInDB = async () => {
      try {
        const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).update({ ConnectedApps: appConnections }).eq('EmailID', session?.email);
        if (error) {
          throw error;
        }
      } catch (error) {
        showToast(`Error updating app connection : ${error.message}`, 'error');
        console.error(error.message);
      }
    };
    if (container) {
      updateConnectionInDB();
    }
  }, [appConnections]);

  return (
    <>
      <ScrollArea className="h-4/5 overflow-hidden">
        <EditorTabs defaultValue="all" className="">
          <EditorTabsList className="ml-8 mb-4">
            <EditorTabsTrigger value="all">All Integrations</EditorTabsTrigger>
            <EditorTabsTrigger value="recommended">Recommended</EditorTabsTrigger>
          </EditorTabsList>

          {/* all apps */}
          <EditorTabsContent value="all">
            <div className="mb-10">
              <div className="flex flex-shrink-0 border-t border-zinc-200"></div>
              <div>
                {integrations.map((item, index) => (
                  <div key={item.name}>
                    <div className="mt-4 mb-4 ml-8 mr-8">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <img src={item.img} alt={item.name} className="h-12 w-12" />
                          <div>
                            <Link to={item.url} target="_blank" rel="noopener noreferrer">
                              <p className="font-semibold">{item.name}</p>
                            </Link>
                            <p className="text-xs text-zinc-400">{item.description}</p>
                          </div>
                        </div>
                        {appConnections[item.name]['connected'] ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button onClick={() => setUpConnectedApp(item.name)}>
                                <RiCheckLine className="h-4 w-4 mr-2" />
                                Connected
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader className="items-center">
                                <DialogTitle>
                                  <img src={item.img} alt={item.name} className="h-12 w-12" />
                                </DialogTitle>
                                <DialogTitle>Connect with {item.name}</DialogTitle>
                                <DialogDescription className="items-center">{item.url_description}</DialogDescription>
                              </DialogHeader>
                              <div>
                                <p className="text-xs text-zinc-500 mb-1">{item.message}</p>
                                <EditorInput id="username" placeholder={item.placeholder} value={updateUserName} onChange={() => handleEditUpdateUserName(event.target.value)} />
                                <p className="text-xs text-zinc-500 mt-2">
                                  {item.url_prefix}
                                  {updateUserName}
                                </p>
                              </div>
                              <DialogFooter>
                                <Button type="submit" variant="outline" onClick={() => handleAppDisconnect(item.name)}>
                                  Disconnect
                                </Button>
                                <Button type="submit" onClick={() => handleAppUserNameUpdateSubmit(item.name, item.url_prefix)}>
                                  Update
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">Connect</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader className="items-center">
                                  <DialogTitle>
                                    <img src={item.img} alt={item.name} className="h-12 w-12" />
                                  </DialogTitle>
                                  <DialogTitle>Connect with {item.name}</DialogTitle>
                                  <DialogDescription className="items-center">{item.url_description}</DialogDescription>
                                </DialogHeader>
                                <div>
                                  <p className="text-xs text-zinc-500 mb-1">{item.message}</p>
                                  <EditorInput id="username" placeholder={item.placeholder} value={userName} onChange={() => handleEditUserName(event.target.value)} />
                                  <p className="text-xs text-zinc-500 mt-2">
                                    {item.url_prefix}
                                    {userName}
                                  </p>
                                </div>
                                <DialogFooter>
                                  <Button type="submit" onClick={() => handleAppUserNameSubmit(item.name, item.url_prefix)}>
                                    Connect
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-zinc-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </EditorTabsContent>

          {/* recommended apps */}
          <EditorTabsContent value="recommended">
            <div className="mb-10">
              <div className="flex flex-shrink-0 border-t border-zinc-200"></div>
              <div>
                {recommendedApps.map((item, index) => (
                  <div key={item.name}>
                    <div className="mt-4 mb-4 ml-8 mr-8">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <img src={item.img} alt={item.name} className="h-12 w-12" />
                          <div>
                            <Link to={item.url} target="_blank" rel="noopener noreferrer">
                              <p className="font-semibold">{item.name}</p>
                            </Link>
                            <p className="text-xs text-zinc-400">{item.description}</p>
                          </div>
                        </div>
                        {appConnections[item.name]['connected'] ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button onClick={() => setUpConnectedApp(item.name)}>
                                <RiCheckLine className="h-4 w-4 mr-2" />
                                Connected
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader className="items-center">
                                <DialogTitle>
                                  <img src={item.img} alt={item.name} className="h-12 w-12" />
                                </DialogTitle>
                                <DialogTitle>Connect with {item.name}</DialogTitle>
                                <DialogDescription className="items-center">{item.url_description}</DialogDescription>
                              </DialogHeader>
                              <div>
                                <p className="text-xs text-zinc-500 mb-1">{item.message}</p>
                                <EditorInput id="username" placeholder={item.placeholder} value={updateUserName} onChange={() => handleEditUpdateUserName(event.target.value)} />
                                <p className="text-xs text-zinc-500 mt-2">
                                  {item.url_prefix}
                                  {updateUserName}
                                </p>
                              </div>
                              <DialogFooter>
                                <Button type="submit" variant="outline" onClick={() => handleAppDisconnect(item.name)}>
                                  Disconnect
                                </Button>
                                <Button type="submit" onClick={() => handleAppUserNameUpdateSubmit(item.name, item.url_prefix)}>
                                  Update
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">Connect</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader className="items-center">
                                  <DialogTitle>
                                    <img src={item.img} alt={item.name} className="h-12 w-12" />
                                  </DialogTitle>
                                  <DialogTitle>Connect with {item.name}</DialogTitle>
                                  <DialogDescription className="items-center">{item.url_description}</DialogDescription>
                                </DialogHeader>
                                <div>
                                  <p className="text-xs text-zinc-500 mb-1">{item.message}</p>
                                  <EditorInput id="username" placeholder={item.placeholder} value={userName} onChange={() => handleEditUserName(event.target.value)} />
                                  <p className="text-xs text-zinc-500 mt-2">
                                    {item.url_prefix}
                                    {userName}
                                  </p>
                                </div>
                                <DialogFooter>
                                  <Button type="submit" onClick={() => handleAppUserNameSubmit(item.name, item.url_prefix)}>
                                    Connect
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-zinc-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </EditorTabsContent>
        </EditorTabs>
      </ScrollArea>
    </>
  );
};

export default ConnectApps;
