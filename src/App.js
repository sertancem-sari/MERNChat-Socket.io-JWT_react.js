import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import Login from './features/auth/Login';
import MainLayout from './components/main/MainLayout';
import Main from './components/main/Main';
import UserList from './features/users/UserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path='login' element={<Login />} />
          <Route path='main' element={<MainLayout />}>
            <Route index element={<Main />}/>
            <Route path='users'>
              <Route index element={<UserList />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
