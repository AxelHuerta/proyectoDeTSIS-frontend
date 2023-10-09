import Navbar from "../../components/Navbar";
import LoginInput from "../../components/LoginInput";
import { useUserData } from "../../store/Store";

export default function LoginPsychiatrist() {
  // side image link
  const imageLink =
    "https://images.pexels.com/photos/5217831/pexels-photo-5217831.jpeg";

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div
          style={{
            background: `url(${imageLink})`,
            backgroundSize: "cover",
          }}
          className="hidden md:block"
        ></div>
        <LoginInput loginType="psychiatrist" />
      </div>
    </>
  );
}
