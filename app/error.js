/* eslint-disable react/no-unescaped-entities */
'use client';
/**
 * Error component displayed when an error occurs during data fetching or other operations.
 *
 * @component
 * @example
 * const error = new Error('Network error');
 * const reset = () => { /* handle error reset *\/ };
 * return <Error error={error} reset={reset} />;
 *
 * @param {Object} props - The props for the component.
 * @param {Error} props.error - The error object containing details about the error.
 * @param {Function} props.reset - Function to call to reset the error state or retry the operation.
 * 
 * @returns {JSX.Element} The rendered Error component.
 */
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
      <p className="text-gray-600 mb-4">We couldn't load the products. Please try again later.</p>
      <button 
        onClick={() => reset()} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
