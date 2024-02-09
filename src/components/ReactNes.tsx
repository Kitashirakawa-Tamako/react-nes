import { useEffect, type ReactNode, useRef, forwardRef, useImperativeHandle } from 'react'
import { NES, Controller } from 'jsnes'
import { type ReactNesRef, type NesGamepad, type ReactNesProps, type GamepadButton, type NesData } from './interface'

const SCREEN_WIDTH = 256
const SCREEN_HEIGHT = 240
let context: CanvasRenderingContext2D

/*
    * ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。
    * 当使用同一个ArrayBuffer对象创建不同的TypedArray视图时，它们共享同一块内存。这意味着当修改一个TypedArray中的元素时，其他共享同一内存的TypedArray也会反映这个改变。
    */
const imageBuffer: ArrayBuffer = new ArrayBuffer(SCREEN_WIDTH * SCREEN_HEIGHT * 4)

/*
  * ImageData 对象表示 canvas 元素指定区域的像素数据。
  * ImageData对象的数据参数和属性，是 Uint8ClampedArray 类型数组的实例。
  * 图片像素数据实际上就是一个个的颜色值，可使用 RGBA 颜色模型来表示，所以 Uint8ClampedArray 对象的数据，就是图像的一个个像素点的颜色值，长度为 windth * height * 4，这里的 4 就是对应的 RGBA 4个颜色通道。
  * 使用Uint8ClampedArray构造函数并将ArrayBuffer对象作为参数，对象的底层内存存储在之前创建的ArrayBuffer对象中。
  * 可以使用Uint8ClampedArray对象来操作和访问底层的二进制数据。
  */
const imageBuffer8: Uint8ClampedArray = new Uint8ClampedArray(imageBuffer)

/*
  * 使用Uint32Array构造函数并将ArrayBuffer对象作为参数，对象的底层内存存储在之前创建的ArrayBuffer对象中。
  * Uint32Array对象允许你以32位无符号整数的形式操作和访问底层的二进制数据。
  */
const imageBuffer32: Uint32Array = new Uint32Array(imageBuffer)
let timer: NodeJS.Timeout
let audioCtx: AudioContext, scriptNode: ScriptProcessorNode, gainNode: GainNode
// audioCtx从声道数组读取的索引
let audioReadIndex = 0
// nes模拟器向声道数组写入的索引
let audioWriteIndex = 0
// 音频缓存长度
const audioChannelLength = 1024

/*
* 左、右声道
*/
const audioLeftChannel: Float32Array = new Float32Array(audioChannelLength)
const audioRightChannel: Float32Array = new Float32Array(audioChannelLength)
// 虚拟机
const nes = new NES({
  onFrame: (buffer: number[]) => {
    // change RGB to ARGB
    for (let i = 0; i < imageBuffer32.length; i++) {
      imageBuffer32[i] = 0xff000000 | buffer[i]
    }
  },
  onAudioSample: (left: number, right: number) => {
    audioLeftChannel[audioWriteIndex] = left
    audioRightChannel[audioWriteIndex] = right
    audioWriteIndex = (audioWriteIndex + 1) & (audioChannelLength - 1)
  }
})

