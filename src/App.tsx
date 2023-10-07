import Index from "./routes/Index";
import { useUserData } from "./store/Store";

function App() {
  const { isAuth, userType } = useUserData((state) => state);

  const showIndex = () => {
    if (isAuth && userType == "psychiatrist") {
      return <IndexPsychiatrist />;
    }
    return <Index />;
  };
  return <>{showIndex()}</>;
}

export default App;
