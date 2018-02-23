/**
 * Created by alvaroviebrantz on 28/06/16.
 */

import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import './index.scss';
//import 'muicss/lib/css/mui.css';
import 'github-markdown-css';

ReactDom.render(<App />, document.getElementById('root'));
registerServiceWorker();