const ReactNes = forwardRef<ReactNesRef, ReactNesProps>(function ReactNes (props: ReactNesProps, ref): ReactNode {
  const buttonDown = (action: number): void => {
    nes.buttonDown(1, action)
  }
  const buttonUp = (action: number): void => {
    nes.buttonUp(1, action)
  }
  const saveData = (): NesData => {
    return nes.toJSON()
  }
  const loadData = (data: NesData): void => {
    load(data.romData)
    nes.fromJSON(data)
  }
  const reset = (): void => {
    clearInterval(timer)
    // 填充颜色
    context.fillStyle = props.fillStyle ?? '#000'
    // 绘制的矩形。默认的填充颜色是黑色。
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
    if (gainNode != null) {
      gainNode.disconnect()
    }
    if (scriptNode != null) {
      scriptNode.disconnect()
    }
    nes.reset()
  }
  const loadRom = (rom: string): void => {
    load(rom)
  }
  useImperativeHandle(ref, () => ({
    buttonDown,
    buttonUp,
    saveData,
    loadData,
    reset,
    loadRom
  }))

  const nesGamepad: NesGamepad = {
    a1: {
      controller: 1,
      button: Controller.BUTTON_A,
      code: props.buttons?.a1 ?? 'KeyJ'
    },
    b1: {
      controller: 1,
      button: Controller.BUTTON_B,
      code: props.buttons?.b1 ?? 'KeyK'
    },
    select1: {
      controller: 1,
      button: Controller.BUTTON_SELECT,
      code: props.buttons?.select1 ?? 'KeyF'
    },
    start1: {
      controller: 1,
      button: Controller.BUTTON_START,
      code: props.buttons?.start1 ?? 'KeyH'
    },
    up1: {
      controller: 1,
      button: Controller.BUTTON_UP,
      code: props.buttons?.up1 ?? 'KeyW'
    },
    down1: {
      controller: 1,
      button: Controller.BUTTON_DOWN,
      code: props.buttons?.down1 ?? 'KeyS'
    },
    left1: {
      controller: 1,
      button: Controller.BUTTON_LEFT,
      code: props.buttons?.left1 ?? 'KeyA'
    },
    right1: {
      controller: 1,
      button: Controller.BUTTON_RIGHT,
      code: props.buttons?.right1 ?? 'KeyD'
    },
    a2: {
      controller: 2,
      button: Controller.BUTTON_A,
      code: props.buttons?.a2 ?? 'Numpad1'
    },
    b2: {
      controller: 2,
      button: Controller.BUTTON_B,
      code: props.buttons?.b2 ?? 'Numpad2'
    },
    select2: {
      controller: 2,
      button: Controller.BUTTON_SELECT,
      code: props.buttons?.select2 ?? 'Numpad4'
    },
    start2: {
      controller: 2,
      button: Controller.BUTTON_START,
      code: props.buttons?.start2 ?? 'Numpad5'
    },
    up2: {
      controller: 2,
      button: Controller.BUTTON_UP,
      code: props.buttons?.up2 ?? 'ArrowUp'
    },
    down2: {
      controller: 2,
      button: Controller.BUTTON_DOWN,
      code: props.buttons?.down2 ?? 'ArrowDown'
    },
    left2: {
      controller: 2,
      button: Controller.BUTTON_LEFT,
      code: props.buttons?.left2 ?? 'ArrowLeft'
    },
    right2: {
      controller: 2,
      button: Controller.BUTTON_RIGHT,
      code: props.buttons?.right2 ?? 'ArrowRight'
    }
  }

  const buttons: GamepadButton[] = []
  const keys = Object.keys(nesGamepad)
  for (const key of keys) {
    buttons.push(nesGamepad[key as keyof NesGamepad])
  }

  const canvas = useRef<HTMLCanvasElement>(null)

  const onFrame = (): void => {
    const imageData = new ImageData(imageBuffer8, SCREEN_WIDTH, SCREEN_HEIGHT)
    context.putImageData(imageData, 0, 0)
    nes.frame()
  }

  const load = (rom: string): void => {
    reset()
    nes.loadROM(rom)
    if (audioCtx == null) {
      audioCtx = new window.AudioContext()
    }
    if (gainNode == null) {
      gainNode = audioCtx.createGain()
    }
    if (scriptNode == null) {
      scriptNode = audioCtx.createScriptProcessor(audioChannelLength)
      scriptNode.onaudioprocess = (event) => {
        const out = event.outputBuffer
        const l = out.getChannelData(0)
        const r = out.getChannelData(1)
        for (let i = 0; i < out.length; i++) {
          l[i] = audioLeftChannel[audioReadIndex]
          r[i] = audioRightChannel[audioReadIndex]
          audioReadIndex = (audioReadIndex + 1) & (audioChannelLength - 1)
        }
      }
    }
    gainNode.gain.value = props.volume ?? 0.5
    gainNode.connect(audioCtx.destination)
    scriptNode.connect(gainNode)
    timer = setInterval(onFrame, 16.7)
    document.onkeydown = (e) => {
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].code === e.code) {
          nes.buttonDown(buttons[i].controller, buttons[i].button)
          props.onButtonEvent?.({ type: 'keydown', ...buttons[i] })
        }
      }
    }

    document.onkeyup = (e) => {
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].code === e.code) {
          nes.buttonUp(buttons[i].controller, buttons[i].button)
          props.onButtonEvent?.({ type: 'keyup', ...buttons[i] })
        }
      }
    }
  }

  useEffect(() => {
    if (canvas.current != null) {
      const contextTemp = canvas.current.getContext('2d', { willReadFrequently: true })
      if (contextTemp != null) {
        context = contextTemp
        reset()
      }
    }
    require('gamecontroller.js')
    const gameControl = window.gameControl
    gameControl.on('connect', function (gamepad: any) {
      props.onGamepadConnect?.(gamepad)
      const controller = gamepad.id + 1
      gamepad
        .before('button0', () => { nes.buttonDown(controller, Controller.BUTTON_A) })
        .after('button0', () => { nes.buttonUp(controller, Controller.BUTTON_A) })
        .before('button1', () => { nes.buttonDown(controller, Controller.BUTTON_B) })
        .after('button1', () => { nes.buttonUp(controller, Controller.BUTTON_B) })
        .before('select', () => { nes.buttonDown(controller, Controller.BUTTON_SELECT) })
        .after('select', () => { nes.buttonUp(controller, Controller.BUTTON_SELECT) })
        .before('start', () => { nes.buttonDown(controller, Controller.BUTTON_START) })
        .after('start', () => { nes.buttonUp(controller, Controller.BUTTON_START) })
        .before('up', () => { nes.buttonDown(controller, Controller.BUTTON_UP) })
        .after('up', () => { nes.buttonUp(controller, Controller.BUTTON_UP) })
        .before('down', () => { nes.buttonDown(controller, Controller.BUTTON_DOWN) })
        .after('down', () => { nes.buttonUp(controller, Controller.BUTTON_DOWN) })
        .before('left', () => { nes.buttonDown(controller, Controller.BUTTON_LEFT) })
        .after('left', () => { nes.buttonUp(controller, Controller.BUTTON_LEFT) })
        .before('right', () => { nes.buttonDown(controller, Controller.BUTTON_RIGHT) })
        .after('right', () => { nes.buttonUp(controller, Controller.BUTTON_RIGHT) })
        .before('button12', () => { nes.buttonDown(controller, Controller.BUTTON_UP) })
        .after('button12', () => { nes.buttonUp(controller, Controller.BUTTON_UP) })
        .before('button13', () => { nes.buttonDown(controller, Controller.BUTTON_DOWN) })
        .after('button13', () => { nes.buttonUp(controller, Controller.BUTTON_DOWN) })
        .before('button14', () => { nes.buttonDown(controller, Controller.BUTTON_LEFT) })
        .after('button14', () => { nes.buttonUp(controller, Controller.BUTTON_LEFT) })
        .before('button15', () => { nes.buttonDown(controller, Controller.BUTTON_RIGHT) })
        .after('button15', () => { nes.buttonUp(controller, Controller.BUTTON_RIGHT) })
    })
    gameControl.on('disconnect', function (id: number) {
      props.onGamepadDisconnect?.(id)
    })
  }, [])

  useEffect(() => {
    if (gainNode != null) {
      gainNode.gain.value = props.volume ?? 0.5
    }
  }, [props.volume])

  useEffect(() => {
    if (props.fullScreen === true) {
      canvas.current?.requestFullscreen().catch(() => { })
    }
  }, [props.fullScreen])

  return (
    <>
      <div>
        <canvas
          ref={canvas}
          style={{ width: props.width ?? SCREEN_WIDTH, height: props.height ?? SCREEN_HEIGHT }}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
        />
      </div>
    </>

  )
})

export default ReactNes
