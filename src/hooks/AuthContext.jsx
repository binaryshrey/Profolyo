/************************************************************ IMPORTS ************************************************************/

import { supabase } from '../utils/Supabase';
import { useContext, createContext, useEffect, useState } from 'react';

/************************************************************ IMPORTS ************************************************************/

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState({});

  const googleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/onboard',
        },
      });
      console.log('Google sign-in successful!');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };
  const githubSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: 'http://localhost:3000/onboard',
        },
      });
      console.log('Github sign-in successful!');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const linkedInSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: 'http://localhost:3000/onboard',
        },
      });
      console.log('LinkedIn sign-in successful!');
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

  return <AuthContext.Provider value={{ googleSignIn, githubSignIn, linkedInSignIn, logOut, session }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
