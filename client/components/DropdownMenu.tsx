"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { GearIcon, DashboardIcon } from "@radix-ui/react-icons";

export default function ProfileDropdown() {
  console.log("ProfileDropdown");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className='p-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600'>
          Profile
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='bg-white dark:bg-gray-800 shadow-md rounded p-2 w-48'
          sideOffset={5}
          align='end'
        >
          <DropdownMenu.Item asChild>
            <Link
              href='/dashboard'
              className='flex items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <DashboardIcon className='mr-2' />
              Dashboard
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link
              href='/preferences'
              className='flex items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <GearIcon className='mr-2' />
              Preferences
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className='my-2 h-px bg-gray-200 dark:bg-gray-700' />

          <DropdownMenu.Item asChild>
            <button className='w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'>
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
