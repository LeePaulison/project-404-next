"use client";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import SystemStats from "@/components/SystemStats";
import QuickActions from "@/components/QuickActions";

export default function DashboardPage() {
  // Example data - Replace with GraphQL queries later
  const recentConversations = [
    { id: 1, title: "Chat about React", messages: 10, lastUpdated: "2024-11-30" },
    { id: 2, title: "Project-404 Ideas", messages: 5, lastUpdated: "2024-11-29" },
  ];

  return (
    <div className='p-6 pt-3 space-y-6'>
      <Breadcrumb current='Dashboard' />
      {/* Welcome Section */}
      <section className='mb-6'>
        <h1 className='text-2xl font-bold'>Welcome Back, Developer!</h1>
        <p className='text-gray-500 dark:text-gray-400'>Last login: 2024-11-30</p>
        <p className='text-gray-500 dark:text-gray-400'>Account Type: Google</p>
      </section>
      {/* System Stats */}
      <SystemStats />
      {/* Activity Overview */}
      {/* Quick Actions */}
      <QuickActions />
      {/* Recent Conversations */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>Recent Conversations</h2>
        <ul className='space-y-4'>
          {recentConversations.map((conversation) => (
            <li key={conversation.id} className='p-4 bg-gray-100 dark:bg-gray-800 rounded shadow'>
              <h3 className='font-medium'>{conversation.title}</h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {conversation.messages} messages · Last updated: {conversation.lastUpdated}
              </p>
              <Link
                href={`/conversations/${conversation.id}`}
                className='text-blue-500 hover:underline mt-2 inline-block'
              >
                View Conversation
              </Link>
            </li>
          ))}
        </ul>
        <Link href='/conversations' className='mt-4 block text-blue-500 hover:underline text-sm font-medium'>
          View All Conversations
        </Link>
      </section>
    </div>
  );
}
