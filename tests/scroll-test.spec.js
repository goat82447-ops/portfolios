const { test, expect } = require('@playwright/test');

test('Resume page scroll from top to bottom', async ({ page }) => {
  // Open the resume page
  await page.goto('file:///c:/PORT/index.html');
  console.log('Page loaded successfully');
  
  // Wait for network to be idle
  await page.waitForLoadState('networkidle');
  
  // Get total scroll height
  const scrollHeight = await page.evaluate(() => {
    return document.documentElement.scrollHeight;
  });
  
  console.log('Total scroll height: ' + scrollHeight + 'px');
  
  // Scroll to the very top
  await page.evaluate(() => window.scrollTo(0, 0));
  console.log('Scrolled to TOP of page');
  await page.waitForTimeout(500);
  
  // Scroll down gradually in steps
  const stepSize = 250;
  let currentPosition = 0;
  
  while (currentPosition < scrollHeight) {
    await page.evaluate((pos) => {
      window.scrollTo(0, pos);
    }, currentPosition);
    
    console.log('Position: ' + currentPosition + 'px');
    currentPosition += stepSize;
    await page.waitForTimeout(300);
  }
  
  // Scroll to the absolute bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  console.log('Scrolled to BOTTOM of page');
  await page.waitForTimeout(800);
  
  // Verify we can scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  console.log('Scrolled back to TOP');
  
  // Assert the page has content
  const bodyContent = await page.evaluate(() => document.body.innerHTML.length);
  expect(bodyContent).toBeGreaterThan(0);
  console.log('Test completed successfully');
});
