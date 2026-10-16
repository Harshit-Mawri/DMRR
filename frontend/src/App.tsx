import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import { NotFound } from "./pages/NotFound";

function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />;
}

function RegisterAndLogout(){
  localStorage.clear()
  return <SignUp />
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login"  element={<Login />}/>
          <Route path="/logout"  element={<Logout />}/>
          <Route path="/signup"  element={<RegisterAndLogout />}/>
          <Route path="*"  element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
