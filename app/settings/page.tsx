"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { SettingsHeader } from "@/components/settings/settings-header";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <SettingsHeader />
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-2xl">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Account Settings</h2>
                <p className="text-sm text-gray-500">
                  Manage your account settings and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}