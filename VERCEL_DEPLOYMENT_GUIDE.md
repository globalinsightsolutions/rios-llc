# Vercel Deployment Guide for rios-llc.com

This guide will help you deploy your opt-in page to Vercel and connect it to your Squarespace domain.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com) if you don't have one)
- Your Squarespace domain: `rios-llc.com`
- Your project files ready

---

## Step 1: Prepare Your Project

### Option A: Using Git (Recommended)

1. **Initialize Git repository** (if not already done):
   ```bash
   cd "/Users/ericlaw/Downloads/mags optin page"
   git init
   git add .
   git commit -m "Initial commit - VIP List opt-in page"
   ```

2. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Push your code:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git branch -M main
     git push -u origin main
     ```

### Option B: Direct Upload (No Git)

You can also drag and drop your folder directly to Vercel (see Step 2).

---

## Step 2: Deploy to Vercel

### Method 1: Via Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. Click **"Add New Project"**
3. **Import your project**:
   - If using Git: Select your GitHub repository
   - If not using Git: Click "Browse" and select your project folder
4. **Configure project**:
   - **Framework Preset:** Other (or Static Site)
   - **Root Directory:** `./` (current directory)
   - **Build Command:** Leave empty (static site)
   - **Output Directory:** Leave empty or `./`
5. Click **"Deploy"**
6. Wait for deployment to complete (usually 1-2 minutes)

### Method 2: Via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   cd "/Users/ericlaw/Downloads/mags optin page"
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name? `rios-llc-optin` (or your choice)
   - Directory? `./`
   - Override settings? **No**

---

## Step 3: Configure Domain in Vercel

1. **Go to your project dashboard** on Vercel
2. Click on **"Settings"** tab
3. Click **"Domains"** in the left sidebar
4. **Add your domain**:
   - Enter: `rios-llc.com`
   - Click **"Add"**
5. **Add subdomain** (optional, for www):
   - Enter: `www.rios-llc.com`
   - Click **"Add"**

Vercel will show you the DNS records you need to configure.

---

## Step 4: Configure DNS in Squarespace

### Important: Keep Squarespace DNS Settings

Since your domain is managed by Squarespace, you'll need to add DNS records in Squarespace's DNS settings.

### Steps:

1. **Log in to Squarespace**
2. Go to **Settings** → **Domains**
3. Click on **rios-llc.com**
4. Click **"DNS Settings"** or **"Advanced DNS"**
5. **Add CNAME record** for root domain:
   - **Type:** CNAME
   - **Host:** @ (or leave blank for root domain)
   - **Points to:** `cname.vercel-dns.com` (Vercel will provide the exact value)
   - **TTL:** 3600 (or default)

   **Note:** Some DNS providers don't support CNAME for root domain (@). If Squarespace doesn't allow this, use the A record method below.

6. **Alternative: Use A Records** (if CNAME not supported for root):
   - Vercel will provide IP addresses
   - Add A records pointing to those IPs

7. **Add CNAME for www subdomain** (if you added it):
   - **Type:** CNAME
   - **Host:** www
   - **Points to:** `cname.vercel-dns.com` (or the value Vercel provides)
   - **TTL:** 3600

### Vercel DNS Values:

After adding your domain in Vercel, it will show you the exact DNS records. Common values:

- **For root domain (@):** 
  - CNAME: `cname.vercel-dns.com`
  - OR A records: Vercel will provide IP addresses

- **For www subdomain:**
  - CNAME: `cname.vercel-dns.com`

---

## Step 5: Wait for DNS Propagation

1. **DNS changes can take 24-48 hours** to fully propagate
2. **Check status in Vercel**: The domain will show "Valid Configuration" when ready
3. **Test your domain**: Visit `rios-llc.com` to see your opt-in page

### Quick DNS Check:

You can check if DNS has propagated:
```bash
# Check CNAME record
dig rios-llc.com CNAME

# Or use online tools:
# - https://dnschecker.org
# - https://www.whatsmydns.net
```

---

## Step 6: Update Your Code (If Needed)

### Update Email Domain References

Since you're using `rios-llc.com`, you may want to update email references to match:

- Current email: `Hello@rioscontact.me`
- Consider: `Hello@rios-llc.com` (optional, for consistency)

### Update Google Sheets Script URL

Make sure your `GOOGLE_SCRIPT_URL` in `script.js` is still correct (it should be fine).

---

## Step 7: SSL Certificate (Automatic)

Vercel automatically provides SSL certificates for your domain. No action needed!

Your site will be accessible at:
- `https://rios-llc.com` (secure)
- `https://www.rios-llc.com` (if configured)

---

## Troubleshooting

### Domain Not Working?

1. **Check DNS propagation**: Use [dnschecker.org](https://dnschecker.org)
2. **Verify DNS records**: Make sure they match what Vercel shows
3. **Wait longer**: DNS can take up to 48 hours
4. **Check Vercel dashboard**: Look for any error messages

### Squarespace DNS Limitations?

If Squarespace doesn't support CNAME for root domain:

1. **Use A records** instead (Vercel will provide IPs)
2. **Or use a subdomain**: Deploy to `optin.rios-llc.com` or `vip.rios-llc.com`
3. **Or transfer DNS**: Move DNS management to Vercel or another provider

### Still Having Issues?

1. **Check Vercel logs**: Go to your project → Deployments → Click on a deployment → View logs
2. **Contact Vercel support**: They're very helpful with domain issues
3. **Check Squarespace docs**: For DNS configuration help

---

## Alternative: Use Subdomain Instead

If configuring root domain is difficult, you can use a subdomain:

1. **In Vercel**: Add domain `optin.rios-llc.com`
2. **In Squarespace DNS**: Add CNAME record:
   - **Host:** optin
   - **Points to:** `cname.vercel-dns.com`
3. **Access your site**: `https://optin.rios-llc.com`

This is often easier and works immediately!

---

## Next Steps After Deployment

1. ✅ Test the form submission
2. ✅ Verify Google Sheets integration works
3. ✅ Check that all links work (Terms, Privacy Policy)
4. ✅ Test on mobile devices
5. ✅ Update any hardcoded URLs if needed

---

## Quick Reference

**Vercel Dashboard:** https://vercel.com/dashboard  
**Squarespace DNS:** Settings → Domains → rios-llc.com → DNS Settings  
**DNS Checker:** https://dnschecker.org

---

**Need Help?** Vercel has excellent documentation and support. Check their docs at [vercel.com/docs](https://vercel.com/docs)

