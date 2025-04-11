"use client";
import * as React from "react";
import ProjectDescription from "./ProjectDescription";
import IconButton from "./IconButton";

interface FeaturedProjectProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  title = "Example Project",
  subtitle = "Featured Project",
  description = "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
  imageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/b4055c3dc242fcdb5031dd91766c1453191f7627",
  imageAlt = "Project Screenshot",
}) => {
  return (
    <section
      className="flex justify-center items-center p-10 w-full bg-slate-900 min-h-[screen] max-md:p-8 max-sm:p-6"
      aria-labelledby="featured-project-title"
    >
      <div className="flex flex-col gap-10 w-full max-w-[1170px] max-md:gap-8 max-sm:gap-6">
        <article className="flex flex-row gap-10 items-start max-md:flex-col max-md:gap-8 max-sm:gap-6">
          <div className="flex flex-col flex-1 gap-6 max-md:gap-5 max-sm:gap-4">
            <header className="flex flex-col gap-4">
              <p className="text-base font-bold tracking-wide text-violet-500">
                {subtitle}
              </p>
              <h2
                id="featured-project-title"
                className="text-4xl font-bold tracking-wider text-indigo-200"
              >
                {title}
              </h2>
            </header>

            <ProjectDescription description={description} />

            <div className="flex flex-row gap-4 items-center">
              <IconButton
                ariaLabel="Project action 1"
                svgContent={`<svg id="16:193" layer-name="icon-park-solid:click" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[31px] h-[31px]"> <mask id="mask0_16_193" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30"> <path d="M15.5 2.58331V7.74998" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2083 14.2083L27.125 16.7916L23.25 19.375L27.125 23.25L23.25 27.125L19.375 23.25L16.7917 27.125L14.2083 14.2083Z" fill="white" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M24.6334 6.36658L20.9799 10.0201M6.36663 24.6333L10.0201 20.9798M2.58334 15.5H7.75001M6.36663 6.36658L10.0201 10.0201" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </mask> <g mask="url(#mask0_16_193)"> <path d="M0 0H31V31H0V0Z" fill="white"></path> </g> </svg>`}
              />
              <IconButton
                ariaLabel="Project action 2"
                svgContent={`<svg id="16:179" layer-name="icon-park-solid:click" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[31px] h-[31px]"> <mask id="mask0_16_179" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30"> <path d="M15.5 2.58331V7.74998" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2083 14.2083L27.125 16.7916L23.25 19.375L27.125 23.25L23.25 27.125L19.375 23.25L16.7917 27.125L14.2083 14.2083Z" fill="white" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M24.6334 6.36658L20.9799 10.0201M6.36663 24.6333L10.0201 20.9798M2.58334 15.5H7.75001M6.36663 6.36658L10.0201 10.0201" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </mask> <g mask="url(#mask0_16_179)"> <path d="M0 0H31V31H0V0Z" fill="white"></path> </g> </svg>`}
              />
              <IconButton
                ariaLabel="Project action 3"
                svgContent={`<svg id="16:186" layer-name="icon-park-solid:click" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[31px] h-[31px]"> <mask id="mask0_16_186" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30"> <path d="M15.5 2.58331V7.74998" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2083 14.2083L27.125 16.7916L23.25 19.375L27.125 23.25L23.25 27.125L19.375 23.25L16.7917 27.125L14.2083 14.2083Z" fill="white" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M24.6334 6.36658L20.9799 10.0201M6.36663 24.6333L10.0201 20.9798M2.58334 15.5H7.75001M6.36663 6.36658L10.0201 10.0201" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </mask> <g mask="url(#mask0_16_186)"> <path d="M0 0H31V31H0V0Z" fill="white"></path> </g> </svg>`}
              />
            </div>
          </div>

          <figure className="flex-1">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
            />
          </figure>
        </article>
      </div>
    </section>
  );
};

export default FeaturedProject;
