/*ToastContainer é um tipo de msg apresentando na tela q pertence a biblioteca react-toastify. Essa biblioteca já tem os tipos importados do JS*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Routes from './Routes';

function App() {
  return (
    //Fragments <>
    <>
      <Routes />
      <ToastContainer/>
    </>
  );
}

export default App;
