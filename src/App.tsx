import { Route, BrowserRouter } from 'react-router-dom';

import { AuthContexProvider } from './contexts/AuthContext'
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import './styles/global.scss';

function App()
{

  return (
  <BrowserRouter>
    <AuthContexProvider>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
    </AuthContexProvider>
  </BrowserRouter>
  )
};

export default App;
