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

export interface ReactNesProps {
  buttons?: {
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
  volume?: number
  fullScreen?: boolean
  width?: number | string
  height?: number | string
  fillStyle?: string
  onButtonEvent?: (e: GamepadButtonEvent) => void
  onGamepadConnect?: (gamead: any) => void
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
