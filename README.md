# Kasher Landing Page

Modern, responsive landing page built with Next.js 14, Tailwind CSS, and shadcn/ui components.

## Features

- 🎨 Modern design with animated gradients
- 📱 Fully responsive layout
- 🌗 Light/dark mode support
- 🔄 Multi-step wholesale inquiry form
- 🌐 Internationalization ready
- ✨ Smooth animations and transitions
- 📝 Form validation with Zod
- 🎯 Accessible components

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Lucide Icons

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/kasher-landing-page.git
cd kasher-landing-page
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                   # Next.js app directory
├── components/           # React components
│   ├── icons/           # SVG icons
│   ├── layout/          # Layout components
│   │   └── sections/    # Page sections
│   └── ui/             # UI components
├── content/             # Content files
│   └── en/             # English content
├── lib/                # Utility functions
└── public/             # Static assets
```

## Form Implementation

The wholesale inquiry form is implemented as a multi-step wizard with:

1. Contact Information

   - First/Last Name
   - Mobile Number
   - Email Address
   - Business Details

2. Business Address

   - Street Address
   - City/State
   - Postal Code
   - Country

3. Business Interest
   - Multiple options for business needs
   - Custom branding interest
   - Volume requirements

## Content Management

Content is managed through JSON files in the `content` directory:

```
content/
└── en/
    └── landing.json    # English content
```

This structure supports future internationalization efforts.

## Styling

- Tailwind CSS for utility-first styling
- CSS Modules for component-specific styles
- Custom animations using CSS keyframes
- Gradient overlays for visual effects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
