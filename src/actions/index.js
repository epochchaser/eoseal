import * as types from './ActionTypes'

export const updateLiquid = liquid => {
  return { type: types.UPDATE_LIQUID, liquid }
}

export const updateCpuStaked = cpuStaked => {
  return { type: types.UPDATE_CPU_STAKED, cpuStaked }
}

export const updateRamStaked = ramStaked => {
  return { type: types.UPDATE_RAM_STAKED, ramStaked }
}

export const updateNetStaked = netStaked => {
  return { type: types.UPDATE_NET_STAKED, netStaked }
}
