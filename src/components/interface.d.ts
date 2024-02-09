import { type RefObject } from 'react'

export interface GamepadButton {
  button: number
  code: string
  controller: number
}

export interface NesGamepad {
  a1: GamepadButton
  b1: GamepadButton
  select1: GamepadButton
  start1: GamepadButton
  up1: GamepadButton
  down1: GamepadButton
  left1: GamepadButton
  right1: GamepadButton
  a2: GamepadButton
  b2: GamepadButton
  select2: GamepadButton
  start2: GamepadButton
  up2: GamepadButton
  down2: GamepadButton
  left2: GamepadButton
  right2: GamepadButton
}
export interface ReactNesButtons {
  a1?: string
  b1?: string
  select1?: string
  start1?: string
  up1?: string
  down1?: string
  left1?: string
  right1?: string
  a2?: string
  b2?: string
  select2?: string
  start2?: string
  up2?: string
  down2?: string
  left2?: string
  right2?: string
}

export interface ReactNesProps {
  /**
   * 键盘按键与手柄按钮的对应关系
   */
  buttons?: ReactNesButtons
  /**
   * 音量大小0-1
   */
  volume?: number
  /**
   * 是否全屏
   */
  fullScreen?: boolean
  /**
   * 宽度
   */
  width?: number | string
  /**
   * 高度
   */
  height?: number | string
  /**
   * 默认填充颜色
   */
  fillStyle?: string
  /**
   * 键盘输入回调
   */
  onButtonEvent?: (e: GamepadButtonEvent) => void
  /**
   * gamepad api onconnect 事件触发时回调
   */
  onGamepadConnect?: (gamepad: any) => void
  /**
   * gamepad api ondisconnect 事件触发时回调
   */
  onGamepadDisconnect?: (id: number) => void
}

export interface ReactNesRef {
  buttonDown: (action: number) => void
  buttonUp: (action: number) => void
  saveData: () => NesData
  loadData: (data: NesData) => void
  reset: () => void
  loadRom: (rom: string) => void
}

export interface VirtualGamepadProps {
  nesRef: RefObject<ReactNesRef>
}

export interface GamepadButtonEvent extends GamepadButton {
  type: 'keyup' | 'keydown'
}

export interface NesData {
  cpu: object
  mmap: object
  ppu: object
  romData: string
}
