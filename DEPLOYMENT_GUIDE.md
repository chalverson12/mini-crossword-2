# 🚀 Deployment Guide for Mini Crossword Puzzle

## Quick Fix for Branch Protection Error

If you're seeing the error "Branch is not allowed to deploy to github-pages due to environment protection rules", here are the solutions:

### Solution 1: Deploy from Branch (Easiest)

1. **Go to your GitHub repository**
2. **Click Settings tab**
3. **Scroll down to "Pages" in the left sidebar**
4. **Under "Source":**
   - Select "Deploy from a branch"
   - Choose your main branch (usually "main" or "master")
   - Select "/ (root)" as the folder
5. **Click "Save"**
6. **Wait 1-2 minutes** - your site will be live at `https://[username].github.io/[repo-name]`

### Solution 2: Fix Environment Protection Rules

1. **Go to repository Settings**
2. **Click "Environments" in the left sidebar**
3. **Click on "github-pages" environment**
4. **Under "Deployment branches":**
   - Select "All branches" OR
   - Add your specific branch name to the allowed list
5. **Save changes**
6. **Re-run the failed GitHub Action**

### Solution 3: Manual Deployment Check

1. **Ensure all files are in the main/master branch**
2. **Check that index.html is in the root directory**
3. **Verify your repository is public** (or you have GitHub Pro for private Pages)

## Files Required for Deployment

Make sure these files are in your repository root:
- ✅ `index.html` - Main game file
- ✅ `styles.css` - Styling
- ✅ `script.js` - Game logic
- ✅ `README.md` - Documentation

## Testing Your Deployment

Once deployed, your game will be available at:
```
https://[your-username].github.io/[repository-name]/
```

Example: `https://johndoe.github.io/mini-crossword-puzzle/`

## Alternative: Local Testing

If you want to test locally before deploying:
```bash
# Navigate to your project folder
cd /path/to/your/project

# Start a simple web server (Python 3)
python3 -m http.server 8000

# Or with Python 2
python -m SimpleHTTPServer 8000

# Open browser to: http://localhost:8000
```

## Common Issues & Solutions

**Issue**: Page shows 404 error
- **Solution**: Make sure `index.html` is in the repository root

**Issue**: Styles not loading
- **Solution**: Check that all file paths are relative (no leading slashes)

**Issue**: Game not working
- **Solution**: Open browser console (F12) to check for JavaScript errors

**Issue**: Changes not showing
- **Solution**: GitHub Pages can take 5-10 minutes to update. Try hard refresh (Ctrl+F5)

## Success Indicators

Your deployment is successful when:
- ✅ No errors in GitHub Actions (if using)
- ✅ Repository Settings → Pages shows green checkmark
- ✅ Game loads and is playable at your GitHub Pages URL
- ✅ All interactive features work (clicking cells, checking answers, etc.)

---

Need help? The game works with pure HTML/CSS/JavaScript, so it should deploy easily once the branch protection issue is resolved!