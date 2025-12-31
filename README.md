# Feather - Shopify Theme Starter

A modern, lightweight Shopify theme starter template built with **Tailwind CSS v4**, **Alpine.js**, and **Vite**. Designed for rapid development with a modular architecture and best practices.

## 🚀 Features

- **Tailwind CSS v4** - Latest version with new CSS-first configuration
- **Alpine.js** - Lightweight JavaScript framework for interactive components
- **Vite** - Lightning-fast build tool with HMR
- **Modular Architecture** - Sections, blocks, and snippets for reusable components
- **LiquidDoc** - Inline documentation for Liquid components
- **Theme Editor Ready** - Customizable settings and schema
- **i18n Support** - Built-in translation system

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)

## 🛠️ Installation

1. **Clone or download this repository**

```bash
git clone <repository-url> my-shopify-theme
cd my-shopify-theme
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set Shopify Store name in .shopify**

```bash
echo "your-store-name" > .shopify
```

Replace `your-store-name` with your actual Shopify store name.

4. **Start development**

Open two terminal windows:

**Terminal 1 - Vite build (watches and compiles Tailwind/Alpine)**

```bash
pnpm run dev:tailwind
```

**Terminal 2 - Shopify theme development server**

```bash
pnpm run dev:shopify
```

This will:

- Compile your CSS and JS with Vite
- Start the Shopify theme development server
- Open your development store in the browser
- Watch for file changes with hot reload

## 📁 Project Structure

```
.
├── assets/              # Compiled CSS/JS and static assets
│   ├── main.css        # Compiled Tailwind CSS
│   └── main.js         # Compiled Alpine.js bundle
├── blocks/             # Reusable, nestable, customizable components
│   ├── group.liquid    # Layout container block
│   └── text.liquid     # Text content block
├── config/             # Theme configuration
│   ├── settings_data.json       # Theme setting values
│   └── settings_schema.json     # Theme setting definitions
├── layout/             # Theme layouts
│   ├── theme.liquid    # Main layout
│   └── password.liquid # Password page layout
├── locales/            # Translation files
│   ├── en.default.json         # English translations
│   └── en.default.schema.json  # Schema translations
├── sections/           # Full-width page sections
│   ├── header.liquid
│   ├── footer.liquid
│   ├── product.liquid
│   └── ...
├── snippets/           # Reusable code fragments
│   ├── image.liquid
│   ├── meta-tags.liquid
│   ├── css-variables.liquid
│   └── vite-tag.liquid
├── src/                # Source files (pre-build)
│   ├── css/
│   │   └── main.css   # Tailwind entry point
│   └── js/
│       └── main.js    # JavaScript entry point
├── templates/          # Page templates (JSON)
│   ├── index.json
│   ├── product.json
│   └── ...
├── vite.config.js     # Vite configuration
└── package.json       # Project dependencies
```

## 🎨 Working with Tailwind CSS v4

### Configuration

Tailwind CSS v4 uses a CSS-first configuration approach. Configure Tailwind in [src/css/main.css](src/css/main.css):

```css
@import "tailwindcss" source(none);

/* Point Tailwind to your Liquid files */
@source "../../layout/*.liquid";
@source "../../sections/*.liquid";
@source "../../snippets/*.liquid";

@theme {
  --color-brand: #121212;
  /* Add custom design tokens here */
}
```

### Using Tailwind Classes

Apply utility classes directly in your Liquid templates:

```liquid
<div class="container mx-auto px-4">
  <h1 class="text-4xl font-bold text-brand">{{ product.title }}</h1>
</div>
```

### Custom Design Tokens

Define custom tokens in the `@theme` directive:

```css
@theme {
  --color-brand: #121212;
  --color-accent: #ff6b6b;
  --font-size-huge: 4rem;
}
```

Use them with Tailwind utilities:

```html
<div class="text-huge text-brand">Custom Token</div>
```

## 🏔️ Working with Alpine.js

Alpine.js is automatically initialized in [src/js/main.js](src/js/main.js). Use Alpine directives in your Liquid templates:

### Basic Example

```liquid
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Content</div>
</div>
```

### Cart Drawer Example

```liquid
<div x-data="{ cartOpen: false }">
  <button @click="cartOpen = true">Open Cart</button>

  <div
    x-show="cartOpen"
    @click.away="cartOpen = false"
    class="fixed inset-0 bg-black/50"
  >
    <div class="w-96 bg-white h-full">
      <!-- Cart content -->
    </div>
  </div>
</div>
```

## 🧩 Component Architecture

### Sections

Sections are full-width, customizable components visible in the theme editor.

**Example: [sections/custom-section.liquid](sections/custom-section.liquid)**

```liquid
<div class="custom-section">
  {% content_for 'blocks' %}
