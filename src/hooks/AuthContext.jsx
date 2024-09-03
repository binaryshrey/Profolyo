/************************************************************ IMPORTS ************************************************************/

import { supabase } from '../utils/Supabase';
import { useContext, createContext, useEffect, useState } from 'react';

/************************************************************ IMPORTS ************************************************************/

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState({});

  const signInFlow = async (provider) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: 'https://www.profolyo.vercel.app/redirect/',
        },
      });
      console.log(`${provider} sign-in successful!`);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const logOut = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ signInFlow, logOut, session }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
