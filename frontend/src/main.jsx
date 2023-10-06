import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/homescreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/registerScreen.jsx';
import ProfileScreen from './screens/profileScreen.jsx';
import PrivateRoute from './components/Private.jsx';
import AdminDashboard from './components/Admin/adminDashboard.jsx';
import AddUserScreen from './screens/AddUser.jsx';
import EditUser from './screens/EditPageScreen.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login'  exact element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/*Private route*/}
      <Route path ='' element={<PrivateRoute />}>
        <Route path = '/profile' element={<ProfileScreen />} />
      </Route>
      
      {/*AdminPrivateroute*/} 
      <Route path ='' element={<PrivateRoute />}>
        <Route path = '/members' element={<AdminDashboard />} />
        <Route path = '/add' element ={<AddUserScreen />} />
        <Route path = 'edit/:id' element = {<EditUser />} />
        
      </Route>
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    </Provider>
);