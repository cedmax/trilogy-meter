import React, { Component } from 'react'
import { 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip 
} from 'recharts'
import slugify from 'slugify'
import cssStyles from './Graph.module.css'

const formatImage = (string) => slugify(string.toLowerCase(), {remove: /[$*_+~.()'"!/\-:@]/g})
const formatTooltip = (label) => {
  return [
    <img key="img" alt={label} src={`/images/${formatImage(label)}.jpg`} width="120" />,
    <small key="title" className={cssStyles.title}>{label}</small>
  ]
}

export default ({
  movies,
  label,
  onClick
}) => {
  let counter = 1
  const length = movies.length

  return (
    <ResponsiveContainer style={{maxWidth: 300}} width="90%" height={300}>
      <BarChart data={movies}>
        <XAxis dataKey="name" tickCount={3} interval={0} tickFormatter={() => counter++ % length || length} />
        <YAxis tickCount={6} domain={[0, 10]} />
        <CartesianGrid strokeDasharray="1 1"/>
        <Tooltip labelFormatter={formatTooltip}/>
        <Bar unit=" ⭑" dataKey="rating" fill="#3C8DC7" onClick={onClick} />
      </BarChart>
    </ResponsiveContainer>
  )
}
