# GirlyCrafts Showcase

This is a Next.js web application built to showcase handmade crafts, primarily targeting female customers. It serves as a simple display website where product details and updates (like offers or sold-out status) are managed directly within the codebase or a JSON file.

## Features

*   **Product Display:** Shows a grid of handmade products with images, titles, descriptions, and prices.
*   **Category Filtering:** Allows users to browse products by category.
*   **Sorting:** Products can be sorted by price.
*   **Product Details:** A modal view provides more detailed information about each product.
*   **Contact Information:** Displays contact details (Phone, Email, Instagram, Address) and a location map.
*   **Responsive Design:** Adapts to different screen sizes (desktop and mobile).
*   **Styling:** Uses Tailwind CSS and ShadCN UI components with a custom theme.

## Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, ShadCN UI
*   **UI Components:** Radix UI (via ShadCN)
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Data Management:** JSON file (`src/data/products.json`)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd girlycrafts-showcase
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    The application will be available at `http://localhost:3000` (or the specified port).

## Project Structure

*   `src/app/`: Contains the application pages and layouts (App Router).
*   `src/components/`: Reusable UI components.
    *   `src/components/ui/`: ShadCN UI components.
    *   `src/components/layout/`: Header, Footer, Loading Manager.
    *   `src/components/icons/`: Custom SVG icons.
*   `src/data/`: Contains static data files like `products.json`.
*   `src/lib/`: Utility functions and type definitions.
*   `src/hooks/`: Custom React hooks.
*   `public/`: Static assets like images and icons.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `next.config.ts`: Next.js configuration.
*   `tsconfig.json`: TypeScript configuration.
*   `package.json`: Project dependencies and scripts.

## Managing Products

Product information is stored in `src/data/products.json`. To add, remove, or update products:

*   **Edit the JSON file:** Modify the array of product objects directly.
*   **Fields:** Each product object includes `id`, `title`, `description`, `price`, `imageUrl`, `category`, and optional fields like `soldOut`, `discount`, `customizable`.
*   **Images:** Currently uses placeholder images from `https://picsum.photos`. For production, replace these URLs with paths to images stored in the `public/images/` directory (e.g., `/images/products/my-product.jpg`). Ensure the `next.config.js` allows your image hostname if using external images, or remove the `remotePatterns` if using only local images.

## Deployment

This project is ready to be deployed on platforms like Vercel, Netlify, or Firebase Hosting. Refer to the Next.js deployment documentation for detailed instructions.
