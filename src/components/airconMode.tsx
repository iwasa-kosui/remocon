'use client'
import { AirconMode } from '../domain/airconMode'
import './airconMode.css'

type Props = {
  value: AirconMode
  modes: AirconMode[]
  onChange: (mode: AirconMode) => Promise<void>
}

export const AirconModeDisplay = ({ value, onChange, modes }: Props) => {
  return (
    <div className="aircon-mode">
      {modes.map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => {
            onChange(mode)
          }}
          className={`mode ${value === mode ? 'mode-on' : 'mode-off'}`}
        >
          {AirconMode.display(mode)}
        </button>
      ))}
    </div>
  )
}
