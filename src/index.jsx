import './style.css';
import { createRoot } from 'react-dom/client';
import Stage from './components/Stage';
import ScoreBoard from './components/ScoreBoard';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className="container">
      <div className="waviy fw-bold text-center mb-4 display-1">
        <span className="a">D</span>
        <span className="b">A</span>
        <span className="c">T</span>
        <span className="d">L</span>
        <span className="e">U</span>
        <span className="f" style={{ marginRight: '16px' }} >J</span>
        <span className="g">V</span>
        <span className="h">Š</span>
        <span className="i">E</span>
        <span className="j">M</span>
        <span className="k" style={{ marginRight: '16px' }}>I</span>
        <span className="l">D</span>
        <span className="m">E</span>
        <span className="n">S</span>
        <span className="o">E</span>
        <span className="p">T</span>
        <span className="q">I</span>
      </div>
      <div className='d-flex justify-content-center gap-5 pt-4 align-items-center'>
        <img style={{ width: '400px', height: '400px' }} src='https://cdn.pixabay.com/photo/2016/04/01/11/10/boy-1300226_1280.png' alt='laptop image' />
        <nav>
          <Link to="/bezlimitu" className='navLink'>Datluj do nekonečna</Link>
          <Link to="/slimitem1" className='navLink'>Datluj na čas - 1 minuta</Link>
          <Link to="/slimitem2" className='navLink'>Datluj na čas - 2 minuty</Link>
          <Link to="/slimitem5" className='navLink'>Datluj na čas - 5 minut</Link>
          <Link to="/vysledky" className='navLink'>Výsledky</Link>
        </nav>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/bezlimitu',
    element: <Stage />,
  },
  {
    path: '/slimitem1',
    element: <Stage limitTime={1} />,
  },
  ,
  {
    path: '/slimitem2',
    element: <Stage limitTime={2} />,
  },
  {
    path: '/slimitem5',
    element: <Stage limitTime={5} />,
  },
  {
    path: '/vysledky',
    element: <ScoreBoard />,
  }
]);

createRoot(document.querySelector('#app')).render(<RouterProvider router={router} />);
