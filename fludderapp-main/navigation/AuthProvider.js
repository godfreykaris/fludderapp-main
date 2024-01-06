import React, { createContext, useState } from 'react';

import { kitty } from '../screens/chatkitty';
import { firebase } from '../screens/firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
      <AuthContext.Provider
          value={{
            user,
            setUser,
            loading,
            setLoading,
            login: async (email, password) => {
              setLoading(true);

              const result = await kitty.startSession({
                username: email,
                isGuest : true
                // authParams: {
                //   password: password,
                // },
              });

              setLoading(false);
              console.log("result : ",result);
              if (result.failed) {
                console.log('Could not loginD');
              }
            },
            register: async (displayName, email, password) => {
              setLoading(true);

              try {
                await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((credential) => {
                  credential.user
                  .updateProfile({ displayName: displayName })
                  .then(async () => {
                    const result = await kitty.startSession({
                      username: email,
                      // authParams: {
                      //   password: password,
                      // },
                    });

                    if (result.failed) {
                      console.log('Could not login');
                    }
                  });
                });
              } catch (e) {
                console.log(e);
              }

              setLoading(false);
            },
            logout: async () => {
              try {
                await kitty.endSession();
              } catch (e) {
                console.error(e);
              }
            },
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};