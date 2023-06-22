import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './Components/ProtectedRoute';
import {useSelector} from 'react-redux'
import Loader from './Components/Loader';
function App() {
  const { loader } = useSelector(state => state.loaderReducer)
  
  return (
    // /<div className="h-screen bg-violet-400 flex justify-center items-center">
    //   <h1 className="text-white text-3xl uppercase font-bold">hello</h1>
    // </div>
    
    <div>
      <Toaster
  position="top-center"
  reverseOrder={false}
      />
      {loader && <Loader/>}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
);
}

export default App;
