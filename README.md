This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# dev_store
dev_store, 
mantine.dev

# Refactor 16/10 (rf1610)

1. Remove old packages:

``` bash
rm -rf node_modules package-lock.json
```
2. Check and update packages in package.json

``` bash
# 1. Install npm if you don’t have it yet else start from step 5.
apt install npm
# or
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# => 2. Close and reopen your terminal to start using nvm

# 3. Install newly version LTS
nvm install --lts
# 4. Switch to the newly installed version.
nvm use --lts
# (Optional) Set this version as the default for new terminal session.
nvm alias default lts/*
```
``` bash
# 5. Install npm-check-updates if you haven't had it
npm install -g npm-check-updates
# 6. Run cli to upgrade the version in package.json
ncu -u
# 7. Install all packages with new versions.
npm install
#  8. Start the project 
npm run dev
```
3. Fix issues.
- Trước đây (v3): Gói tailwindcss đã bao gồm cả plugin PostCSS.
- Bây giờ (v4): Cần một gói riêng là @tailwindcss/postcss để làm cầu nối giữa Tailwind và PostCSS.
``` bash
npm install -D @tailwindcss/postcss
```
4. Update file postcss.config.js

``` bash
npm install postcss-nesting
npm install -D postcss-simple-vars
npm install -D autoprefixer
npm install postcss-preset-mantine --save-dev
```
5. Install libs:
``` bash
npm install axios
npm install @tabler/icons-react

```

