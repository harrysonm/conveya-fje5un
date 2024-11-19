import { Type, Mail, Phone, Calendar, Clock, FileText, Upload, Star, Hash, List, ListChecks, Heading, AlignLeft, ChevronDown, Link, SplitSquareHorizontal, CheckSquare } from "lucide-react";

export const formElements = [
  {
    category: "Content",
    items: [
      {
        type: "heading",
        label: "Heading",
        description: "Section title or subtitle",
        icon: Heading
      },
      {
        type: "paragraph",
        label: "Paragraph",
        description: "Text block with formatting",
        icon: AlignLeft
      },
      {
        type: "page-break",
        label: "Page Break",
        description: "Split form into multiple steps",
        icon: SplitSquareHorizontal
      }
    ]
  },
  {
    category: "Basic Fields",
    items: [
      {
        type: "text",
        label: "Text Field",
        description: "Single line text input",
        icon: Type
      },
      {
        type: "email",
        label: "Email Field",
        description: "Email address input",
        icon: Mail
      },
      {
        type: "phone",
        label: "Phone Field",
        description: "Phone number input",
        icon: Phone
      },
      {
        type: "url",
        label: "URL Field",
        description: "Web address input",
        icon: Link
      },
      {
        type: "checkbox",
        label: "Checkbox",
        description: "Single checkbox input",
        icon: CheckSquare
      }
    ]
  },
  {
    category: "Date & Time",
    items: [
      {
        type: "date",
        label: "Date Field",
        description: "Date picker input",
        icon: Calendar
      },
      {
        type: "time",
        label: "Time Field",
        description: "Time picker input",
        icon: Clock
      }
    ]
  },
  {
    category: "Advanced Fields",
    items: [
      {
        type: "textarea",
        label: "Text Area",
        description: "Multi-line text input",
        icon: FileText
      },
      {
        type: "file",
        label: "File Upload",
        description: "File attachment field",
        icon: Upload
      },
      {
        type: "star-rating",
        label: "Star Rating",
        description: "5-star rating field",
        icon: Star
      },
      {
        type: "number-rating",
        label: "Number Scale",
        description: "1-10 rating scale",
        icon: Hash
      }
    ]
  },
  {
    category: "Choice Fields",
    items: [
      {
        type: "select",
        label: "Single Select",
        description: "Choose one option from a list",
        icon: List,
        defaultOptions: [
          { value: "option-1", label: "Option 1" },
          { value: "option-2", label: "Option 2" }
        ]
      },
      {
        type: "multi-select",
        label: "Multi Select",
        description: "Choose multiple options from a list",
        icon: ListChecks,
        defaultOptions: [
          { value: "option-1", label: "Option 1" },
          { value: "option-2", label: "Option 2" }
        ]
      },
      {
        type: "dropdown",
        label: "Dropdown",
        description: "Single selection dropdown menu",
        icon: ChevronDown,
        defaultOptions: [
          { value: "option-1", label: "Option 1" },
          { value: "option-2", label: "Option 2" }
        ]
      }
    ]
  }
];