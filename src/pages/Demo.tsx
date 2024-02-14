import { type NesData, type ReactNesRef } from '@/components/interface'
import { useState, type ReactNode, useRef } from 'react'
import { ReactNes, VirtualGamepad } from '@/components'

export default function Demo (): ReactNode {
  const [volume, setVolume] = useState(1)
  const [fullScreen, setFullScreen] = useState(false)
  const ref = useRef<ReactNesRef>(null)
  return (
    <div className="demo">
      <button onClick={() => {
        fetch('/超级玛丽.nes').then((response) => {
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
      }}>加载游戏</button>
      <button onClick={(e) => {
        if (volume === 0) {
          setVolume(1)
        } else {
          setVolume(0)
        }
      }}>音量{volume}</button>
      <button onClick={() => {
        setFullScreen(!fullScreen)
      }}>全屏</button>
      <button onClick={() => {
        const json = ref.current?.saveData()
        const saveData = JSON.stringify(json)
        localStorage.setItem('test', saveData)
      }}>储存</button>
      <button onClick={() => {
        const saveData = localStorage.getItem('test')
        if (saveData == null) {
          console.log('nothing to load')
          return
        }
        const data = JSON.parse(saveData)
        ref.current?.loadData(data as NesData)
      }}>加载存档</button>
      <button onClick={() => {
        ref.current?.reset()
      }}>重置</button>
      <ReactNes
        onGamepadConnect={(gamepad) => { console.log(gamepad) }}
        onGamepadDisconnect={(id) => { console.log(id) }}
        ref={ref}
        buttons={{ a2: 'KeyZ', b2: 'KeyX' }}
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
