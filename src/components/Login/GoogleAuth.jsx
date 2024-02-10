import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { GoogleAuthBg } from "../../assets/videos/index";
import { useSidebar } from "../../context/SidebarProvider";
import { validateUser } from "../../api/user-api";

const GoogleAuth = ({ setGoogleAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { setLoginOptions, setOpenMenu } = useSidebar();

  const navigate = useNavigate();

  const [{  }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      if (userCredential) {
        setGoogleAuth(true);
        window.localStorage.setItem("auth", "true");        

        const user = userCredential.user;
        if (user) {
          const token = await user.getIdToken();
          if (token) {
            const data = await validateUser(token);
            if (data) {
              dispatch({
                type: actionType.SET_USER,
                user: data,
              });
              setLoginOptions(false);
              setOpenMenu(false);
              navigate("/", { replace: true });
              
              return;
            }
          }
        }
      }
      // Handle a scenario where the user or data is not available
      setGoogleAuth(false);
      dispatch({
        type: actionType.SET_USER,
        user: null,
      });
      navigate("/google-login");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      // Handle error, display message to the user, or retry sign-in
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  });


  return (
    <div className="relative w-screen h-screen">
      <video
        src={GoogleAuthBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div
            className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            <p>Google Orqalik Ro'yxatdan o'tish</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
