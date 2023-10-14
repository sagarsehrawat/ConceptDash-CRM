/** @type { import('@storybook/react').Preview } */
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      toc: true
    }
  },
};

export default preview;
