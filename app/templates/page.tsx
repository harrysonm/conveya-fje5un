"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/layout/sidebar";
import { TemplatesHeader } from "@/components/templates/templates-header";
import { cn } from "@/lib/utils";
import { templateCategories, formTemplates } from "@/lib/constants/form-templates";
import { TemplateCard } from "@/components/templates/template-card";

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = formTemplates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || template.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <TemplatesHeader />
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Input
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-[240px] rounded-md"
              />
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  className={cn(
                    "px-4 py-2 text-sm rounded-md transition-colors",
                    selectedCategory === "all"
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Templates
                </button>
                {templateCategories.map((category) => (
                  <button
                    key={category.id}
                    className={cn(
                      "px-4 py-2 text-sm rounded-md transition-colors",
                      selectedCategory === category.id
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No templates found
                  </h3>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}