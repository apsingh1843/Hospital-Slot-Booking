import './App.css';
//import { Provider } from 'react-redux';
//import store from './redux/ConfigureStore'; store={store}
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
  );
}

export default App;
