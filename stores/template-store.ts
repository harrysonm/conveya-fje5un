"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormField } from "@/types/form";

export interface Template {
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

interface TemplateState {
  templates: Template[];
  addTemplate: (template: Template) => void;
  updateTemplate: (id: string, template: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  getTemplate: (id: string) => Template | undefined;
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [
        {
          id: "feedback-1",
          name: "Customer Feedback",
          description: "Collect feedback about your product or service",
          categoryId: "feedback",
          fields: [
            {
              id: "rating",
              type: "star-rating",
              label: "Overall Rating",
              validation: { required: true }
            },
            {
              id: "feedback",
              type: "textarea",
              label: "Your Feedback",
              placeholder: "Tell us what you think...",
              validation: { required: true }
            }
          ]
        },
        {
          id: "feedback-2",
          name: "Employee Satisfaction",
          description: "Gather feedback from employees",
          categoryId: "feedback",
          fields: [
            {
              id: "satisfaction",
              type: "number-rating",
              label: "Job Satisfaction",
              validation: { required: true }
            },
            {
              id: "comments",
              type: "textarea",
              label: "Additional Comments",
              placeholder: "Share your thoughts..."
            }
          ]
        },
        {
          id: "registration-1",
          name: "Event Registration",
          description: "Register participants for your event",
          categoryId: "registration",
          fields: [
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
            }
          ]
        },
        {
          id: "contact-1",
          name: "Contact Form",
          description: "Basic contact form for your website",
          categoryId: "contact",
          fields: [
            {
              id: "name",
              type: "text",
              label: "Name",
              validation: { required: true }
            },
            {
              id: "email",
              type: "email",
              label: "Email",
              validation: { required: true }
            },
            {
              id: "message",
              type: "textarea",
              label: "Message",
              validation: { required: true }
            }
          ]
        }
      ],
      addTemplate: (template) => 
        set((state) => ({ templates: [...state.templates, template] })),
      updateTemplate: (id, updates) =>
        set((state) => ({
          templates: state.templates.map((template) =>
            template.id === id ? { ...template, ...updates } : template
          ),
        })),
      deleteTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((template) => template.id !== id),
        })),
      getTemplate: (id) => get().templates.find((template) => template.id === id)
    }),
    {
      name: 'template-storage',
      version: 1
    }
  )
);