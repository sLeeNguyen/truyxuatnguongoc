import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Product from './pages/product-info/product';
import TraceProduct from './pages/traceability/trace';
import {API_URL} from './config/constants';
import {notifySuccess, notifyError, notifyInfo} from './pages/notify';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // login to farmer
  useEffect(() => {
    fetch(`${API_URL}/authentication`, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            username: "farmer1",
            password: "123456",
          }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.status == "Failure") {
            setError(true);
            notifyError("Lỗi", result.details);
          } else {
            localStorage.setItem("token", result.authorization);
            localStorage.setItem("role", result.role);
            notifyInfo("Thành công", "Đăng nhập thành công");
          }
        },
        (error) => {
          notifyError("Xảy ra lỗi", "");
        }
      )
  }, [])
  
  if (error) {
    return <div>.</div>;
  }
  else if (!isLoaded) {
    return <div>Loading...</div>
  } 
  else {
    return (
      <Router>
        <Route path="/" exact component={Product}/>
        <Route path="/traceproduct/:productId" exact component={TraceProduct}/>
      </Router>
    );
  }
}

export default App;
