import './App.css';
import LoginForm from './components/LoginPage/LoginForm';
import MainPage from './components/MainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import AuthenticatedRoute from './AuthenticatedRoute';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home"  element={<MainPage />} />
          {/* <AuthenticatedRoute path="/home" element={<MainPage />} /> */}
          {/* <Route path="/home" element={<AuthenticatedRoute element={<MainPage />} />} /> */}
          {/* <Route path="/home" element={<AuthenticatedRoute> <MainPage /> </AuthenticatedRoute>} /> */}
          {/* <Route
            path="/home"
            element={
              <AuthenticatedRoute>
                <MainPage />
              </AuthenticatedRoute>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;