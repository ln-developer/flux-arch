import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { InputDateComponent } from './input-date.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<InputDateComponent> = {
  title: 'Example/InputDate',
  component: InputDateComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
        control: 'text',
        description: 'Label'
    },
    placeholder: {
        control: 'text',
        description: 'Placeholder'
    },
    minDate: {
        control: 'date',
        description: 'Минимально возвожная дата для выбора'
    },
    maxDate: {
        control: 'date',
        description: 'Максимально возвожная дата для выбора'
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimationsAsync()],
    }),
  ],
};

export default meta;
type Story = StoryObj<InputDateComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Дата',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Дата',
  },
};

export const Large: Story = {
  args: {
    label: 'Дата',
  },
};

export const Small: Story = {
  args: {
    label: 'Дата',
  },
};
