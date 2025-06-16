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

## 8. Locator Strategies
```javascript
// Text content
await page.locator('text=Submit').click();
await page.locator(':text("Submit")').click();
await page.getByText('Submit').click();

// Role
await page.getByRole('button').click();
await page.getByRole('button', { name: 'Submit' }).click();

// Test ID
await page.getByTestId('submit-button').click();

// Placeholder
await page.getByPlaceholder('Enter your name').fill('John');

// Label
await page.getByLabel('Password').fill('secret');

// CSS selectors
await page.locator('#id').click();
await page.locator('.class').click();
await page.locator('[data-test="submit"]').click();

// XPath
await page.locator('xpath=//button[contains(text(), "Submit")]').click();
```

## 9. Dropdown Operations
```javascript
// Select by value
await page.selectOption('select#dropdown', 'value1');

// Select by label
await page.selectOption('select#dropdown', { label: 'Option 1' });

// Select by index
await page.selectOption('select#dropdown', { index: 1 });

// Multiple select
await page.selectOption('select#multiple', ['value1', 'value2']);

// Get selected options
const selectedValues = await page.locator('select#dropdown').evaluate((el) => {
  return Array.from(el.selectedOptions).map(option => option.value);
});

const selectedText = await page.locator('select#dropdown').evaluate((el) => {
  return Array.from(el.selectedOptions).map(option => option.text);
});
```

## 10. Scrolling Operations
```javascript
// Scroll element into view
await page.locator('.element').scrollIntoViewIfNeeded();

// Scroll to bottom of page
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

// Scroll to top of page
await page.evaluate(() => window.scrollTo(0, 0));

// Scroll by coordinates
await page.evaluate(() => window.scrollBy(0, 100)); // Scroll down 100px
await page.evaluate(() => window.scrollBy(-100, 0)); // Scroll left 100px

// Auto-scroll element
await page.locator('.scrollable-element').evaluate(el => {
  el.scrollTop = el.scrollHeight;
});
```

## 11. Navigation Commands
```javascript
// Navigate to URL
await page.goto('https://example.com');

// Refresh page
await page.reload();

// Go back
await page.goBack();

// Go forward
await page.goForward();

// Wait for navigation after action
await Promise.all([
  page.waitForNavigation(),
  page.click('a.nav-link')
]);
```

## 12. iFrame Handling
```javascript
// Get iframe
const frame = page.frameLocator('#iframe-id');

// Interact with elements inside iframe
await frame.locator('.button-in-iframe').click();
await frame.locator('#input-in-iframe').fill('text');

// Wait for iframe to load
await frame.locator('body').waitFor();

// Get frame by URL
const frameByUrl = page.frameLocator('iframe[src="/iframe-page"]');

// Switch to frame and perform actions
await frameByUrl.locator('#element-in-frame').click();
```

## 13. Advanced Waiting Strategies
```javascript
// Wait for element
await page.locator('.element').waitFor();

// Wait for element to be visible
await page.locator('.element').waitFor({ state: 'visible' });

// Wait for element to be hidden
await page.locator('.element').waitFor({ state: 'hidden' });

// Wait for network idle
await page.waitForLoadState('networkidle');

// Wait for specific response
await page.waitForResponse(response => 
  response.url().includes('/api/data') && response.status() === 200
);

// Custom timeout
await page.locator('.element').waitFor({ timeout: 10000 }); // 10 seconds
```

## 14. Keyboard and Mouse Actions
```javascript
// Press single key
await page.keyboard.press('Enter');

// Key combinations
await page.keyboard.press('Control+A');
await page.keyboard.press('Control+C');

// Type text
await page.keyboard.type('Hello World');

// Mouse hover
await page.hover('.element');

// Double click
await page.dblclick('.element');

// Right click
await page.click('.element', { button: 'right' });

// Drag and drop
await page.dragAndDrop('#source', '#target');
```
