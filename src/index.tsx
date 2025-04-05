import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
// import 'antd/dist/antd.css'; // Обязательно для правильного отображения компонентов Ant Design


// import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ConfigProvider>
    <App />
    </ConfigProvider>
  </Provider>
);
