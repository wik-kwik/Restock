import './App.css';
import LoginForm from './components/LoginPage/LoginForm';
import MainPage from './components/MainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="log_in" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}


export default App;

    // <div className="App">
    //   <LoginForm />
    // </div>