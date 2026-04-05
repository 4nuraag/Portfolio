# 🚀 Deployment Guide: From Localhost to Live Website

Follow these steps exactly to publish your portfolio. We will use **Vercel** because it matches your localhost environment perfectly (resolving the "broken layout" issues you faced with GitHub Pages).

## 1. Prepare your Local Project (Done for you!)
I have already reset your configuration to standard settings so it works immediately.

1.  **Open Terminal** in your project folder.
2.  **Reset Git** (Optional, if you want a fresh start):
    *   *Warning: This deletes previous commit history to start fresh.*
    ```bash
    rmdir /s /q .git
    git init
    ```

3.  **Commit your code**:
    ```bash
    git add .
    git commit -m "Initial commit of Portfolio"
    ```

## 2. Create Repository on GitHub
1.  Go to [github.com/new](https://github.com/new).
2.  **Repository Name**: `portfolio` (or whatever you like).
3.  **Visibility**: Public.
4.  **Initialize**: DO NOT check "Add a README", .gitignore, or license. Keep it empty.
5.  Click **Create repository**.

## 3. Push to GitHub
GitHub will show you a page with commands. Copy and run the ones under **"…or push an existing repository from the command line"**:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```
*(Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual details)*

## 4. Publish (The "Localhost Match" Way)
To make it look **exactly** like localhost without broken styles, use Vercel (creators of Next.js).

1.  Go to [vercel.com/new](https://vercel.com/new).
2.  **Connect GitHub Account** (if not already).
3.  You will see your new `portfolio` repository. Click **Import**.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (Default)
    *   **Root Directory**: ./ (Default)
    *   **Build Command**: `next build` (Default)
    *   **No Environment Variables needed**.
5.  Click **Deploy**.

## Why Vercel instead of standard GitHub Pages?
*   **GitHub Pages** puts your site in a sub-folder (e.g., `/portfolio/`). This breaks all your images and CSS unless you rewrite every single link in your code.
*   **Vercel** puts your site at the "root" (e.g., `portfolio.vercel.app`), so **everything works instantly** just like it does on your computer.
