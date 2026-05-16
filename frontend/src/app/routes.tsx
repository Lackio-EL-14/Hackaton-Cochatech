import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import Home from './pages/Home';
import Emprendimientos from './pages/Emprendimientos';
import PerfilEmprendimiento from './pages/PerfilEmprendimiento';
import MapaVerde from './pages/MapaVerde';
import LoginEmprendedor from './pages/LoginEmprendedor';
import Registro from './pages/Registro';
import Gestion from './pages/Gestion';
import LoginAdmin from './pages/LoginAdmin';
import PanelAdmin from './pages/PanelAdmin';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'emprendimientos', Component: Emprendimientos },
      { path: 'emprendimientos/:id', Component: PerfilEmprendimiento },
      { path: 'mapa', Component: MapaVerde },
      { path: 'login', Component: LoginEmprendedor },
      { path: 'registro', Component: Registro },
      { path: 'gestion', Component: Gestion },
    ],
  },
  {
    path: '/admin',
    Component: LoginAdmin,
  },
  {
    path: '/admin/panel',
    Component: PanelAdmin,
  },
]);
