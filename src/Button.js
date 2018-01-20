import React from 'react'
import cssStyles from './Button.module.css'

export default ({onClick, text, selected}) => <button onClick={onClick} className={`${cssStyles.button} ${selected ? cssStyles.selected : ''}`}>{text}</button>