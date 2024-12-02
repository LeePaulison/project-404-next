"use client";

import { Switch } from "@radix-ui/react-switch";
import { Checkbox } from "@radix-ui/react-checkbox";

import { Breadcrumb } from "@/components/Breadcrumb";

export default function PreferencesPage() {
  return (
    <div className='p-6 pt-3 space-y-6'>
      <Breadcrumb current='Preferences' />
      <h1 className='text-2xl font-bold'>Preferences</h1>

      {/* Theme Section */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Theme</h2>
        <div className='flex items-center justify-between py-2'>
          <label htmlFor='theme' className='text-sm font-medium'>
            Dark Mode
          </label>
          <Switch id='theme' className='w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative'>
            <span className='absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-300 rounded-full transition-transform translate-x-0'></span>
          </Switch>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Notifications</h2>
        <div className='flex items-center justify-between py-2'>
          <label htmlFor='notifications' className='text-sm font-medium'>
            Enable Notifications
          </label>
          <Checkbox id='notifications' className='h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded'>
            <span className='block w-full h-full bg-white dark:bg-gray-300 rounded'></span>
          </Checkbox>
        </div>
      </section>

      {/* Language */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Language</h2>
        <div className='flex items-center py-2'>
          <label htmlFor='language' className='text-sm font-medium'>
            Preferred Language
          </label>
          <select id='language' className='ml-auto p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:text-white'>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
          </select>
        </div>
      </section>

      {/* Response Format */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Response Format</h2>
        <div className='flex items-center py-2'>
          <label htmlFor='response-format' className='text-sm font-medium'>
            Choose Format
          </label>
          <select
            id='response-format'
            className='ml-auto p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:text-white'
          >
            <option value='Concise'>Concise</option>
            <option value='Detailed'>Detailed</option>
          </select>
        </div>
      </section>

      {/* Auto-Save */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Auto-Save</h2>
        <div className='flex items-center justify-between py-2'>
          <label htmlFor='auto-save' className='text-sm font-medium'>
            Enable Auto-Save
          </label>
          <Checkbox id='auto-save' className='h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded'>
            <span className='block w-full h-full bg-white dark:bg-gray-300 rounded'></span>
          </Checkbox>
        </div>
      </section>

      {/* Data Retention */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Data Retention</h2>
        <div className='flex items-center py-2'>
          <label htmlFor='data-retention' className='text-sm font-medium'>
            Retention Period
          </label>
          <select
            id='data-retention'
            className='ml-auto p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:text-white'
          >
            <option value='7 days'>7 days</option>
            <option value='14 days'>14 days</option>
            <option value='30 days'>30 days</option>
          </select>
        </div>
      </section>

      {/* Default Prompt */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Default Prompt</h2>
        <div className='py-2'>
          <label htmlFor='default-prompt' className='text-sm font-medium'>
            Set Default Prompt
          </label>
          <textarea
            id='default-prompt'
            className='w-full p-2 mt-2 border rounded bg-gray-50 dark:bg-gray-800 dark:text-white'
            rows={4}
          />
        </div>
      </section>

      {/* Token Usage Display */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Token Usage</h2>
        <div className='flex items-center justify-between py-2'>
          <label htmlFor='token-usage' className='text-sm font-medium'>
            Display Token Usage
          </label>
          <Checkbox id='token-usage' className='h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded'>
            <span className='block w-full h-full bg-white dark:bg-gray-300 rounded'></span>
          </Checkbox>
        </div>
      </section>

      {/* Max Tokens */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Max Tokens</h2>
        <div className='py-2'>
          <label htmlFor='max-tokens' className='text-sm font-medium'>
            Maximum Tokens
          </label>
          <input
            id='max-tokens'
            type='number'
            min='0'
            className='w-full p-2 mt-2 border rounded bg-gray-50 dark:bg-gray-800 dark:text-white'
          />
        </div>
      </section>

      {/* Export to Notion */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Export</h2>
        <div className='flex items-center justify-between py-2'>
          <label htmlFor='export-to-notion' className='text-sm font-medium'>
            Export to Notion
          </label>
          <Checkbox id='export-to-notion' className='h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded'>
            <span className='block w-full h-full bg-white dark:bg-gray-300 rounded'></span>
          </Checkbox>
        </div>
      </section>

      {/* Save Button */}
      <div className='pt-6'>
        <button className='px-4 py-2 bg-primary text-white rounded bg-light-primary dark:bg-dark-primary transition'>
          Save Changes
        </button>
      </div>
    </div>
  );
}
