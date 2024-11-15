import * as React from "react";
import type { Preview } from "@storybook/react";
import "../src/tailwind.generated.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div id={"simplybook_app"}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
