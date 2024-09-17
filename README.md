# Stylish Store

# Introduction

- Welcome to Stylish store , an e-commerce web application built using modern web technologies to provide users with a seamless shopping experience. The application allows users to browse products, view detailed product information, add items to their cart, compare products, and manage purchases with a user-friendly interface.

The project is designed to demonstrate the implementation of core e-commerce features like product listings, dynamic routing, persistent shopping cart, and user authentication using state-of-the-art tools and frameworks like Next.js and Supabase


## Technologies Used

This project utilizes the following technologies:


- Next.js: A React framework for building server-rendered applications with file-system-based routing, server-side rendering (SSR), and static site generation (SSG).
- React: The core library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- Fakestore API: A simple API to fetch mock product data.
- Local Storage: For persisting shopping cart and product comparison list data.

    ## Features

    - Product Listing: Display a dynamic list of products fetched from the API.
- Product Detail Page: View individual product details using dynamic routing in Next.js..
- User Authentication: Users can register and log in to manage their shopping experience.
- Responsive Design: Optimized for desktop and mobile devices using Tailwind CSS.


# Setup Instructions
 To set up the project locally, follow these steps:

## Prerequisites
 Make sure you have the following installed:

- Next.js
- npm: the application will be available at  http://localhost:3000/

# Reflections

## Learnings

## 1. Next.js Dynamic Routing
 - Learned how to implement dynamic routing with Next.js, specifically using the App Router. The use of [id] folders for dynamic routes allowed for efficient URL structuring, particularly in product pages where unique IDs drive content.
- Gained experience in working with useParams and useRouter to manage route parameters and programmatic navigation in Next.js.

## 2. State Persistence with Local Storage
- Implemented persistent shopping carts and product comparison lists using local storage, enhancing the user experience by saving data across sessions without a backend database.
- Learned best practices in using useEffect to sync local storage with React state, ensuring data integrity when users reload the page or leave the site.

## 4. API Data Fetching
- Worked with both client-side data fetching using the Fakestore API and server-side rendering with Next.js, learning the advantages of server-side data fetching for SEO optimization and faster initial page load times.
- Explored caching strategies to optimize the user experience when fetching frequently accessed data like product lists

## 5. Responsive UI Design with Tailwind CSS
- Gained experience in building responsive UIs using Tailwind CSS, which allowed for rapid prototyping and a streamlined development process.
- Learned how utility-first CSS frameworks can significantly speed up front-end design work and how to customize Tailwind classes to fit project-specific needs.

# Challenges
While developing My Stylish Store, several challenges were encountered that provided learning opportunities and enhanced problem-solving skills:

## 1. Dynamic Routing with Next.js (App Router)
- Challenge: Understanding and correctly implementing dynamic routing in Next.js using the new App Router was initially confusing, particularly when transitioning from the older Pages Router.
- Solution: After reviewing the Next.js documentation and experimenting with different approaches, I learned how to use the useParams and useRouter hooks correctly within the App Router structure. This provided more clarity on the differences between the two routing systems and how to handle dynamic routes.

## 2. Handling API Errors and Loading States
- Challenge: The Fakestore API occasionally encountered issues like slow responses or network errors, which caused parts of the UI to break or not render properly.
- Solution: Implemented error handling and loading states in the UI to provide feedback to users when API calls failed or took longer than expected. This improved the overall user experience and made the app more robust to external API failures.

## 3. Navigating Between Pages
- Challenge: Implementing smooth and reliable navigation between pages, especially when going back from the product detail page to the previous page (product listing or another category), proved difficult when relying solely on browser history.
- Solution: By using router.back() and saving previous URLs in local storage or query parameters, I was able to create a more controlled navigation system, ensuring that users always returned to the correct page.


# Conclusion

- **Stylish Store** represents a solid foundation for future projects and a testament to the skills and knowledge acquired during its development. The lessons learned and challenges overcome during this project will serve as a valuable reference for future endeavors.