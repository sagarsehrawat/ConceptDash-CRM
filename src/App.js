import './App.css';
import AuthenticationState from './Context/AuthState';
import AllRoutes from './Routes/Routes';
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {
  return (
    <>
      <AuthenticationState>
      <ProSidebarProvider>
      <AllRoutes />
      </ProSidebarProvider>
      </AuthenticationState>
    </>
  );
}

export default App;
