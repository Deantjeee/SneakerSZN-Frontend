"use client";

import { Label, TextInput } from "flowbite-react";

export function SneakerFormComponent() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label className="w-full" htmlFor="small" value="Name" />
        </div>
        <TextInput id="small" type="text" sizing="sm" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small" value="Size" />
        </div>
        <TextInput id="small" type="text" sizing="sm" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small" value="Price" />
        </div>
        <TextInput id="small" type="number" sizing="sm" />
      </div>
    </div>
  );
}