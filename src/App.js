import './App.css';
import AuthenticationState from './Context/AuthState';
import AllRoutes from './Routes/Routes';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <>
    <Provider store={store}>
      <AuthenticationState>
        <ProSidebarProvider>
          <AllRoutes />
        </ProSidebarProvider>
      </AuthenticationState>
      </Provider>
    </>
  );
}

export default App;
