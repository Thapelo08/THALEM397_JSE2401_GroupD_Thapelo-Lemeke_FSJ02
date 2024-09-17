import "./globals.css";

/**
 * Metadata for the application, including the title and description.
 *
 * @constant
 * @type {Object}
 * @property {string} title - The title of the application.
 * @property {string} description - A brief description of the application.
 */
export const metadata = {
  title: "Stylish E-commerce Store",
  description: "A beautiful and modern e-commerce experience",
};

/**
 * RootLayout component provides the main layout structure for the application.
 * It includes a header, a main content area, and a footer.
 *
 * @component
 * @example
 * return (
 *   <RootLayout>
 *     <YourContentHere />
 *   </RootLayout>
 * );
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered within the main content area.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white dark:bg-slate-800 shadow-sm">
          <nav className="container mx-auto px-4 py-4">
            <a href="/" className="text-2xl font-bold text-primary">Stylish Store</a>
          </nav>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-slate-100 dark:bg-slate-800 text-secondary py-6">
          <div className="container mx-auto px-4 text-center">
            © 2024 Stylish Store. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
