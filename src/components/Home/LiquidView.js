import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Track = styled.circle`
  fill: transparent;
  stroke: #e0e0e0;
  stroke-width: 26;
`
const Indicator = styled.circle`
  fill: transparent;
  stroke: #009688;
  stroke-width: 26;
  stroke-dasharray: 0 10000;
  transition: stroke-dasharray 0.8s ease;
`

const Donutchart = styled.svg`
  margin: 0 auto;
  border-radius: 50%;
  display: block;
`

const Dtext = styled.text`
  font-family: 'Roboto';
  fill: #607580;
`

const Dtextval = styled.tspan`
  font-size: 22px;
`

const Dtexttotal = styled.tspan`
  font-size: 14px;
`

const Dtextlabel = styled.tspan`
  font-size: 12px;
`

class DonutChart extends Component {
  render() {
    const halfsize = this.props.size * 0.5
    const radius = halfsize - this.props.strokewidth * 0.5
    const circumference = 2 * Math.PI * radius
    const strokeval = (this.props.percentage * circumference) / 100
    const dashval = strokeval + ' ' + circumference

    const trackstyle = { strokeWidth: this.props.strokewidth }
    const indicatorstyle = { strokeWidth: this.props.strokewidth, strokeDasharray: dashval }
    const rotateval = 'rotate(-90 ' + halfsize + ',' + halfsize + ')'

    return (
      <Donutchart width={this.props.size} height={this.props.size}>
        <Track r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} />
        <Indicator
          r={radius}
          cx={halfsize}
          cy={halfsize}
          transform={rotateval}
          style={indicatorstyle}
        />
        <Dtext x={halfsize} y={halfsize} style={{ textAnchor: 'middle' }}>
          <Dtextval>{this.props.liquid}</Dtextval>
          <Dtexttotal> / {this.props.totalBalance}</Dtexttotal>
          <Dtextlabel x={halfsize} y={halfsize + 16}>
            eos {this.props.valuelabel}
          </Dtextlabel>
        </Dtext>
      </Donutchart>
    )
  }
}

DonutChart.propTypes = {
  percentage: PropTypes.number,
  value: PropTypes.number,
  valuelabel: PropTypes.string,
  size: PropTypes.number,
  strokewidth: PropTypes.number
}
DonutChart.defaultProps = {
  percentage: 0,
  liquid: 0,
  totalBalance: 0,
  valuelabel: 'Available',
  size: 186,
  strokewidth: 16
}

class LiquidView extends Component {
  render() {
    const { liquid, totalBalance } = this.props

    const donutPercentage = totalBalance === 0 ? 0 : Math.floor((liquid / totalBalance) * 100)
    return (
      <div>
        <DonutChart percentage={donutPercentage} liquid={liquid} totalBalance={totalBalance} />
      </div>
    )
  }
}

LiquidView.propTypes = {
  liquid: PropTypes.number,
  totalBalance: PropTypes.number
}

LiquidView.defaultProps = {
  liquid: 0,
  totalBalance: 0
}

export default LiquidView
