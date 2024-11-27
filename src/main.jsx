import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import App from './App.jsx';
import Home from './routes/Home.jsx';
import Tabela from './routes/Tabela.jsx';
import Competition from './routes/Competition.jsx';
import Partida from './routes/Partida.jsx';
import Artilharia from './routes/Artilharia.jsx';
import Assistencias from './routes/Assistencias.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/competitions/:id/tabela',
        element: <Tabela />,
      },
      {
        path: '/competitions/:code',
        element: <Competition />,
      },
      {
        path: '/matches/:id',
        element: <Partida/>,
      },
      {
        path: '/competitions/:id/artilharia',
        element: <Artilharia/>
      },
      {
        path: '/competitions/:id/assistencias',
        element: <Assistencias/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
