"use client";

import React from "react";

export default function SystemStats() {
  // Example data - Replace with GraphQL queries later
  const stats = {
    tokensUsed: 5678,
    conversationsCount: 12,
    dataRetention: "14 days",
  };

  return (
    <section>
      <h2 className='text-lg font-semibold mb-4'>System Stats</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {/* Token Usage */}
        <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded shadow'>
          <h3 className='font-medium'>Tokens Used</h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>{stats.tokensUsed} tokens</p>
        </div>

        {/* Conversations Count */}
        <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded shadow'>
          <h3 className='font-medium'>Conversations</h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>{stats.conversationsCount} total</p>
        </div>

        {/* Data Retention */}
        <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded shadow'>
          <h3 className='font-medium'>Data Retention</h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>{stats.dataRetention}</p>
        </div>
      </div>
    </section>
  );
}
