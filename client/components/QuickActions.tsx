"use client";

import Link from "next/link";

export default function QuickActions() {
  return (
    <section>
      <h2 className='text-lg font-semibold mb-4'>Quick Actions</h2>
      <div className='flex flex-wrap gap-4'>
        {/* New Conversation */}
        <Link href='/conversations/new'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
            New Conversation
          </button>
        </Link>

        {/* View All Conversations */}
        <Link href='/conversations'>
          <button className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition'>
            View All Conversations
          </button>
        </Link>

        {/* Preferences */}
        <Link href='/preferences'>
          <button className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition'>
            Preferences
          </button>
        </Link>
      </div>
    </section>
  );
}
