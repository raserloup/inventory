import { X } from "lucide-react";
import React from "react";

export default function FormHeader({ title, href }) {
  return (
    <div
      className="flex items-center justify-between
  bg-white py-3 px-16"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      {/*Here i used <a> tag instead of <Link>
       b/c i wanted the page to reload b/c after 
       inserting data page has to refresh for
        fetching the newly inserted data  */}
      <a href={href}>
        <X />
      </a>
    </div>
  );
}
