
import React from "react"; // required to use jsx
import ReactDOM from "react-dom/client";// connects react app to the browser
import App from "./App";// main root component application
import { Provider } from "react-redux"; //gives Redux store access to the entire app
import { BrowserRouter } from "react-router-dom";//Enables routing/navigation (pages like login, dashboard)
import store  from "./redux/store";//contains global state (auth, users, etc.

const root = ReactDOM.createRoot(document.getElementById("root"));//react finds that empty div , react puts the whole app inside it

root.render(
   <Provider store={store}> 
    <BrowserRouter> 
      <App /> 
    </BrowserRouter> 
  </Provider> //makes redux store available to all components
);
//Browser → index.html → root div → Provider → Router → App
