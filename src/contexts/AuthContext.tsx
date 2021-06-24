import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

export const AuthContext = createContext({} as AuthContextType);

type User =
{
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType =
{
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;  
}

type AuthContexProviderProps =
{ 
  children: ReactNode;
}

export function AuthContexProvider(props: AuthContexProviderProps)
{
  const [user, setUser] = useState<User>();

  useEffect(() => 
  {
    const unsubscribe = auth.onAuthStateChanged(user => 
    {
      if(user)
      {
        const { photoURL, displayName, uid } = user;

        if (!displayName || !photoURL)
        {
          throw new Error('Missing information from Google Account.');
        }

        setUser
        ({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    })

    return () => 
    {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle()
  {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    console.log(result);

    if (result.user)
    {
      const { photoURL, displayName, uid } = result.user;

      if (!displayName || !photoURL)
      {
        throw new Error('Missing information from Google Account.');
      }

      setUser
      ({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    };
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { props.children }
    </AuthContext.Provider>
  );
}