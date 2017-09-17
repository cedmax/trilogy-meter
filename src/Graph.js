import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import slugify from 'slugify'

const formatImage = (string) => slugify(string.toLowerCase(), {remove: /[$*_+~.()'"!/\-:@]/g})
const formatTooltip = (label) => {
  return (
    <img src={`/images/${formatImage(label)}.jpg`} width="120" />
  )
}

export default class Graph extends Component {
  render () {
    let counter = 1
    const {
      movies,
      visible
    } = this.props

    return (
      <BarChart className={cssStyles.chart} width={300} height={300} data={movies}>
        <XAxis dataKey="name" tickCount={3} interval={0} tickFormatter={(tick) => counter++} />
        <YAxis domain={[0, 10]} />
        <CartesianGrid strokeDasharray="1 1"/>
        <Tooltip labelFormatter={!visible ? formatTooltip : null}/>
        <Bar dataKey="rating" fill="#3C8DC7" onClick={this.props.onClick} />
      </BarChart>
    )
  }
}
