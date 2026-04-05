# GitHub Upload Guide

This guide will help you upload your opt-in page project to your GitHub repository: `elawwws/optin_page`

## Prerequisites

- Git installed on your computer
- Your GitHub repository already created: `https://github.com/elawwws/optin_page.git`

---

## Method 1: Using Terminal/Command Line (Recommended)

### Step 1: Open Terminal

- **Mac:** Open Terminal app
- **Windows:** Open Git Bash or Command Prompt
- **Linux:** Open Terminal

### Step 2: Navigate to Your Project Folder

```bash
cd "/Users/ericlaw/Downloads/mags optin page"
```

**Note:** The quotes are important because your folder name has a space in it.

### Step 3: Initialize Git (if not already done)

```bash
git init
```

### Step 4: Add All Files

```bash
git add .
```

This adds all your files to be committed.

### Step 5: Create Your First Commit

```bash
git commit -m "Initial commit - RIOS LLC VIP List opt-in page"
```

### Step 6: Add Your GitHub Repository as Remote

```bash
git remote add origin https://github.com/elawwws/optin_page.git
```

**Note:** If you get an error saying "remote origin already exists", use this instead:
```bash
git remote set-url origin https://github.com/elawwws/optin_page.git
```

### Step 7: Rename Branch to Main (if needed)

```bash
git branch -M main
```

### Step 8: Push to GitHub

```bash
git push -u origin main
```

You'll be prompted for your GitHub username and password (or personal access token).

**If you have 2FA enabled**, you'll need to use a Personal Access Token instead of your password:
- Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate a new token with `repo` permissions
- Use the token as your password

---

## Method 2: Using GitHub Desktop (Easier for Beginners)

### Step 1: Download GitHub Desktop

1. Go to [desktop.github.com](https://desktop.github.com)
2. Download and install GitHub Desktop

### Step 2: Sign In

1. Open GitHub Desktop
2. Sign in with your GitHub account

### Step 3: Add Your Repository

1. Click **File** → **Add Local Repository**
2. Click **Choose** and navigate to: `/Users/ericlaw/Downloads/mags optin page`
3. Click **Add Repository**

### Step 4: Publish to GitHub

1. If the repository isn't connected, click **Publish repository**
2. Make sure the repository name is: `optin_page`
3. Make sure the account is: `elawwws`
4. Click **Publish Repository**

### Step 5: Commit and Push

1. You'll see all your files listed as changes
2. At the bottom, type a commit message: "Initial commit - RIOS LLC VIP List opt-in page"
3. Click **Commit to main**
4. Click **Push origin** to upload to GitHub

---

## Method 3: Using VS Code (If You Use VS Code)

### Step 1: Open Project in VS Code

1. Open VS Code
2. File → Open Folder
3. Select: `/Users/ericlaw/Downloads/mags optin page`

### Step 2: Initialize Git

1. Open the Terminal in VS Code (View → Terminal)
2. Run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - RIOS LLC VIP List opt-in page"
   ```

### Step 3: Connect to GitHub

1. Click the Source Control icon in the left sidebar (looks like a branch)
2. Click "Publish to GitHub"
3. Select your repository: `elawwws/optin_page`
4. Click "OK"

---

## Troubleshooting

### "Repository not found" Error

- Make sure the repository exists on GitHub
- Check that you have access to `elawwws/optin_page`
- Verify the URL is correct

### "Authentication failed" Error

- Use a Personal Access Token instead of password
- Make sure 2FA is set up correctly
- Try using GitHub Desktop for easier authentication

### "Remote origin already exists" Error

```bash
git remote remove origin
git remote add origin https://github.com/elawwws/optin_page.git
```

### Files Not Showing Up

- Make sure you ran `git add .`
- Check that files aren't in `.gitignore`
- Verify you're in the correct directory

---

## After Uploading

Once your files are on GitHub:

1. ✅ Go to `https://github.com/elawwws/optin_page` to see your files
2. ✅ You can now connect this to Vercel for deployment
3. ✅ Make changes locally and push updates with:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

---

## Quick Reference Commands

```bash
# Navigate to project
cd "/Users/ericlaw/Downloads/mags optin page"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/elawwws/optin_page.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Next Steps

After uploading to GitHub:

1. **Deploy to Vercel**: Connect your GitHub repo to Vercel for automatic deployments
2. **Set up domain**: Follow the Vercel deployment guide to connect `rios-llc.com`
3. **Test**: Make sure everything works on the live site

---

**Need Help?** Check GitHub's documentation at [docs.github.com](https://docs.github.com)

