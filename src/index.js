import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import affiliate from './affiliate'
import registerServiceWorker from './registerServiceWorker'

const dataNode = document.getElementById('movies')
const updatedAt = parseInt(dataNode.getAttribute('data-updated'), 10)
const data = JSON.parse(dataNode.innerHTML)
ReactDOM.render(<App series={data} affiliate={affiliate} updatedAt={updatedAt} />, document.getElementById('root'))

registerServiceWorker()
