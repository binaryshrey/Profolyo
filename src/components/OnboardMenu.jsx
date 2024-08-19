/************************************************************ IMPORTS ************************************************************/

import { UserAuth } from '../hooks/AuthContext';
import { RiLogoutCircleRLine } from '@remixicon/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from './dropdown-menu';

/************************************************************ IMPORTS ************************************************************/

const OnboardMenu = () => {
  // global vars
  const { logOut, session } = UserAuth();

  // methods
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const imgURL = session?.user_metadata?.picture !== undefined ? session?.user_metadata?.picture : session?.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img className="h-8 rounded-full cursor-pointer" src={imgURL} referrerPolicy="no-referrer" alt="ProfilePic" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center gap-2 p-2">
          <img className="h-8 rounded-full cursor-pointer" src={imgURL} referrerPolicy="no-referrer" alt="ProfilePic" />
          <div className="grid gap-0.5 leading-none">
            <div className="font-semibold">{session?.user_metadata?.name}</div>
            <div className="text-sm text-muted-foreground">{session?.user_metadata?.email}</div>
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="w-full cursor-pointer" onClick={handleSignOut}>
          <div className="flex gap-2 items-center">
            <RiLogoutCircleRLine className="h-4 w-4" />
            <span className="">Sign out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OnboardMenu;
