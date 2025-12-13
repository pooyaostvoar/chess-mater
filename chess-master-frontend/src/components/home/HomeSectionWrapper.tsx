import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface HomeSectionWrapperProps {
  title: string;
  description?: string;
  path: string;
  buttonText?: string;
  children: React.ReactNode;
}

export const HomeSectionWrapper: React.FC<HomeSectionWrapperProps> = ({
  title,
  description,
  path,
  buttonText = "View All",
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        <Button
          variant="outline"
          className="hidden md:flex"
          onClick={() => navigate(path)}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      {children}
      <div className="text-center mt-4">
        <Button
          variant="outline"
          size="lg"
          className="md:hidden w-full"
          onClick={() => navigate(path)}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
