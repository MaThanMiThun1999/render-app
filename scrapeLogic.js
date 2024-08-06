const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  console.log("Browser launchning with Puppeteer...");
  const browser = await puppeteer.launch({
    args: ["--disable-setuid-sandbox", "--no-sandbox", "--single-process", "--no-zygote"],
    headless: true,
    slowMo: 100,
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  console.log("Browser launched with Puppeteer...");
  try {
    const page = await browser.newPage();

    // Set user agent and viewport
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
    await page.setViewport({ width: 1280, height: 800 });

    // Set WebGL and plugins
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5],
      });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en"],
      });
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) => (parameters.name === "notifications" ? Promise.resolve({ state: Notification.permission }) : originalQuery(parameters));
    });

    console.log("Page created with Puppeteer...");
    console.log("Page navigated to https://www.naukri.com/nlogin/login...");
    // Load "https://www.naukri.com/nlogin/login"
    await page.goto("https://www.naukri.com/nlogin/login");

    console.log("Page navigated to https://www.naukri.com/nlogin/login...");

    // Resize window to 1366 x 607
    await page.setViewport({ width: 1366, height: 607 });

    console.log("Page resized to 1366 x 607...");
    console.log("Entering EmailID...");;
    // Fill "mathanrajmuruge... on <input> #usernameField
    await page.waitForSelector("#usernameField");

    await page.type("#usernameField", "mathanrajmurugesanupdate@gmail.com");
    console.log("EmailID entered...");


    console.log("Entering Password...");
    // Click on <input> #passwordField
    await page.waitForSelector("#passwordField");
    await page.click("#passwordField");

    // Fill "Mathan@1999" on <input> #passwordField
    await page.type("#passwordField", "Mathan@1999");


    console.log("Password entered...");

    console.log("Trying to Logging in...");
    // Click on <button> "Login"
    await page.waitForSelector(".blue-btn");
    await Promise.all([page.click(".blue-btn"), page.waitForNavigation()]);

    console.log("Logged in to Naukri...");

    console.log("Page navigating to https://www.naukri.com/mnjuser/profile...");
    // Click on <a> "Complete profile"\
    await page.waitForSelector('[href="/mnjuser/profile"]');
    await Promise.all([page.click('[href="/mnjuser/profile"]'), page.waitForNavigation()]);


    console.log("Page navigated to https://www.naukri.com/mnjuser/profile...");

    // Scroll wheel by X:0, Y:830
    await page.evaluate(() => window.scrollBy(0, 830));

    // Scroll wheel by X:0, Y:-4
    await page.evaluate(() => window.scrollBy(0, -4));

    // Scroll wheel by X:0, Y:1
    await page.evaluate(() => window.scrollBy(0, 1));

    // Scroll wheel by X:0, Y:-652
    await page.evaluate(() => window.scrollBy(0, -652));

    // Scroll wheel by X:0, Y:497
    await page.evaluate(() => window.scrollBy(0, 497));

    // Scroll wheel by X:0, Y:-27
    await page.evaluate(() => window.scrollBy(0, -27));

    console.log("Waiting for widgetHead Loading...");
    // Click on <span> "editOneTheme"
    await page.waitForSelector(".widgetHead > .edit");
    await Promise.all([page.click(".widgetHead > .edit"), page.waitForNavigation()]);

    console.log("WidgetHead loaded...");
    console.log("Loading Key Skills...");
    // Click on <input> #keySkillSugg
    await page.waitForSelector("#keySkillSugg");
    await page.click("#keySkillSugg");
    console.log("Key Skills loaded...");

    console.log("Loading Key Skills...");
    console.log("Typing Node js...");
    // Fill "Node js" on <input> #keySkillSugg
    await page.waitForSelector("#keySkillSugg:not([disabled])");
    await page.type("#keySkillSugg", "Node js");


    console.log("Key Skills typed...");

    console.log("Clicking on Node Js Framework...");
    // Click on <div> "Node Js Framework"
    await page.waitForSelector(".Sbtn");
    await page.click(".Sbtn");


    console.log("Node Js Framework clicked...");

    // Scroll wheel by X:0, Y:131
    await page.evaluate(() => window.scrollBy(0, 131));

    // Scroll wheel by X:0, Y:-44
    await page.evaluate(() => window.scrollBy(0, -44));

    // Scroll wheel by X:0, Y:253
    await page.evaluate(() => window.scrollBy(0, 253));

    console.log("Saving Key Skills...");
    // Click on <button> "Save"
    await page.waitForSelector("#saveKeySkills");
    await page.click("#saveKeySkills");


    console.log("Key Skills saved...");

    console.log("Closing Browser...");
    await browser.close();
    console.log("Browser closed...");
    res.send("Puppeteer is done!");
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
