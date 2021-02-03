import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useUserCtx } from "../context/UserContext";
import Shadow from "./General/Shadow";
import myFirebase from "../firebase";
import firebase from "firebase";

const Login = () => {
  const { setShow, setUser, user } = useUserCtx();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    autoUpgradeAnonymousUsers: true,
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/signedIn',
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        setShow(false);
        return false;
      },
      signInFailure: (error) => {
        console.log("error", error);
        var cred = error.credential;

        setShow(false);
        return firebase.auth().signInWithCredential(cred);
      },
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <Shadow hide={() => setShow(false)}>
      <div className="z-50 bg-white p-10 rounded-30">
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={myFirebase.auth()}
        />
      </div>
    </Shadow>
  );
};

export default Login;
