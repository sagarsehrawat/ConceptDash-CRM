import SearchBar from "../TFSearchBar";

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const NoPlaceholder = {};

export const Placeholder = {
  args: {
    placeholder: 'Projects',
  },
};
