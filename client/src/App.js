import './styles/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Todo from './modules/todo';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={<Todo />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;