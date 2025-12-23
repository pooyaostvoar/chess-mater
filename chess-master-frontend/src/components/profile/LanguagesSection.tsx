import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface LanguagesSectionProps {
  name: string;
  languages: string[];
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  name,
  languages,
  onChange,
}) => {
  const [input, setInput] = useState("");

  const emitChange = (value: string[]) => {
    onChange({
      target: { name, value },
    } as any);
  };

  const addLanguage = (value: string) => {
    const lang = value.trim();
    if (!lang || languages.includes(lang)) return;

    emitChange([...languages, lang]);
    setInput("");
  };

  const removeLanguage = (lang: string) => {
    emitChange(languages.filter((l) => l !== lang));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addLanguage(input);
    }

    // Backspace to remove last tag when input is empty
    if (e.key === "Backspace" && !input && languages.length) {
      removeLanguage(languages[languages.length - 1]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Languages</h3>

      <div className="space-y-2">
        <Label>Languages you speak</Label>

        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          {languages.map((lang) => (
            <span
              key={lang}
              className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-sm whitespace-nowrap"
            >
              {lang}
              <button
                type="button"
                onClick={() => removeLanguage(lang)}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              languages.length === 0 ? "Type a language and press comma" : ""
            }
            className="flex-1 border-none p-0 focus-visible:ring-0 min-w-[120px]"
          />
        </div>
      </div>
    </div>
  );
};
