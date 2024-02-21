import React from "react";

export default function SectionTitle({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <div className="flex flex-col items-center justify-between lg:flex-row">
      <div className="lg:w-1/2">
        <h2 className="mb-4 break-words text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:mb-0 lg:mr-8 lg:text-left">
          {title}
        </h2>
      </div>
      <div className="lg:w-1/2">
        <p className="break-words text-center text-xl font-light text-gray-500 dark:text-gray-400 lg:text-right">
          {description}
        </p>
      </div>
    </div>
  );
}