</div>

{% schema %}
{
  "name": "Custom Section",
  "blocks": [{ "type": "@theme" }],
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title"
    }
  ]
}
{% endschema %}
```

### Blocks

Blocks are smaller, reusable components that can be nested and customized.

**Example: [blocks/text.liquid](blocks/text.liquid)**

```liquid
{% doc %}
  Renders a text block with customizable styling.
  @example
  {% content_for 'block', type: 'text', id: 'text' %}
{% enddoc %}

<div class="{{ block.settings.text_style }}">
  {{ block.settings.text }}
</div>

{% schema %}
{
  "name": "Text",
  "settings": [
    {
      "type": "text",
      "id": "text",
      "label": "Text",
      "default": "Enter text"
    }
  ]
}
{% endschema %}
```

### Snippets

Snippets are reusable code fragments for logic that doesn't need theme editor customization.

**Example: [snippets/image.liquid](snippets/image.liquid)**

```liquid
{% doc %}
  Renders a responsive image.
  @param {image} image - The image object
  @param {number} [width] - Image width
{% enddoc %}

{{ image | image_url: width: width | image_tag }}
```

**Usage:**

```liquid
{% render 'image', image: product.featured_image, width: 800 %}
```

## 🌍 Localization

All user-facing text should use translation filters:

### Adding Translations

**In Liquid:**

```liquid
<h1>{{ 'products.title' | t }}</h1>
<button>{{ 'cart.add_to_cart' | t }}</button>
```

**In [locales/en.default.json](locales/en.default.json):**

```json
{
  "products": {
    "title": "Products"
  },
  "cart": {
    "add_to_cart": "Add to cart"
  }
}
```

### With Variables

```liquid
<p>{{ 'products.price_range' | t: min: product.price_min, max: product.price_max }}</p>
```

```json
{
  "products": {
    "price_range": "From {{ min }} to {{ max }}"
  }
}
```

## 🎯 Theme Settings

Global theme settings are defined in [config/settings_schema.json](config/settings_schema.json) and accessed via the `settings` object:

```liquid
<div style="max-width: {{ settings.max_page_width }}">
  <!-- Content -->
</div>
```

## 🔧 Build & Deploy

### Development

```bash
# Terminal 1: Build assets with watch mode
pnpm run dev:tailwind

# Terminal 2: Run Shopify dev server
pnpm run dev:shopify
```

### Production Build

1. Build assets:

```bash
npx vite build
```

2. Deploy to Shopify:

```bash
shopify theme push
```

Or push to a specific theme:

```bash
shopify theme push --theme=<theme-id>
```

## 📝 Best Practices

### CSS & JavaScript

- Write component-specific CSS using `{% stylesheet %}` tags in sections/blocks
- Write component-specific JS using `{% javascript %}` tags in sections/blocks
- Keep [assets/](assets/) for compiled files and critical global assets only

### Component Development

1. **Sections**: For full-width, editor-customizable layouts
2. **Blocks**: For smaller, reusable, nestable components
3. **Snippets**: For logic/markup that doesn't need editor customization

### Documentation

Use LiquidDoc headers in snippets and blocks:

```liquid
{% doc %}
  Brief description of the component.

  @param {type} name - Parameter description
  @param {type} [optional] - Optional parameter

  @example
  {% render 'snippet-name', param: value %}
{% enddoc %}
```

### Settings

- Use CSS variables for single-property settings:

  ```liquid
  <div style="--gap: {{ block.settings.gap }}px">
  ```

- Use CSS classes for multi-property settings:
  ```liquid
  <div class="{{ block.settings.layout }}">
  ```

## 🔍 Key Files

| File                                                       | Purpose                                |
| ---------------------------------------------------------- | -------------------------------------- |
| [vite.config.js](vite.config.js)                           | Vite build configuration               |
| [src/css/main.css](src/css/main.css)                       | Tailwind entry point and configuration |
| [src/js/main.js](src/js/main.js)                           | JavaScript entry point (Alpine.js)     |
| [layout/theme.liquid](layout/theme.liquid)                 | Main theme layout                      |
| [config/settings_schema.json](config/settings_schema.json) | Theme settings definition              |
| [AGENTS.md](AGENTS.md)                                     | Detailed theme architecture guide      |

## 📚 Resources

- [Shopify Theme Development](https://shopify.dev/docs/themes)
- [Liquid Documentation](https://shopify.dev/docs/api/liquid)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Alpine.js Documentation](https://alpinejs.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

Contributions are welcome! Please read the [AGENTS.md](AGENTS.md) file for architecture guidelines and best practices.

## 📄 License

See [LICENSE.md](LICENSE.md) for details.

---

**Happy coding! 🎉**
