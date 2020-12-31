import Logo from "../components/Logo";
import Toolbar from "../components/Toolbar"
import MainPage from "./MainPage";


function App() {

  return (
    <div className="w-screen h-screen bg-lightBody px-20 py-5">
        <Logo />
        <Toolbar />
        <div className="bg-white w-full h-full rounded-30 overflow-hidden px-1">
          <div className="w-full h-full overflow-y-scroll overflow-x-hidden ">
            <MainPage />
          </div>
      </div>
    </div>
  );
}

export default App;
