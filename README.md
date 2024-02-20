# React Nes
 
Jsnes的React封装组件。

[Demo](https://kitashirakawa-tamako.github.io/react-nes/zh-CN/demo)

## 特性
* ROM 基于 JSNES 运行
* 支持键盘输入和手柄输入
* 内置虚拟手柄
* 支持游戏进度保存和读取

## 安装

```shell
npm install @kitashirakawa_tamako/react-nes
```

## 开始

### 模拟器

```js
import { ReactNes } from '@kitashirakawa_tamako/react-nes'
```

```js
<ReactNes />
```

### 虚拟手柄

```js
import { ReactNes, VirtualGamepad } from '@kitashirakawa_tamako/react-nes'
```
```js
const ref = useRef(null)
```
```js
<ReactNes ref={ref}/>
<VirtualGamepad nesRef={ref} />
```

## API

### Enum

#### Buttons
```js
import { Buttons } from '@kitashirakawa_tamako/react-nes'
{
    "BUTTON_A": 0,
    "BUTTON_B": 1,
    "BUTTON_SELECT": 2,
    "BUTTON_START": 3,
    "BUTTON_UP": 4,
    "BUTTON_DOWN": 5,
    "BUTTON_LEFT": 6,
    "BUTTON_RIGHT": 7
}
```
#### Controllers
```js
import { Controllers } from '@kitashirakawa_tamako/react-nes'
{
    "P1": 1,
    "P2": 2
}
```
### ReactNesProps

| 属性                | 说明                                    | 类型                            | 默认值 | 版本 |
| ------------------- | --------------------------------------- | ------------------------------- | ------ | ---- |
| buttons             | 键盘按键与手柄按钮的对应关系            | ReactNesButtons                 | -      |      |
| volume              | 音量大小0-1                             | number                          | 0.5    |      |
| fullScreen          | 是否全屏                                | boolean                         | false  |      |
| width               | 画面宽度                                    | number \| string                | 256    |      |
| height              | 画面高度                                    | number \| string                | 240    |      |
| fillStyle           | 默认填充颜色                            | string                          | #000   |      |
| onButtonEvent       | 键盘输入回调                            | (e: GamepadButtonEvent) => void | -      |      |
| onGamepadConnect    | gamepad api onconnect 事件触发时回调    | (gamepad: any) => void          | -      |      |
| onGamepadDisconnect | gamepad api ondisconnect 事件触发时回调 | (id: number) => void            | -      |      |

### ReactNesRef

| 属性    | 说明       | 类型               | 默认值     | 版本 |
| ------- | ---------- | ------------------ | ---------- | ---- |
| buttonDown | 按键按下输入 | (controller: number, button: number) => void | -      |      |
| buttonUp | 按键松开输入 | (controller: number, button: number) => void | -      |      |
| saveData | 保存游戏进度 | () => NesData | -            |      |
| loadData | 加载游戏进度 | (data: NesData) => void | -       |      |
| reset | 重置虚拟机 | () => void | -       |      |
| loadRom | 加载游戏资源 | (rom: string) => void | -       |      |

### ReactNesButtons
| 属性    | 说明       | 类型               | 默认值     | 版本 |
| ------- | ---------- | ------------------ | ---------- | ---- |
| a1      | P1攻击键A  | KeyboardEvent.code | 'KeyJ'       |      |
| b1      | P1攻击键B  | KeyboardEvent.code | 'KeyK'       |      |
| select1 | P1选择键   | KeyboardEvent.code | 'KeyF'       |      |
| start1  | P1开始键   | KeyboardEvent.code | 'KeyH'       |      |
| up1     | P1方向键上 | KeyboardEvent.code | 'KeyW'       |      |
| down1   | P1方向键下 | KeyboardEvent.code | 'KeyS'       |      |
| left1   | P1方向键左 | KeyboardEvent.code | 'KeyA'       |      |
| right1  | P1方向键右 | KeyboardEvent.code | 'KeyD'       |      |
| a2      | P2攻击键A  | KeyboardEvent.code | 'Numpad1'    |      |
| b2      | P2攻击键B  | KeyboardEvent.code | 'Numpad2'    |      |
| select2 | P2选择键   | KeyboardEvent.code | 'Numpad4'    |      |
| start2  | P2开始键   | KeyboardEvent.code | 'Numpad5'    |      |
| up2     | P2方向键上 | KeyboardEvent.code | 'ArrowUp'    |      |
| down2   | P2方向键下 | KeyboardEvent.code | 'ArrowDown'  |      |
| left2   | P2方向键左 | KeyboardEvent.code | 'ArrowLeft'  |      |
| right2  | P2方向键右 | KeyboardEvent.code | 'ArrowRight' |      |

### GamepadButtonEvent
| 属性       | 说明           | 类型                  | 默认值 | 版本 |
| ---------- | -------------- | --------------------- | ------ | ---- |
| type       | 松开/按下      | 'keyup' \| 'keydown'  | -      |      |
| button     | 手柄按键枚举值 | number                | -      |      |
| code       | 键盘按键code码 | KeyboardEvent.code    | -      |      |
| controller | 玩家 1/2       | number                | -      |      |

### NesData
| 属性    | 说明 | 类型   | 默认值 | 版本 |
| ------- | ---- | ------ | ------ | ---- |
| cpu     | -    | object | -      |      |
| mmap    | -    | object | -      |      |
| ppu     | -    | object | -      |      |
| romData | -    | string | -      |      |