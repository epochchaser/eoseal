import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactTextTransition, { presets } from 'react-text-transition'

const StakedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 60px;
`

class StakedView extends Component {
  state = {
    cpu_active: 0,
    net_active: 0,
    cpu_title_repo: ['Cpu (ms)', 'Cpu (eos)'],
    net_title_repo: ['Net (kb)', 'Net (eos)'],
    cpu_repo: [],
    net_repo: []
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { cpu_usage, cpu_staked, net_usage, net_staked, ram_usage } = nextProps
    return {
      ...prevState,
      cpu_repo: [cpu_usage + ' ms', cpu_staked + ' eos'],
      net_repo: [net_usage + ' kb', net_staked + ' eos']
    }
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        cpu_active: this.state.cpu_active + 1,
        net_active: this.state.net_active + 1
      })
    }, 5000)
  }

  render() {
    const { ram_usage } = this.props
    const {
      cpu_repo,
      net_repo,
      cpu_title_repo,
      net_title_repo,
      cpu_active,
      net_active
    } = this.state
    return (
      <StakedContainer>
        <div>
          <Typography variant="body1">
            <ReactTextTransition
              text={cpu_title_repo[cpu_active % cpu_title_repo.length]}
              spring={presets.gentle}
              delay={300}
              inline
            />
          </Typography>

          <Typography color={'primary'} variant="subheading">
            <ReactTextTransition
              text={cpu_repo[cpu_active % cpu_repo.length]}
              spring={presets.gentle}
            />
          </Typography>
        </div>
        <div>
          <Typography variant="body1">
            <ReactTextTransition
              text={net_title_repo[net_active % net_title_repo.length]}
              spring={presets.gentle}
              delay={300}
              inline
            />
          </Typography>
          <Typography color={'primary'} variant="subheading">
            <ReactTextTransition
              text={net_repo[net_active % net_repo.length]}
              spring={presets.gentle}
            />
          </Typography>
        </div>
        <div>
          <Typography variant="body1">Memory</Typography>
          <Typography color={'primary'} variant="subheading">
            {ram_usage} kb{' '}
          </Typography>
        </div>
      </StakedContainer>
    )
  }
}

StakedView.propTypes = {
  cpu_staked: PropTypes.number,
  cpu_usage: PropTypes.number,
  net_staked: PropTypes.number,
  net_usage: PropTypes.number,
  ram_usage: PropTypes.number
}

StakedView.defaultProps = {
  cpu_staked: 0,
  cpu_usage: 0,
  net_staked: 0,
  net_usage: 0,
  ram_usage: 0
}

export default StakedView
