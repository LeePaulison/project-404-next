"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function TestDropdown() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className='bg-blue-500 text-white p-2 rounded'>Profile</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className='bg-white shadow-md rounded p-2 w-48'>
          <DropdownMenu.Item className='px-4 py-2 hover:bg-gray-100 rounded'>Dashboard</DropdownMenu.Item>
          <DropdownMenu.Item className='px-4 py-2 hover:bg-gray-100 rounded'>Preferences</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
