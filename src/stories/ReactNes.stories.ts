import type { Meta, StoryObj } from '@storybook/react'

import ReactNes from '../components/ReactNes'
import { ReactNesProps } from '@/components/interface'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ReactNes',
  component: ReactNes,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    buttons: {
      table: {
        subcategory: 'ReactNesProps',
        type: { summary: 'ReactNesButtons' }
      }
    },
    volume: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      table: {
        subcategory: 'ReactNesProps',
        type: { summary: '0-1' },
        defaultValue: {
          summary: '0.5'
        }
      }
    },
    fullScreen: {
      table: {
        subcategory: 'ReactNesProps',
        defaultValue: {
          summary: 'false'
        }
      }
    },
    fillStyle: {
      control: 'color',
      table: {
        subcategory: 'ReactNesProps',
        defaultValue: {
          summary: '#000'
        }
      }
    },
    width: {
      table: {
        subcategory: 'ReactNesProps',
        defaultValue: {
          summary: '256'
        }
      }
    },
    height: {
      table: {
        subcategory: 'ReactNesProps',
        defaultValue: {
          summary: '240'
        }
      }
    },
    onButtonEvent: {
      table: {
        subcategory: 'ReactNesProps'
      }
    },
    onGamepadConnect: {
      table: {
        subcategory: 'ReactNesProps'
      }
    },
    onGamepadDisconnect: {
      table: {
        subcategory: 'ReactNesProps'
      }
    }
  }
} satisfies Meta<typeof ReactNes>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LoadRom: Story = {
  args: {

  }
}
