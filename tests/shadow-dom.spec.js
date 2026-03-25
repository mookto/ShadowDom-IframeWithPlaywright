const { test, expect } = require('@playwright/test');

test('Shadow DOM and Nested Iframe Automation', async ({ page }) => {
    // 1. Navigation
    await page.goto('https://selectorshub.com/xpath-practice-page/');



    // --- 1. Fill 'Username' (Open Shadow Root Level 1) ---
    // Playwright automatically finds #kils inside the shadow root
    await page.locator('#kils').fill('MyUsername');

    // --- 2. Fill 'Enter pizza name' (Nested Open Shadow Root) ---
    // Multiple shadow level holeo Playwright direct khuje pabe
    await page.locator('#pizza').fill('Chicken Pizza');

    // --- 3. Fill 'Concept Test' (Closed Shadow Root - The Tab Trick) ---
    // Closed root-er khetre Playwright-eo amader click + tab strategy nite hobe
    await page.locator('#concepts').click();
    await page.keyboard.press('Tab');
    await page.keyboard.type('Automation is Fun!');

    console.log('All three fields on first page filled!');

    // --- 4. Navigate to Iframe Page ---
    await page.locator('//a[contains(text(),"Click to practice iframe inside shadow dom scenari")]').click();
    
    // Playwright automatically waits for navigation, but safety-r jonno wait kora bhalo
    await page.waitForURL('**/iframe-in-shadow-dom/');

    // --- 5. Access Iframe in Shadow DOM (Nested Iframes) ---
    // Selenium-er moto switchTo() dorkar nei. Amra frameLocator use korbo.
    
    // Frame 1 is inside Shadow DOM
    const frame1 = page.frameLocator('#pact1');
    await frame1.locator('#jex').fill('Automation Love');

    // Frame 3 is inside Frame 1
    const frame3 = frame1.frameLocator('#pact3');
    await frame3.locator('#glaf').fill('Automation Love 2');

    // --- 6. Back from Iframe and access Closed Shadow DOM again ---
    // Playwright-e context switch korte hoy na, tai amra shorasori page level-e kaj korte pari
    await page.locator('#concepts').click();
    await page.keyboard.press('Tab');
    await page.keyboard.type('Automation is Fun! again');

    // Manual Wait for visual confirmation (Optional)
    await page.waitForTimeout(2000);

    await page.goto('https://selectorshub.com/iframe-scenario/');

    // Locate the frame and the input field inside it
    // Playwright handles the synchronization automatically
    const firstCrushFrame = page.frameLocator('#pact1').first();
    const inputField = firstCrushFrame.locator('#inp_val');

    // Fill the text
    await inputField.fill('Senior QA Engineer');

    const currentCrushFrame=firstCrushFrame.frameLocator('#pact2');
        const inputField2 = currentCrushFrame.locator('#jex');
        await inputField2.fill('BYSL');


    console.log('Text sent successfully in Playwright!');


});