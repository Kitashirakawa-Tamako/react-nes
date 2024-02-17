import { type NesData, type ReactNesRef } from '@/components/interface'
import { useState, type ReactNode, useRef } from 'react'
import { ReactNes, VirtualGamepad } from '@/components'

export default function Demo (): ReactNode {
  const [volume, setVolume] = useState(1)
  const [fullScreen, setFullScreen] = useState(false)
  const ref = useRef<ReactNesRef>(null)
  const [buttons, setButtons] = useState({ a1: 'KeyJ', b1: 'KeyK' })
  return (
    <div className="demo">
      <div>
        <button onClick={() => {
          fetch('/react-nes/超级玛丽.nes').then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`)
            }

            return response
          })
            .then(async (response) => await response.blob()) // 转换为 blob 格式
            .then((blobData) => {
              // 将Blob对象读取为字符对象，相当于用记事本打开文件
              const reader = new FileReader()
              reader.readAsBinaryString(blobData)
              reader.onload = e => {
                // nes虚拟机加载rom
                ref.current?.loadRom(reader.result as string)
              }
            })
            .catch((error) => {
              console.error('Error occurred while fetching the blob object:', error)
            })
        }}>Load Super Mario Bros</button>
        <button onClick={(e) => {
          if (volume === 0) {
            setVolume(1)
          } else {
            setVolume(0)
          }
        }}>Volume {volume}</button>
        <button onClick={() => {
          setFullScreen(!fullScreen)
        }}>Full screen</button>
        <button onClick={() => {
          const json = ref.current?.saveData()
          const saveData = JSON.stringify(json)
          localStorage.setItem('test', saveData)
        }}>Save data</button>
        <button onClick={() => {
          const saveData = localStorage.getItem('test')
          if (saveData == null) {
            console.log('nothing to load')
            return
          }
          const data = JSON.parse(saveData)
          ref.current?.loadData(data as NesData)
        }}>Load data</button>
        <button onClick={() => {
          ref.current?.reset()
        }}>Reset</button>
      </div>
      <div>
        buttons setting:
        a1
        <input
          defaultValue={buttons.a1}
          onBlur={(e) => {
            setButtons({
              ...buttons,
              a1: e.target.value
            })
          }}/>
        b1
        <input
          defaultValue={buttons.b1}
          onBlur={(e) => {
            setButtons({
              ...buttons,
              b1: e.target.value
            })
          }}/>
      </div>
      <ReactNes
        onGamepadConnect={(gamepad) => { console.log(gamepad) }}
        onGamepadDisconnect={(id) => { console.log(id) }}
        onButtonEvent={(e) => { console.log(e) }}
        ref={ref}
        buttons={buttons}
        volume={volume}
        fullScreen={fullScreen}
        width={512}
        height={480} />
      <div style={{ marginTop: 10, width: 400 }}>
        <VirtualGamepad nesRef={ref} />
      </div>
    </div>
  )
}
