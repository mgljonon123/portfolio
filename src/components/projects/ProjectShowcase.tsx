"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectShowCcase.module.css";

interface Tag {
  id: string;
  name: string;
}

interface Blog {
  id: string;
  title: string;
  description: string;
  imageBlog: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
}

const NavigationControl = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "back" | "next";
  onClick: () => void;
  disabled: boolean;
}) => {
  const isBack = direction === "back";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-full w-[243px] max-md:w-[180px] max-sm:hidden flex justify-center items-center ${
        disabled
          ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
          : "bg-neutral-300 hover:bg-neutral-400"
      } text-black text-6xl font-light transition-all`}
      aria-label={isBack ? "Back" : "Next"}
    >
      {isBack ? "Back" : "Next"}
    </button>
  );
};

const TagBadge = ({ text }: { text: string }) => (
  <span className="px-1.5 py-0 text-xs font-light leading-5 text-white bg-orange-600 rounded h-[18px] tag-badge">
    {text}
  </span>
);

const ProjectCard = ({
  title,
  description,
  tags,
  image,
}: {
  title: string;
  description: string;
  tags: string[];
  image: string | null;
}) => {
  return (
    <article className="flex bg-zinc-300 h-[386px] w-[806px] max-md:w-[650px] max-sm:flex-col max-sm:w-full max-sm:h-auto">
      {image ? (
        <div className="relative h-full w-[357px] max-sm:w-full max-sm:h-[250px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 357px"
          />
        </div>
      ) : (
        <figure
          className="h-full bg-stone-500 w-[357px] max-sm:w-full max-sm:h-[250px]"
          aria-label="Project image"
        />
      )}
      <div className="flex flex-col flex-1 items-center px-6 py-12 max-sm:p-6">
        <h2 className="mb-3 text-3xl font-bold text-black text-center">
          {title}
        </h2>
        <p className="mb-4 text-lg font-medium text-center text-black">
          {description}
        </p>
        <div className="flex gap-2 max-sm:flex-wrap max-sm:justify-center">
          {tags.map((tag, i) => (
            <TagBadge key={i} text={tag} />
          ))}
        </div>
      </div>
    </article>
  );
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as const,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    position: "absolute" as const,
  }),
};

const ProjectShowcase: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/blog?public=true");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data: Blog[] = await response.json();
        setBlogs(data);
      } catch (err) {
        const typedError = err as Error;
        console.error("Error fetching blogs:", typedError);
        setError(typedError.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < blogs.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || blogs.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold mb-2">
            {error ? "Error" : "No Projects Available"}
          </h2>
          <p>{error || "Check back later for project updates!"}</p>
        </div>
      </div>
    );
  }

  const currentProject = blogs[currentIndex];

  return (
    <section
      className={`${styles.container} h-screen flex relative justify-between items-center py-0 mx-auto w-full max-w-none max-md:px-2.5 max-md:py-0 max-sm:max-w-screen-sm overflow-hidden`}
    >
      <NavigationControl
        direction="back"
        onClick={() => paginate(-1)}
        disabled={currentIndex === 0}
      />

      <div className="relative flex justify-center items-center w-[806px] max-md:w-[650px] max-sm:w-full h-[100vh]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <ProjectCard
              title={currentProject.title}
              description={currentProject.description}
              tags={currentProject.tags?.map((tag) => tag.name) || []}
              image={currentProject.imageBlog}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <NavigationControl
        direction="next"
        onClick={() => paginate(1)}
        disabled={currentIndex === blogs.length - 1}
      />
    </section>
  );
};

export default ProjectShowcase;
