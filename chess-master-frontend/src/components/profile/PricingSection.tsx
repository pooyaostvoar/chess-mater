import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DollarSign, Clock } from "lucide-react";

interface PricingSectionProps {
  pricing: number;
  onPricingChange: (value: number | null) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricing,
  onPricingChange,
}) => {
  const [inputValue, setInputValue] = useState(pricing?.toString() || "");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Session Pricing</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Set your hourly rate.
      </p>
      <div className="grid grid-cols-1 gap-4">
        <Card className="border-2 hover:border-primary transition-colors">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Hourly rate</Label>
            </div>
            <div className="relative flex">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                name="hourlyRate"
                value={inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputValue(value);

                  const numValue = value === "" ? null : parseFloat(value);
                  onPricingChange(numValue);
                }}
                placeholder="0.00"
                step="0.01"
                className="pl-7"
              />
            </div>
            {pricing && (
              <p className="text-xs text-muted-foreground mt-2">
                ${pricing} per hour
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
