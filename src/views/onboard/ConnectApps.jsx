import React from 'react';
import { Button } from '../../components/button';
import { ScrollArea } from '../../components/scroll-area';
import { integrations } from '../../services/data/integrations';
import { RiCheckLine } from '@remixicon/react';
import { UserProfile } from '../../hooks/ProfileContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog';
import { Input } from '../../components/input';
import { showToast } from '../../components/Toasts';
import { Link } from 'react-router-dom';

const ConnectApps = () => {
  const { appConnections, connectAppConnection, disConnectAppConnection, handleAppUsernameChange } = UserProfile();
  const [userName, setUserName] = React.useState('');
  const [updateUserName, setUpdateUserName] = React.useState('');

  console.log(appConnections);

  const handleEditUserName = (val) => {
    setUserName(val);
  };

  const handleEditUpdateUserName = (val) => {
    setUpdateUserName(val);
  };

  const handleAppUserNameSubmit = (appName) => {
    if (userName === '') {
      showToast('UserName cannot be blank!', 'error');
    } else {
      connectAppConnection(appName);
      handleAppUsernameChange(appName, userName);
      setUserName('');
      showToast(`${appName} Connected!`, 'success');
    }
  };

  const handleAppUserNameUpdateSubmit = (appName) => {
    if (updateUserName === '') {
      showToast('UserName cannot be blank!', 'error');
    } else {
      connectAppConnection(appName);
      handleAppUsernameChange(appName, updateUserName);
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

  console.log(appConnections);

  return (
    <ScrollArea className="h-4/5 overflow-hidden">
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
                          <Input id="username" placeholder={item.placeholder} value={updateUserName} onChange={() => handleEditUpdateUserName(event.target.value)} />
                          <p className="text-xs text-zinc-500 mt-2">
                            {item.url_prefix}
                            {updateUserName}
                          </p>
                        </div>
                        <DialogFooter>
                          <Button type="submit" variant="outline" onClick={() => handleAppDisconnect(item.name)}>
                            Disconnect
                          </Button>
                          <Button type="submit" onClick={() => handleAppUserNameUpdateSubmit(item.name)}>
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
                            <Input id="username" placeholder={item.placeholder} value={userName} onChange={() => handleEditUserName(event.target.value)} />
                            <p className="text-xs text-zinc-500 mt-2">
                              {item.url_prefix}
                              {userName}
                            </p>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={() => handleAppUserNameSubmit(item.name)}>
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
    </ScrollArea>
  );
};

export default ConnectApps;
