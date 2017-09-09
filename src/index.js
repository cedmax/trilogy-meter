import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import affiliate from './affiliate'
import registerServiceWorker from './registerServiceWorker';

const data = JSON.parse(document.getElementById('movies').innerHTML)
ReactDOM.render(<App series={data} affiliate={affiliate} />, document.getElementById('root'))

registerServiceWorker()
