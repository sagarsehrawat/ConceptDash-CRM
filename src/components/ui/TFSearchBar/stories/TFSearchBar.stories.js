import SearchBar from "../TFSearchBar";

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The \`SearchBar\` component is a versatile and user-friendly input field designed for search functionality. With a sleek search icon and customizable placeholder, it empowers users to effortlessly search through content. It can also be seamlessly integrated with backend API calls for advanced search capabilities. This component is perfect for enhancing the search experience in your web applications. Its simple yet powerful design enables users to locate specific items quickly, making it an ideal choice for various use cases.`
      }
    }
  },
  tags: ['autodocs'],
};

export const NoPlaceholder = {};

export const Placeholder = {
  args: {
    placeholder: 'Projects',
  },
};
