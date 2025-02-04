import type { AirconMode } from './domain/airconMode'
import { updateAirconSetting } from './actions/updateAirconSettings'
import { getAirconAppliance } from './actions/getAirconAppliance'
import { SevenSegmentDisplay } from './components/sevenSegmentDisplay'
import { AirDirectionDisplay } from './components/airDirection'
import { AirVolumeDisplay } from './components/airVolume'
import { AirconModeDisplay } from './components/airconMode'
import { Display } from './components/display'
import { DisplayItem } from './components/displayItem'
import type { AirconSettings } from './domain/airconSettings'
import { invalidate } from '@lazarv/react-server'

const onChange = async (partial: Partial<AirconSettings>) => {
  'use server'
  const { id, settings } = await getAirconAppliance()
  const newSettings = {
    ...settings,
    ...partial,
  }
  await updateAirconSetting(id, newSettings)
}

const onModeChange = async (mode: AirconMode) => {
  'use server'
  await onChange({ mode })
}

const onTempChange = async (formData: FormData) => {
  'use server'
  const command = formData.get('command')
  const { id, aircon, settings } = await getAirconAppliance()
  const range = aircon.range.modes[settings.mode]
  if (!range) {
    return
  }
  const t = range.temp.findIndex((temp) => temp === settings.temp)
  const temp = ((cmd) => {
    switch (cmd) {
      case 'up':
        return range.temp[(t + 1) % range.temp.length]

      case 'down':
        return range.temp[(t - 1 + range.temp.length) % range.temp.length]

      default:
        return range.temp[t]
    }
  })(command)
  const newSettings = {
    ...settings,
    temp,
  }
  await updateAirconSetting(id, newSettings)
  await invalidate(['AirconAppliance'])
}

const onVolumeChange = async () => {
  'use server'
  const { id, aircon, settings } = await getAirconAppliance()
  const range = aircon.range.modes[settings.mode]
  if (!range) {
    return
  }
  const v = range.vol.findIndex((vol) => vol === settings.vol)
  const vol = range.vol[(v + 1) % range.vol.length]
  const newSettings = {
    ...settings,
    vol,
  }
  await updateAirconSetting(id, newSettings)
  await invalidate(['AirconAppliance'])
}

const onDirectionChange = async () => {
  'use server'
  const { id, aircon, settings } = await getAirconAppliance()
  const range = aircon.range.modes[settings.mode]
  if (!range) {
    return
  }
  const d = range.dir.findIndex((dir) => dir === settings.dir)
  const dir = range.dir[(d + 1) % range.dir.length]
  const newSettings = {
    ...settings,
    dir,
  }
  await updateAirconSetting(id, newSettings)
  await invalidate(['AirconAppliance'])
}

async function Controller() {
  const { aircon, settings } = await getAirconAppliance()
  const modes = Object.keys(aircon.range.modes) as AirconMode[]

  return (
    <Display>
      <DisplayItem>
        <AirconModeDisplay
          value={settings.mode}
          modes={modes}
          onChange={onModeChange}
        />
      </DisplayItem>
      <DisplayItem>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'row' }}>
          <SevenSegmentDisplay value={Number(settings.temp)} />
          <form action={onTempChange}>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexDirection: 'column',
              }}
            >
              <button type="submit" name="command" value="up">
                ▲
              </button>
              <button type="submit" name="command" value="down">
                ▼
              </button>
            </div>
          </form>
        </div>
      </DisplayItem>
      <div style={{ display: 'flex', gap: '16px' }}>
        <DisplayItem title="風量">
          <AirVolumeDisplay value={settings.vol} />
          <form action={onVolumeChange}>
            <button type="submit">変更</button>
          </form>
        </DisplayItem>
        <DisplayItem title="風向">
          <AirDirectionDisplay value={settings.dir} />
          <form action={onDirectionChange}>
            <button type="submit">変更</button>
          </form>
        </DisplayItem>
      </div>
    </Display>
  )
}

export default Controller
