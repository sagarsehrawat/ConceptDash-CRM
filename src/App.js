import './App.css';
import AuthenticationState from './Context/AuthState';
import AllRoutes from './Routes/Routes';
import { ProSidebarProvider } from 'react-pro-sidebar';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

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
