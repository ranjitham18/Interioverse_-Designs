import { useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";

function App() { // main root component
  const isAuth = useSelector((state) => state.auth.isAuth);

  return ( 
    <div>
      {isAuth ? <Dashboard /> : <Login />} 
    </div> 
  );
}//redux decides which page to show login or dashboard based on isAuth

export default App;








