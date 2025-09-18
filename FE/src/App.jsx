import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import AuthSync from "./components/authentication/AuthSync";
import { UserProvider } from "./contexts/UserContext"; // Context to manage user state


const App = () => {
  return (
    <>
      {/* Will switch to Post-Login Action through Auth0 once project is deployed*/}
      <AuthSync />  {/* Automatically runs when user logs in. syncs Auth0 user profile with user in mongoDB */}
      <UserProvider> {/* Provides user state to the entire app */}
        <div className="app-container">
          <RouterProvider router={router} />
        </div>
      </UserProvider>
      {/* <RouterProvider router={router} /> */}
      <Toaster />
    </>
  );
};

export default App;
