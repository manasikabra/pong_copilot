# pong_copilot
Copilot test - Create a simple Pong game using HTML, CSS, and JavaScript. The player should control the left paddle with their mouse and arrow keys up/down, the right paddle is the computer. Make sure the game includes a bouncing ball, a scoreboard and collision detection for paddles and walls.

The files created in the cospace will be reflected in the repo via git commit. The commit tab doesn't work - use the terminal to add or make the chages to the file. Follow the below commands:

```
git add .
git commit -m "Initial commit of the Pong project"
git push origin main
```

This will upload your files to the main branch of your repo. 

Got it—let’s do this on GitHub. We’ll keep it super step-by-step.

# Step 1 — Turn on GitHub Pages for your repo

1. **Put the file(s) in the right place**

* If your main file is `index.html`, put it at the **repo root** (or inside a `/docs` folder).
* If your main file is `something.htm` (not `index.html`), either:

  * **Rename** it to `index.html`, **or**
  * Keep the name and you’ll open it via `/something.htm` later (not just the repo root).

2. **Enable Pages**

* On GitHub: **Repo → Settings → Pages** (left sidebar).
* **Build and deployment**

  * **Source:** “Deploy from a branch”
  * **Branch:** `main` (or your default), **Folder:** `/ (root)`
    *(Pick `/docs` if your files are in `/docs`.)*
* Click **Save**. A public URL will appear there (e.g. `https://<username>.github.io/<repo>/`).

3. **Open the right URL**

* If you have `index.html` at the selected folder: open the site root shown in Pages.
* If your main file is `something.htm`: open
  `https://<username>.github.io/<repo>/something.htm`

4. **If you see a blank page or 404**

* **Case-sensitive filenames:** `style.css` ≠ `Style.css`
* **Use relative paths:** `./assets/img.png` (not `C:\…` or `file://…`)
* If your CSS/JS paths start with a leading slash like `/assets/...`, change to **relative** (`assets/...`) **or** add in your `<head>`:
  `<base href="/<repo>/">`

Reply **OK** once you’ve done this and share the Pages URL (or what error you see), and we’ll do Step 2 (quick path fixes if needed).

