import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import Login from './features/auth/Login';
import MainLayout from './components/main/MainLayout';
import Main from './components/main/Main';
import UserList from './features/users/UserList';
import NewUser from './features/users/NewUser';
import EditUser from './features/users/EditUser';
import Prefetch from './features/subfetch/Prefetch';
import MessageList from './features/messages/MessageList';
import './App.css';
import NewMessage from './features/messages/NewMessage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path='login' element={<Login />} />
          <Route element={<Prefetch />}>
            <Route path='main' element={<MainLayout />}>
              <Route index element={<Main />}/>
              <Route path='users'>
                <Route index element={<UserList />}/>
                <Route path='new' element={<NewUser />} />
                <Route path=':id' element={<EditUser />} />
              </Route>
              <Route path='messages'>
                <Route index element={<MessageList />}/>
                <Route path='new' element={<NewMessage />}/>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
