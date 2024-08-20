import React from 'react';
import { Button } from '../../components/button';
import { ScrollArea } from '../../components/scroll-area';
import { integrations } from '../../services/data/integrations';
import { RiCheckLine } from '@remixicon/react';
import { UserProfile } from '../../hooks/ProfileContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { showToast } from '../../components/Toasts';

const ConnectedApps = () => {
  const { appConnections, toggleAppConnection, handleAppUsernameChange } = UserProfile();
  const [userName, setUserName] = React.useState('');

  const handleEditUserName = (val) => {
    setUserName(val);
  };

  const handleAppUserNameSubmit = (appName) => {
    if (userName === '') {
      showToast('UserName cannot be blank!', 'error');
    } else {
      toggleAppConnection(appName);
      handleAppUsernameChange(appName, userName);
      setUserName('');
      showToast(`${appName} Connected!`, 'success');
    }
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
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                  {appConnections[item.name]['connected'] ? (
                    <Button>
                      <RiCheckLine className="h-4 w-4 mr-2" />
                      Connected
                    </Button>
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
                            <DialogDescription className="items-center">Share your {item.name} username</DialogDescription>
                          </DialogHeader>
                          <div>
                            <Input id="username" placeholder="lukeSkywalker" value={userName} onChange={() => handleEditUserName(event.target.value)} />
                            <p className="text-xs text-zinc-500 mt-2">* Kindly add username only</p>
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

export default ConnectedApps;
