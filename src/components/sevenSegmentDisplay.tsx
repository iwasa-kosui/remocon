import React from 'react'
import './sevenSegmentDisplay.css'

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'

const segmentMap: Record<Digit, ReadonlyArray<Segment>> = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'g', 'e', 'd'],
  '3': ['a', 'b', 'g', 'c', 'd'],
  '4': ['f', 'g', 'b', 'c'],
  '5': ['a', 'f', 'g', 'c', 'd'],
  '6': ['a', 'f', 'e', 'd', 'c', 'g'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g'],
}

type DigitProps = {
  value: Digit
}

const Digit = ({ value }: DigitProps) => {
  const segmentsOn = segmentMap[value] || []

  return (
    <div className="digit">
      <div
        className={`segment segment-a ${segmentsOn.includes('a') ? 'on' : 'off'}`}
      />
      <div
        className={`segment segment-b ${segmentsOn.includes('b') ? 'on' : 'off'}`}
      />
      <div
        className={`segment segment-c ${segmentsOn.includes('c') ? 'on' : 'off'}`}
      />
      <div
        className={`segment segment-d ${segmentsOn.includes('d') ? 'on' : 'off'}`}
      />
      <div
        className={`segment segment-e ${segmentsOn.includes('e') ? 'on' : 'off'}`}
      />
      <div
        className={`segment segment-f ${segmentsOn.includes('f') ? 'on' : 'off'}`}
      />
      <div
        className={`segment segment-g ${segmentsOn.includes('g') ? 'on' : 'off'}`}
      />
    </div>
  )
}

type Props = {
  value: number
}

export const SevenSegmentDisplay = ({ value }: Props) => {
  const n = String(Math.floor(value)).padStart(2, '0')
  const digits = Array.from(n).map((digit, d) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    <Digit key={d} value={digit as Digit} />
  ))
  return (
    <div className="seven-segment-display">
      {digits}
      <span>℃</span>
    </div>
  )
}
