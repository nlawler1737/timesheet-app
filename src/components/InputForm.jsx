import React from "react";
import { Card } from "@nextui-org/react";

export default function InputForm({ greeting, message, title, content }) {
  const twoTitles = greeting && title;
  return (
    <div className="w-full flex flex-col items-center h-full justify-center">
      <h1 className="text-4xl mb-5 text-center sm:hidden">
        {twoTitles ? greeting : greeting || title}
      </h1>
      <div className="w-4/5 max-w-[800px] relative">
        <Card className="input-form p-8 sm:flex flex flex-row gap-10 items-center">
          <div className="flex-1 h-min hidden sm:block text-center">
            <h1 className="text-4xl mb-5">{greeting || title}</h1>
            {message && <div>{message}</div>}
          </div>
          <div className="flex-1">
            {greeting && title && (
              <div className="w-full text-right text-3xl mb-6">
                {title || greeting}
              </div>
            )}
            <div className="flex flex-col gap-4">
              {message && (
                <div className="text-center sm:hidden">{message}</div>
              )}
              {content}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
