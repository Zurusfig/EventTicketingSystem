"use client";

import React from "react";

type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg-color gap-8">
      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-text-color">
        THE PERFORMERS
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-md md:max-w-lg space-y-4 p-6 rounded-xl bg-bg-alternate-color shadow text-text-alternate-color py-6 md:px-8 lg:px-10">
          <h1 className="py-4 text-2xl md:text-3xl font-black text-center">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </main>
  );
}