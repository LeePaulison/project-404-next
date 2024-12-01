export default function PreferencesPage() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Preferences</h1>
      <form>
        <div className='mb-4'>
          <label className='block mb-2 font-semibold' htmlFor='theme'>
            Theme:
          </label>
          <select id='theme' className='p-2 border rounded'>
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block mb-2 font-semibold' htmlFor='notifications'>
            Notifications:
          </label>
          <input id='notifications' type='checkbox' className='mr-2' />
          Enable notifications
        </div>
        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
          Save Preferences
        </button>
      </form>
    </div>
  );
}
