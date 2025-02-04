import React from 'react'
import './airVolume.css'
import type { AirconSettings } from '../domain/airconSettings'

type Props = {
  value: AirconSettings['vol']
}

export const AirVolumeDisplay = ({ value }: Props) => {
  const v = Number(value)
  return (
    <div className="air-volume">
      <div className={`bar bar-1 ${v >= 1 ? 'active' : ''}`} />
      <div className={`bar bar-2 ${v >= 2 ? 'active' : ''}`} />
      <div className={`bar bar-3 ${v >= 3 ? 'active' : ''}`} />
      <div className={`bar bar-4 ${v >= 4 ? 'active' : ''}`} />
      <div className={`bar bar-5 ${v >= 5 ? 'active' : ''}`} />
    </div>
  )
}
