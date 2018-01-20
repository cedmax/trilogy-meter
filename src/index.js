import React from 'react'
import App from './App'
import {
  render,
  hydrate
} from 'react-dom'
import affiliate from './helpers/affiliate'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const dataNode = document.getElementById('movies')
const updatedAt = parseInt(dataNode.getAttribute('data-updated'), 10)
const data = JSON.parse(dataNode.innerHTML)
const rootNode = document.getElementById('root')

if (rootNode.hasChildNodes()) {
  hydrate(<App series={data} affiliate={affiliate} updatedAt={updatedAt} />, rootNode)
} else {
  render(<App series={data} affiliate={affiliate} updatedAt={updatedAt} />, rootNode)
}

registerServiceWorker()
