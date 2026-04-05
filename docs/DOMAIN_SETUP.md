# Domain Setup for rios-llc.com

## Quick Setup Steps

### Step 1: Add Domain in Vercel Dashboard

**Open this link in your browser:**
https://vercel.com/frugal-seasons-projects/rios-llc-optin/settings/domains

1. Click **"Add Domain"** button
2. Enter: `rios-llc.com`
3. Click **"Add"**
4. Vercel will show you DNS configuration instructions

### Step 2: Configure DNS in Squarespace

After adding the domain in Vercel, you'll see DNS records like:

**Option A: CNAME Record (Recommended)**
- **Type:** CNAME
- **Host:** @ (or leave blank for root domain)
- **Points to:** `cname.vercel-dns.com` (Vercel will show exact value)
- **TTL:** 3600

**Option B: A Records (If CNAME not supported)**
- Vercel will provide IP addresses
- Add A records pointing to those IPs

**For www subdomain (optional):**
- **Type:** CNAME
- **Host:** www
- **Points to:** `cname.vercel-dns.com`

### Step 3: Configure in Squarespace

1. Log in to **Squarespace**
2. Go to **Settings** → **Domains**
3. Click on **rios-llc.com**
4. Click **"DNS Settings"** or **"Advanced DNS"**
5. Add the DNS records that Vercel shows you
6. Save changes

### Step 4: Wait for DNS Propagation

- DNS changes can take **24-48 hours** to fully propagate
- Vercel dashboard will show "Valid Configuration" when ready
- You can check status at: https://vercel.com/frugal-seasons-projects/rios-llc-optin/settings/domains

### Step 5: Test Your Domain

Once DNS propagates:
- Visit: `https://rios-llc.com`
- Your opt-in page should load!

---

## Alternative: Use Subdomain (Easier & Faster)

If root domain setup is difficult, use a subdomain:

1. **In Vercel:** Add domain `optin.rios-llc.com` or `vip.rios-llc.com`
2. **In Squarespace DNS:** Add CNAME:
   - **Host:** `optin` (or `vip`)
   - **Points to:** `cname.vercel-dns.com`
3. **Access:** `https://optin.rios-llc.com`

This usually works immediately!

---

## Troubleshooting

### Domain Not Working After 48 Hours?

1. **Check DNS propagation:**
   - Visit: https://dnschecker.org
   - Enter: `rios-llc.com`
   - Check if CNAME/A records are correct globally

2. **Verify DNS records match Vercel:**
   - Go to Vercel dashboard → Domains
   - Compare the records shown with what's in Squarespace

3. **Check Vercel domain status:**
   - Should show "Valid Configuration" when ready
   - If it shows errors, fix the DNS records

### Squarespace DNS Limitations?

If Squarespace doesn't support CNAME for root domain (@):

1. **Use A records** (Vercel will provide IPs)
2. **Or use subdomain** (easier option)
3. **Or transfer DNS** to Vercel or another provider

---

## Quick Links

- **Vercel Domains Settings:** https://vercel.com/frugal-seasons-projects/rios-llc-optin/settings/domains
- **Vercel Project Dashboard:** https://vercel.com/frugal-seasons-projects/rios-llc-optin
- **DNS Checker:** https://dnschecker.org

---

**Need Help?** Vercel support is excellent - contact them if you're stuck!

