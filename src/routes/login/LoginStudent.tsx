import Navbar from "../../components/Navbar";
import LoginInput from "../../components/LoginInput";

export default function LoginStudent() {
  // side image link
  const imageLink =
    "https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg";

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <LoginInput loginType={"student"} />
        <div
          style={{ background: `url(${imageLink})`, backgroundSize: "cover" }}
          className="hidden md:block"
        ></div>
      </div>
    </>
  );
}
