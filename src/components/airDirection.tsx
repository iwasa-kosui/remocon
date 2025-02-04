import React from 'react'
import './airDirection.css'
import type { AirconSettings } from '../domain/airconSettings'

const startX = 0
const startY = 0
const size = 20
const angle = 10

const max = 5

type Props = {
  value: AirconSettings['dir']
  height?: number
}

export const AirDirectionDisplay = ({ value }: Props) => {
  const radian = (degree: number) => (degree * Math.PI) / 180
  const x1 = Math.round(startX + size * Math.cos(radian(-angle)))
  const y1 = Math.round(startY + size * Math.sin(radian(-angle)))
  const x2 = Math.round(startX + size * Math.cos(radian(angle)))
  const y2 = Math.round(startY + size * Math.sin(radian(angle)))
  return (
    <svg
      role="img"
      aria-label="風向"
      className="air-direction"
      viewBox={`0 0 ${size + 2} ${size + 2}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 風向は、デフォルトで上向きの矢印を、中心(50,50)を軸に指定角度だけ回転 */}
      <g
        transform={`rotate(${angle + (Number(value) % (max + 1)) * ((90 - angle * 2) / max)}, 0, 2)`}
      >
        <path
          d={`M ${startX},${startY} L ${x1},${y1} a ${size} ${size} ${-angle} 0 1 ${x2 - x1},${y2 - y1} z`}
          fill="var(--arrow-color, #333)"
        />
      </g>
    </svg>
  )
}
