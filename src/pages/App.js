import { Route, Switch } from "react-router-dom";
import Logo from "../components/Logo";
import Toolbar from "../components/Toolbar/Toolbar"
import InsertPage from "./InserPage/InsertPage";
import MainPage from "./MainPage";


function App() {

  return (
    <InsertPage />
    // <div className="w-screen h-screen bg-lightBody px-20 py-5 dark:bg-darkBody">
    //     <Logo />
    //     <Toolbar />
     
    //     <div className="bg-white w-full h-full rounded-30 overflow-hidden dark:bg-dark">
    //       <div className="w-full h-full  ">
    //         <Switch>
    //           <Route exact path="/" component={MainPage}/>
    //         </Switch>
    //       </div>
    //   </div>
    // </div>
  );
}

export default App;
