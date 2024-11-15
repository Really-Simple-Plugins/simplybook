import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import SelectInput from "../../../components/Inputs/SelectInput";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SelectInput",
  component: SelectInput,
  parameters: {
    layout: "centered", // Optional parameter to center the component in the Canvas
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onChange: fn(),
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    value: "option1",
  },
};

export const Empty: Story = {
  args: {
    value: "",
  },
};

export const Disabled: Story = {
  args: {
    value: "option1",
    disabled: true,
  },
};
