"use client";

// ... rest of imports

export function SaveTemplateModal({ 
  open, 
  onOpenChange,
  fields,
  themeSettings
}: SaveTemplateModalProps) {
  // ... rest of component code

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !categoryId) return;

    const template = {
      id: nanoid(),
      name: name.trim(),
      description: description.trim(),
      categoryId,
      fields,
      themeSettings: {
        coverType: themeSettings?.coverType || 'none',
        showLogo: themeSettings?.showLogo ?? true,
        coverColor: themeSettings?.coverColor || "#f3f4f6",
        coverImage: themeSettings?.coverImage || "",
        logo: themeSettings?.logo || ""
      }
    };

    addTemplate(template);
    onOpenChange(false);
    setName("");
    setDescription("");
    setCategoryId("");

    toast({ description: "Template saved" });
  };

  // ... rest of component code
}