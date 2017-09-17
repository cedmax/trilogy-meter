import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import slugify from 'slugify'

const formatImage = (string) => slugify(string.toLowerCase(), {remove: /[$*_+~.()'"!/\-:@]/g})
const formatTooltip = (label) => {
  return (
    <img alt={label} src={`/images/${formatImage(label)}.jpg`} width="120" />
  )
}

export default class Graph extends Component {
  render () {
    let counter = 1
    const {
      movies,
      label
    } = this.props

    const length = movies.length

    return (
      <ResponsiveContainer style={{maxWidth: 300}} width="90%" height={300}>
        <BarChart data={movies}>
          <XAxis dataKey="name" tickCount={3} interval={0} tickFormatter={() => counter++ % length || length} />
          <YAxis tickCount={6} domain={[0, 10]} />
          <CartesianGrid strokeDasharray="1 1"/>
          <Tooltip labelFormatter={!label ? formatTooltip : null}/>
          <Bar unit="⭑" dataKey="rating" fill="#3C8DC7" onClick={this.props.onClick} />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
