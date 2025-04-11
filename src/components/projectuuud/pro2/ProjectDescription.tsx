import React from "react";

interface ProjectDescriptionProps {
  description: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  description,
}) => {
  return (
    <div
      className="p-8 text-lg leading-relaxed text-indigo-200 rounded-2xl backdrop-blur-[[40px]] bg-slate-900 bg-opacity-80 max-md:p-6 max-sm:p-5"
      aria-label="Project description"
    >
      {description}
    </div>
  );
};

export default ProjectDescription;
