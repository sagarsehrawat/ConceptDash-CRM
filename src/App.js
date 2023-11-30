import './App.css';
import AuthenticationState from './Context/AuthState';
import AllRoutes from './Routes/Routes';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux'
import store from './redux/store.ts';
import TFSuccessAlert from './components/modals/TFSuccessAlert/TFSuccessAlert.tsx';
import TFErrorAlert from './components/modals/TFErrorAlert/TFErrorAlert.tsx';

function App() {
  return (
    <>
      <Provider store={store}>
        <TFSuccessAlert />
        <TFErrorAlert />
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
