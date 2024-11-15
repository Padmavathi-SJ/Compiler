import React from 'react';
import '../css/Login.css'; // Import the CSS file

const LoginPage = () => {
  // Function to handle Google Sign In
  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo and Heading at the top center */}
        <div className="logo-heading-container">
          <img
            src="images/compiler.png" // Replace with your logo URL
            alt="Logo"
            className="main-logo"
          />
          <h1 className="heading">Compile-Run</h1>
        </div>

        {/* H2 text */}
        <h2 className="h2-text">Hi, Welcome Back!</h2>

        {/* Sign In Button with Google Icon */}
        <button
          className="sign-in-button"
          onClick={handleGoogleSignIn}
        >
          <img 
            src="images/google.png" // Replace with your Google icon SVG URL
            alt="Google Icon"
            className="google-icon"
          />
          Sign In with Google
        </button>

        {/* Additional text */}
        <p className="additional-text">Sign in with your BITSathy account</p>
      </div>
    </div>
  );
};

export default LoginPage;
