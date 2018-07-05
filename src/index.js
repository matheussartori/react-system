import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import AutorBox from './Autor';

import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/autor" component={AutorBox}/>
            <Route path="/livro" />
        </div>
    </Router>,
  document.getElementById('root'));
registerServiceWorker();
