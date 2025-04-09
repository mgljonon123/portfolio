"use client";
import * as React from "react";

const NavigationControl = ({ direction }: { direction: "back" | "next" }) => {
  const isBack = direction === "back";

  return (
    <div className="h-[569px] w-[243px] max-md:w-[180px] max-sm:hidden">
      <div>
        {isBack ? (
          <svg
            width="243"
            height="569"
            viewBox="0 0 243 569"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="back-nav"
          >
            <rect width="243" height="569" fill="#D9D9D9"></rect>
            <path
              d="M111.707 261.707C112.098 261.317 112.098 260.683 111.707 260.293L105.343 253.929C104.953 253.538 104.319 253.538 103.929 253.929C103.538 254.319 103.538 254.953 103.929 255.343L109.586 261L103.929 266.657C103.538 267.047 103.538 267.681 103.929 268.071C104.319 268.462 104.953 268.462 105.343 268.071L111.707 261.707ZM25 262H111V260H25V262Z"
              fill="black"
            ></path>
            <text
              fill="black"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Clash Display"
              fontSize="128"
              fontWeight="300"
              letterSpacing="0px"
            >
              <tspan x="129" y="134.219">
                B
              </tspan>
              <tspan x="129" y="267.219">
                a
              </tspan>
              <tspan x="129" y="400.219">
                c
              </tspan>
              <tspan x="129" y="533.219">
                k
              </tspan>
            </text>
          </svg>
        ) : (
          <svg
            width="243"
            height="569"
            viewBox="0 0 243 569"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="next-nav"
          >
            <rect width="243" height="569" fill="#D9D9D9"></rect>
            <path
              d="M111.707 255.707C112.098 255.317 112.098dot 254.683 111.707 254.293L105.343 247.929C104.953 247.538 104.319 247.538 103.929 247.929C103.538 248.319 103.538 248.953 103.929 249.343L109.586 255L103.929 260.657C103.538 261.047 103.538 261.681 103.929 262.071C104.319 262.462 104.953 262.462 105.343 262.071L111.707 255.707ZM25 256H111V254H25V256Z"
              fill="black"
            ></path>
            <text
              fill="black"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Clash Display"
              fontSize="128"
              fontWeight="300"
              letterSpacing="0px"
            >
              <tspan x="129" y="128.219">
                N
              </tspan>
              <tspan x="129" y="261.219">
                e
              </tspan>
              <tspan x="129" y="394.219">
                x
              </tspan>
              <tspan x="129" y="527.219">
                t
              </tspan>
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};

const TagBadge = ({ text }: { text: string }) => {
  return (
    <span className="px-1.5 py-0 text-xs font-light leading-5 text-white bg-orange-600 rounded h-[18px] tag-badge">
      {text}
    </span>
  );
};

const ProjectCard = () => {
  return (
    <article className="flex bg-zinc-300 h-[386px] w-[806px] max-md:w-[650px] max-sm:flex-col max-sm:w-full max-sm:h-auto">
      <figure
        className="h-full bg-stone-500 w-[357px] max-sm:w-full max-sm:h-[250px]"
        aria-label="Project image"
      />
      <div className="flex flex-col flex-1 items-center px-6 py-12 max-sm:p-6">
        <h2 className="mb-3 text-3xl font-bold text-black">Title</h2>
        <p className="mb-4 text-lg font-medium text-center text-black">
          "Driven by curiosity and a love for clean design, I build digital
          experiences that blend functionality with"
        </p>
        <div className="flex gap-2 max-sm:flex-wrap max-sm:justify-center">
          <TagBadge text="T" />
          <TagBadge text="TagBadge" />
          <TagBadge text="TagBadge" />
          <TagBadge text="TagBadge" />
        </div>
      </div>
    </article>
  );
};

function ProjectShowcase() {
  return (
    <>
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <section className="mt-[20] flex relative justify-between items-center py-0 mx-auto w-full max-w-none bg-zinc-800 h-[786px] max-md:px-2.5 max-md:py-0 max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <NavigationControl direction="back" />
        <ProjectCard />
        <NavigationControl direction="next" />
      </section>

      <style jsx global>{`
        html,
        body,
        h2,
        p {
          font-family: "Clash Display", sans-serif;
        }
        .tag-badge {
          font-family: "Roboto", sans-serif;
        }
      `}</style>
    </>
  );
}

export default ProjectShowcase;
