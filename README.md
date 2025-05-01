# Kasher Landing Page

A modern, responsive landing page for Kasher's premium titanium products. Built with Next.js, shadcn/ui, and Framer Motion.

## Features

- 🎨 Brand-standard compliant design
- 🌓 Dark mode support
- 📱 Fully responsive
- 🎭 Smooth animations
- 🎠 Interactive product carousel
- 🔍 Detailed product showcases

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **Type Safety:** TypeScript

## Brand Standards

This project follows Kasher's official brand guidelines:

### Typography
- Headers: Built Titling (Bold, Semibold, Regular, Light, Italic)
- Body: Avenir Next (Heavy, Bold, Demi Bold, Regular, Ultra Light)
- Fallback: Arial

### Colors
- Kasher Green: `#9aca3c`
- Rich Black: `#000005`
- White: `#ffffff`
- Dark Green: `#8bbb836`
- Dark Green 2: `#699029`

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/hackur/klp-f1.git
cd klp-f1
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
components/
├── layout/         # Layout components
│   ├── navbar.tsx  # Navigation bar
│   └── sections/   # Page sections
├── ui/            # Reusable UI components
└── icons/         # Icon components

public/
├── black-titanium/ # Product images
└── logos/         # Brand logos

styles/
└── globals.css    # Global styles

lib/
├── utils.ts       # Utility functions
└── types.ts       # TypeScript types
```

## Component Documentation

### ProductShowcase

```tsx
import ProductShowcase from "@/components/ui/product-showcase"

// Usage
<ProductShowcase />
```

Features:
- Auto-rotating product carousel
- Animated transitions between products
- Detailed product information
- Responsive design
- Brand-compliant typography and colors

### Navbar

```tsx
import { Navbar } from "@/components/layout/navbar"

// Usage
<Navbar />
```

Features:
- Semi-transparent backdrop
- Responsive navigation
- Dark mode support
- Product collections dropdown
- Brand logo integration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Style Guide

### Component Structure
- Use TypeScript for all components
- Include JSDoc documentation for interfaces and components
- Follow shadcn/ui patterns for consistency
- Use Tailwind CSS for styling

### Naming Conventions
- Components: PascalCase
- Files: kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE

### Code Organization
- Import order: React, Next.js, external libraries, internal components
- Group related components in directories
- Keep components focused and single-responsibility

## Future Development

See [ROADMAP.md](./ROADMAP.md) for planned features and improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design system by shadcn/ui
- Icons from [Various Sources]
- Inspiration from [Sources]
