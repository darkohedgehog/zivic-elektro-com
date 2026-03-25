# PROJECT_MAP.md

Main entry points:

app/layout.tsx → root layout
app/page.tsx → homepage
app/[locale]/layout.tsx → i18n layout

Data layer:

lib/api.ts → API helpers
lib/strapi.ts → Strapi client

UI components:

components/navigation/NavBar.tsx
components/footer/Footer.tsx
components/background/DottedBackground.tsx

Feature areas:

components/projects → project components
components/services → services section

Configuration:

next.config.ts
tailwind.config.ts
tsconfig.json