# DPS Anand Admissions Landing Page

This is a Next.js project for the DPS Anand admissions landing page, built with Firebase Studio.

## Getting Started

To run the application locally, first install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## How to Customize the Landing Page

The landing page is designed to be easily customizable. All the content, styling, and images can be modified by editing the files in the `src` directory.

### Project Structure

The main landing page is located at `src/app/page.tsx`. This file assembles various components to build the final page. The individual sections of the landing page are located in the `src/components/landing/` directory.

- `src/app/page.tsx`: The main entry point for the landing page.
- `src/components/landing/`: Contains all the modular sections of the page (e.g., `HeroSection.tsx`, `FaqSection.tsx`).
- `src/app/globals.css`: The global stylesheet where you can customize the theme (colors, fonts).
- `src/lib/placeholder-images.json`: A central file to manage all images used on the site.
- `.env`: File for environment variables like API keys.

### Editing Page Content

To change the text or layout of a specific section, edit the corresponding component in the `src/components/landing/` directory. For example, to change the "Why Choose Us" section, you would edit `src/components/landing/why-choose-us-section.tsx`.

### Changing Colors and Theme

You can change the primary colors, fonts, and other design tokens by editing the CSS variables in `src/app/globals.css`. The theme is configured using HSL values for easy customization.

For example, to change the primary green color, you would update the `--primary` variable:

```css
:root {
  --primary: 142 76% 36%; /* Green from logo */
  --accent: 25 80% 50%;   /* Orange from 'ANAND' in logo */
  /* ... other colors */
}
```

### Updating Images and Logos

All images on the landing page are managed from a single file: `src/lib/placeholder-images.json`. To change an image, simply update the `imageUrl` for the corresponding `id`.

For example, to change the main hero image:

```json
{
  "id": "hero-background",
  "description": "A modern school campus with happy students",
  "imageUrl": "https://your-new-image-url.com/image.jpg",
  "imageHint": "school campus"
}
```

This approach keeps all image assets organized and easy to update.

## Environment Variables

This project uses environment variables for sensitive information and configuration. You will need to create a `.env` file in the root of the project and add the following variables:

- **`HUBSPOT_API_KEY`**: Your HubSpot Private App Token. This is used to save contact information from the inquiry form. It should be a string starting with `pat-...`.
- **`NEXT_PUBLIC_GTM_ID`**: Your Google Tag Manager container ID. This is used for tracking analytics and form submission events.

Example `.env` file:

```
HUBSPOT_API_KEY="pat-na1-your-private-app-token"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
```

**Note:** For the HubSpot integration to work, you must create a Private App in your HubSpot account and use the generated token.

## AI-Powered Features

This application includes AI-powered features using Genkit:

- **Dynamic FAQ Chatbot**: Answers parent questions about admissions. The logic is in `src/ai/flows/dynamic-faq-chatbot.ts`.
- **Personalized Digital Brochure**: Generates an HTML brochure for parents who fill out the inquiry form. The template and logic are in `src/ai/flows/generate-digital-brochure.ts`.

You can customize the prompts and logic in these files to alter the AI's behavior and output.
