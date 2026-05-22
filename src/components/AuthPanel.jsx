import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../firebase";

function AuthPanel({ user }) {
  async function handleSignIn() {
    await signInWithPopup(auth, googleProvider);
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <section className="auth-panel">
      {user ? (
        <>
          <div>
            <p className="eyebrow">Signed in</p>
            <h2>{user.displayName}</h2>
            <p className="auth-email">{user.email}</p>
          </div>

          <button
            className="reset-button"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <div>
            <p className="eyebrow">Account</p>
            <h2>Sign in to sync your dashboard.</h2>
          </div>

          <button onClick={handleSignIn}>
            Sign in with Google
          </button>
        </>
      )}
    </section>
  );
}

export default AuthPanel;