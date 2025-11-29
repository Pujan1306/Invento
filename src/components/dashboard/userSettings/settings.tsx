"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Bell, User, Mail, Globe, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {

  const [formData, setFormData] = useState({
    username: "pujan_mestry",
    email: "pujanmestry@gmail.com",
    notification: true,
    language: "English",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success("Settings Updated Successfully");
    console.log("Updated:", formData);
  };

  const settings = [
    {
      key: "username",
      label: "Username",
      type: "input",
      icon: <User className="w-5 h-5 text-primary" />,
    },
    {
      key: "email",
      label: "Email",
      type: "input",
      icon: <Mail className="w-5 h-5 text-primary" />,
    },
    {
      key: "notification",
      label: "Notification",
      type: "switch",
      icon: <Bell className="w-5 h-5 text-primary" />,
    },
    {
      key: "language",
      label: "Language",
      type: "input",
      icon: <Globe className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <div className="w-full max-w-3xl p-6 md:p-12">

      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">User Settings</CardTitle>
        </CardHeader>

        <CardContent className="divide-y divide-border p-0">
          {settings.map(({ key, label, type, icon }) => (
            <div key={key} className="flex flex-col md:flex-row md:items-center px-6 py-6 gap-4 hover:bg-muted/5 transition-colors">
              
              <div className="w-full md:w-1/3 flex items-center gap-3">
                {icon}
                <span className="font-medium text-sm">{label}</span>
              </div>

              <div className="w-full md:w-2/3">
                {type === "input" && (
                  <Input
                  className="border border-gray-300 dark:border-gray-700"
                    value={(formData as any)[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}

                {type === "switch" && (
                  <Switch
                    checked={formData.notification}
                    onCheckedChange={(c) => handleChange(key, c)}
                  />
                )}
              </div>

            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex p-6 justify-end">
      <Button className="flex items-center gap-2" onClick={handleSave}>
            <Check className="w-4 h-4" />
            Save Changes
          </Button>
      </div>
    </div>
  );
}
