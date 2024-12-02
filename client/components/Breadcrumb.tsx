import Link from "next/link";

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className='mb-4 text-sm' aria-label='breadcrumb'>
      <ol className='flex items-center space-x-2'>
        <li>
          <Link href='/' className='text-blue-600 hover:underline'>
            Home
          </Link>
        </li>
        <li>
          <span className='text-gray-500 dark:text-gray-400'>/</span>
        </li>
        <li>
          <span className='text-gray-900 dark:text-gray-100 font-medium'>{current}</span>
        </li>
      </ol>
    </nav>
  );
}
