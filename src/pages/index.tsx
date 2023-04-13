import Head from 'next/head'
import GoogleButton from 'react-google-button'
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';
import { useEffect } from 'react';

// Task 0: Initialize Firebase
// Replace the following with your app's Firebase project configuration
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  // Enter your own firebase config here
  apiKey: "AIzaSyCLtDNcGu4jQa_508HsrR-GjnBTi0nRwnE",
  authDomain: "checkmate-test-b1fd7.firebaseapp.com",
  projectId: "checkmate-test-b1fd7",
  storageBucket: "checkmate-test-b1fd7.appspot.com",
  messagingSenderId: "933920808201",
  appId: "1:933920808201:web:5f89e53f5a3357a6ccc7d8"
};

const app = initializeApp(firebaseConfig);

// GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
// Firebase Auth instance
const auth = getAuth(app);

export default function Home() {
  //Next.js router
  const router = useRouter();

  // Task 1: Implement Google Sign in with Firebase
  // https://firebase.google.com/docs/auth/web/google-signin
  // console.log("usdshu")
  const signIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        router.push("/signed-in");
      } else {
        console.log("not logged in");
        // Handle the case where the user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  //   /*
  //     1. Use the GoogleAuthProvider to sign in with Firebase
  //     2. Use signInWithRedirect to redirect the user to the Google sign in page
  //     3. (Optional) Use getRedirectResult to get the result of the redirect and check out what is inside :)
  //     4. Redirect the user to the signed-in page using Next.js router
  //    */


  return (
    <>
      <Head>
        <title>Sign in to see the public holidays in HK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h1 className="title">
            Welcome to <a href="https://checkmatehk.io">CheckMate</a>
          </h1>
          <h3>Sign in to see a random programming joke 😳</h3>

          {/* Button for user to sign in with Google */}
          {/* Task 1: Implement Google Sign in with Firebase */}
          <GoogleButton
            label={'Sign in with Google'}
            type="light"
            style={{ width: '50%', display: "flex", justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto, sans-serif', color: '#444' }}
            onClick={signIn}
          />
        </main>
      </div>
    </>
  )
}
