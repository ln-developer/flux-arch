import type { Meta, StoryObj } from '@storybook/angular';
import { InputAddressComponent } from './input-address.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<InputAddressComponent> = {
  title: 'Example/InputAddress',
  component: InputAddressComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Test Text',
    },
  },
};

export default meta;
type Story = StoryObj<InputAddressComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Адрес',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Адрес',
  },
};

export const Large: Story = {
  args: {
    label: 'Адрес',
  },
};

export const Small: Story = {
  args: {
    label: 'Адрес',
  },
};
