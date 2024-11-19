import { FormField } from "@/types/form";

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  fields: FormField[];
  themeSettings?: {
    coverType: 'none' | 'color' | 'image';
    coverColor?: string;
    coverImage?: string;
    showLogo: boolean;
    logo?: string;
  };
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
}

export const templateCategories: TemplateCategory[] = [
  {
    id: "business",
    name: "Business",
    description: "Professional forms for business operations"
  },
  {
    id: "education",
    name: "Education",
    description: "Forms for educational institutions"
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical and healthcare-related forms"
  },
  {
    id: "events",
    name: "Events",
    description: "Forms for event planning and management"
  }
];

export const formTemplates: FormTemplate[] = [
  // Business Templates
  {
    id: "contact-form",
    name: "Business Contact Form",
    description: "Professional contact form for business websites",
    categoryId: "business",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        validation: { required: true }
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email",
        validation: { required: true }
      },
      {
        id: "company",
        type: "text",
        label: "Company Name",
        placeholder: "Enter your company name"
      },
      {
        id: "subject",
        type: "text",
        label: "Subject",
        placeholder: "What is your inquiry about?",
        validation: { required: true }
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        placeholder: "How can we help you?",
        validation: { required: true, minLength: 10 }
      }
    ],
    themeSettings: {
      coverType: 'color',
      coverColor: '#f8fafc',
      showLogo: true
    }
  },
  {
    id: "job-application",
    name: "Job Application Form",
    description: "Standard job application form for hiring",
    categoryId: "business",
    fields: [
      {
        id: "personal-info",
        type: "heading",
        label: "Personal Information",
        content: "Please provide your personal details"
      },
      {
        id: "name",
        type: "text",
        label: "Full Name",
        validation: { required: true }
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        validation: { required: true }
      },
      {
        id: "phone",
        type: "phone",
        label: "Phone Number",
        validation: { required: true }
      },
      {
        id: "experience",
        type: "heading",
        label: "Experience",
        content: "Tell us about your work experience"
      },
      {
        id: "current-company",
        type: "text",
        label: "Current/Last Company"
      },
      {
        id: "position",
        type: "text",
        label: "Position",
        validation: { required: true }
      },
      {
        id: "experience-years",
        type: "select",
        label: "Years of Experience",
        options: [
          { label: "0-1 years", value: "0-1" },
          { label: "1-3 years", value: "1-3" },
          { label: "3-5 years", value: "3-5" },
          { label: "5+ years", value: "5+" }
        ],
        validation: { required: true }
      },
      {
        id: "resume",
        type: "file",
        label: "Resume/CV",
        validation: { required: true },
        settings: {
          acceptedFileTypes: [".pdf", ".doc", ".docx"],
          maxFileSize: 5
        }
      }
    ],
    themeSettings: {
      coverType: 'color',
      coverColor: '#f1f5f9',
      showLogo: true
    }
  },

  // Education Templates
  {
    id: "student-registration",
    name: "Student Registration Form",
    description: "Complete student registration form",
    categoryId: "education",
    fields: [
      {
        id: "student-info",
        type: "heading",
        label: "Student Information",
        content: "Enter student's personal details"
      },
      {
        id: "name",
        type: "text",
        label: "Student's Full Name",
        validation: { required: true }
      },
      {
        id: "dob",
        type: "date",
        label: "Date of Birth",
        validation: { required: true }
      },
      {
        id: "gender",
        type: "select",
        label: "Gender",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" }
        ],
        validation: { required: true }
      },
      {
        id: "parent-info",
        type: "heading",
        label: "Parent/Guardian Information",
        content: "Enter parent or guardian details"
      },
      {
        id: "parent-name",
        type: "text",
        label: "Parent/Guardian Name",
        validation: { required: true }
      },
      {
        id: "parent-email",
        type: "email",
        label: "Parent/Guardian Email",
        validation: { required: true }
      },
      {
        id: "parent-phone",
        type: "phone",
        label: "Parent/Guardian Phone",
        validation: { required: true }
      }
    ],
    themeSettings: {
      coverType: 'color',
      coverColor: '#f0fdf4',
      showLogo: true
    }
  },
  {
    id: "course-feedback",
    name: "Course Feedback Form",
    description: "Gather student feedback about courses",
    categoryId: "education",
    fields: [
      {
        id: "course-name",
        type: "text",
        label: "Course Name",
        validation: { required: true }
      },
      {
        id: "instructor",
        type: "text",
        label: "Instructor Name",
        validation: { required: true }
      },
      {
        id: "semester",
        type: "select",
        label: "Semester",
        options: [
          { label: "Fall 2023", value: "fall-2023" },
          { label: "Spring 2024", value: "spring-2024" }
        ],
        validation: { required: true }
      },
      {
        id: "content-rating",
        type: "star-rating",
        label: "Course Content Quality",
        settings: { maxStars: 5 },
        validation: { required: true }
      },
      {
        id: "instructor-rating",
        type: "star-rating",
        label: "Instructor Effectiveness",
        settings: { maxStars: 5 },
        validation: { required: true }
      },
      {
        id: "feedback",
        type: "textarea",
        label: "Additional Comments",
        placeholder: "Share your thoughts about the course..."
      }
    ],
    themeSettings: {
      coverType: 'color',
      coverColor: '#f0f9ff',
      showLogo: true
    }
  },

  // Healthcare Templates
  {
    id: "patient-intake",
    name: "Patient Intake Form",
    description: "New patient registration and medical history",
    categoryId: "healthcare",
    fields: [
      {
        id: "personal-info",
        type: "heading",
        label: "Personal Information",
        content: "Please provide your personal details"
      },
      {
        id: "name",
        type: "text",
        label: "Full Name",
        validation: { required: true }
      },
      {
        id: "dob",
        type: "date",
        label: "Date of Birth",
        validation: { required: true }
      },
      {
        id: "gender",
        type: "select",
        label: "Gender",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" }
        ],
        validation: { required: true }
      },
      {
        id: "medical-history",
        type: "heading",
        label: "Medical History",
        content: "Please provide your medical history"
      },
      {
        id: "conditions",
        type: "multi-select",
        label: "Existing Conditions",
        options: [
          { label: "Diabetes", value: "diabetes" },
          { label: "Hypertension", value: "hypertension" },
          { label: "Heart Disease", value: "heart-disease" },
          { label: "Asthma", value: "asthma" },
          { label: "None", value: "none" }
        ],
        validation: { required: true }
      },
      {
        id: "medications",
        type: "textarea",
        label: "Current Medications",
        placeholder: "List any medications you are currently taking"
      },
      {
        id: "allergies",
        type: "textarea",
        label: "Allergies",
        placeholder: "List any known allergies"
      }
    ],
    themeSettings: {
      coverType: 'color',
      coverColor: '#fdf2f8',
      showLogo: true
    }
  },
  {
    id: "appointment-request",
    name: "Appointment Request Form",
    description: "Medical appointment scheduling form",
    categoryId: "healthcare",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Patient Name",
        validation: { required: true }
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        validation: { required: true }
      },
      {
        id: "phone",
        type: "phone",
        label: "Phone Number",
        validation: { required: true }
      },
      {
        id: "appointment-type",
        type: "select",
        label: "Appointment Type",
        options: [
          { label: "New Patient", value: "new" },
          { label: "Follow-up", value: "follow-up" },
          { label: "Consultation", value: "consultation" }
        ],
        validation: { required: true }
      },
      {
        id: "preferred-date",
        type: "date",
        label: "Preferred Date",
        validation: { required: true }
      },
      {
        id: "preferred-time",
        type: "time",
        label: "Preferred Time",
        validation: { required: true }
      },
      {
        id: "reason",
        type: "textarea",
        label: "Reason for Visit",
        validation: { required: true }
      }
    ],
    themeSettings: {
      coverType: 'color',
      coverColor: '#fdf4ff',
      showLogo: true
    }
  },

  // Event Templates
  {
    id: "event-registration",
    name: "Event Registration Form",
    description: "Comprehensive event registration form",
    categoryId: "events",
    fields: [
      {
        id: "personal-info",
        type: "heading",
        label: "Attendee Information",
        content: "Please provide your details"
      },
      {
        id: "name",
        type: "text",
        label: "Full Name",
        validation: { required: true }
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        validation: { required: true }
      },
      {
        id: "phone",
        type: "phone",
        label: "Phone Number",
        validation: { required: true }
      },
      {
        id: "ticket-type",
        type: "select",
        label: "Ticket Type",
        options: [
          { label: "General Admission", value: "general" },
          { label: "VIP", value: "vip" },
          { label: "Student", value: "student" }
        ],
        validation: { required: true }
      },
      {
        id: "sessions",
        type: "multi-select",
        label: "Select Sessions",
        options: [
          { label: "Morning Session", value: "morning" },
          { label: "Afternoon Session", value: "afternoon" },
          { label: "Evening Session", value: "evening" }
        ],
        validation: { required: true }
      },
      {
        id: "dietary",
        type: "multi-select",
        label: "Dietary Requirements",
        options: [
          { label: "Vegetarian", value: "vegetarian" },
          { label: "Vegan", value: "vegan" },
          { label: "Gluten-free", value: "gluten-free" },
          { label: "None", value: "none" }
        ]
      }
    ],
    themeSettings: {
      coverType: 'color',
      coverColor: '#f5f3ff',
      showLogo: true
    }
  },
  {
    id: "event-feedback",
    name: "Event Feedback Form",
    description: "Post-event feedback collection form",
    categoryId: "events",
    fields: [
      {
        id: "overall-rating",
        type: "star-rating",
        label: "Overall Event Rating",
        settings: { maxStars: 5 },
        validation: { required: true }
      },
      {
        id: "content-rating",
        type: "star-rating",
        label: "Content Quality",
        settings: { maxStars: 5 },
        validation: { required: true }
      },
      {
        id: "organization-rating",
        type: "star-rating",
        label: "Event Organization",
        settings: { maxStars: 5 },
        validation: { required: true }
      },
      {
        id: "venue-rating",
        type: "star-rating",
        label: "Venue Rating",
        settings: { maxStars: 5 },
        validation: { required: true }
      },
      {
        id: "highlights",
        type: "textarea",
        label: "Event Highlights",
        placeholder: "What did you enjoy most about the event?"
      },
      {
        id: "improvements",
        type: "textarea",
        label: "Suggested Improvements",
        placeholder: "How can we improve future events?"
      },
      {
        id: "recommend",
        type: "number-rating",
        label: "How likely are you to recommend our events?",
        settings: { maxRating: 10, showValues: true },
        validation: { required: true }
      }
    ],
    themeSettings: {
      coverType: 'color',
      coverColor: '#faf5ff',
      showLogo: true
    }
  }
];