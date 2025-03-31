import "./App.css"
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRouter from "./components/auth/ProtectedRouter";
import UploadAvatar from "./components/user/UploadAvatar";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentMethods from "./components/cart/PaymentMethods";

function App() {
  return (
    <Router>
    <div className="App">
      <Toaster position="top-center"/>
   
     <Header/>

     <div className="container">
      <Routes>
         <Route path="/" element={ <Home/>}/>
         <Route path="/product/:id" element={ <ProductDetails/>}/>
         <Route path="/login" element={ <Login/>}/>
         <Route path="/register" element={ <Register/>}/>
         <Route path="/password/reset/:token" element={ <ResetPassword/>}/>
         <Route path="/me/profile" element={ 
          <ProtectedRouter>
             <Profile/>
          </ProtectedRouter>
          
          
          }/>
         <Route path="/me/update_profile" element={ <ProtectedRouter><UpdateProfile/> </ProtectedRouter>}/>
         <Route path="/me/update_Avatar" element={ <ProtectedRouter><UploadAvatar/> </ProtectedRouter>}/>
         <Route path="/me/update_password" element={ <ProtectedRouter><UpdatePassword/> </ProtectedRouter>}/>
         <Route path="/password/forgot" element={ <ForgotPassword/>}/>
         <Route path="/cart" element={ <Cart/>}/>
         <Route path="/shipping" element={ <ProtectedRouter><Shipping/> </ProtectedRouter>}/>
         <Route path="/confirm_order" element={ <ProtectedRouter><ConfirmOrder/> </ProtectedRouter>}/>
         <Route path="/payment_methods" element={ <ProtectedRouter><PaymentMethods/> </ProtectedRouter>}/>
      </Routes>
    
     </div>


     <Footer/>
    </div>
    </Router>
  );
}

export default App;
