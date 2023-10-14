import Chip from "../TFChip";

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
        description: {
            component: 'The `Chip` component is a dynamic UI element designed to serve as a label or status indicator. It displays a labeled chip with a distinct visual style based on its content, making it ideal for a variety of use cases in data-driven applications.'
        }
    }
  },
  tags: ['autodocs'],
};

export const Completed = {
    args: {
        label: 'Completed',
        onUpdate: null
    }
};

export const InProgress = {
    args: {
        label: 'In Progress',
        onUpdate: null
    }
};

export const NotStarted = {
    args: {
        label: 'Not Started',
        onUpdate: null
    }
};

export const Lost = {
    args: {
        label: 'Lost',
        onUpdate: null
    }
};

export const Won = {
    args: {
        label: 'Won',
        onUpdate: null
    }
};

export const Pending = {
    args: {
        label: 'Pending',
        onUpdate: null
    }
};

export const NoGo = {
    args: {
        label: 'No Go',
        onUpdate: null
    }
};

export const Review = {
    args: {
        label: 'Review',
        onUpdate: null
    }
};

export const Go = {
    args: {
        label: 'Go',
        onUpdate: null
    }
};

export const Done = {
    args: {
        label: 'Done',
        onUpdate: null
    }
};

export const NotFound = {
    args: {
        label: 'Not Found',
        onUpdate: null
    }
};

export const DraftBudget = {
    args: {
        label: 'Draft Budget',
        onUpdate: null
    }
};

export const Low = {
    args: {
        label: 'Low',
        onUpdate: null
    }
};

export const Medium = {
    args: {
        label: 'Medium',
        onUpdate: null
    }
};

export const High = {
    args: {
        label: 'High',
        onUpdate: null
    }
};

export const Critical = {
    args: {
        label: 'Critical',
        onUpdate: null
    }
};

export const UpdateModal = {
    args: {
        label: 'Completed',
        options: ['Not Started', 'In Progress', 'Completed'],
        onUpdate: () => {}
    }
}
