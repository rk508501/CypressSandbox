Here's a Playwright cheat sheet covering the requested topics:


# Playwright Cheat Sheet

## 1. Downloading a File
```javascript
// Wait for download event and save the file
const [ download ] = await Promise.all([
  page.waitForEvent('download'), // Wait for download to start
  page.click('a#download-link') // Trigger download
]);
const path = await download.path(); // Get path to downloaded file
await download.saveAs('/path/to/save/downloaded_file'); // Save file to desired location
```

## 2. Opening and Handling a Pop-up Window/New Tab
```javascript
// Wait for popup event
const [ popup ] = await Promise.all([
  page.waitForEvent('popup'), // Wait for new page/tab
  page.click('a[target="_blank"]') // Trigger popup
]);
await popup.waitForLoadState(); // Wait for popup to load
await popup.click('#some-element'); // Interact with popup
await popup.close(); // Close popup
```

## 3. Handling Browser Authentication
```javascript
// Set authentication for HTTP basic auth
const context = await browser.newContext({
  httpCredentials: {
    username: 'user',
    password: 'pass'
  }
});

// Use context for authenticated browsing
const page = await context.newPage();
await page.goto('https://protected-site.com');
```

## 4. Handling Browser Alerts
```javascript
// Handle alert dialog
page.on('dialog', async dialog => {
  console.log(dialog.message()); // Log alert message
  await dialog.accept(); // Accept alert (or dialog.dismiss() to cancel)
});

// Trigger alert
await page.click('#alert-button');
```

## 5. Browser Dialog Windows
```javascript
// Handle different types of dialogs (alert, confirm, prompt)
page.on('dialog', async dialog => {
  if (dialog.type() === 'prompt') {
    await dialog.accept('User input'); // Provide input for prompt
  } else if (dialog.type() === 'confirm') {
    await dialog.accept(); // Confirm dialog
  } else {
    await dialog.dismiss(); // Dismiss other dialogs
  }
});

// Trigger dialog
await page.click('#dialog-button');
```

## 6. Uploading a File
```javascript
// Single file upload
await page.locator('input[type="file"]').setInputFiles('path/to/file.txt');

// Multiple file upload
await page.locator('input[type="file"]').setInputFiles([
  'path/to/file1.txt',
  'path/to/file2.txt'
]);

// Clear file input
await page.locator('input[type="file"]').setInputFiles([]);
```

## 7. Re-using Authentication State
```javascript
// Save authentication state
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://example.com/login');
await page.fill('#username', 'user');
await page.fill('#password', 'pass');
await page.click('#login-button');
await context.storageState({ path: 'auth.json' }); // Save auth state

// Reuse authentication state
const newContext = await browser.newContext({ storageState: 'auth.json' });
const newPage = await newContext.newPage();
await newPage.goto('https://example.com/protected'); // Already logged in
```
