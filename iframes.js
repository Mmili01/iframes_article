// import puppeteer from "puppeteer";

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()

//   await page.goto("http://127.0.0.1:5500/index.html", {waitUntil:"networkidle2"})

//   const frames =  page.frames()
//   // const firstFrame = frames.find((frame) => frame.name() === "D8A3BE721FA01FCE778F2B04A091AEF0" )
//   // console.log(firstFrame);
//   console.log(frames);
// });
// import puppeteer from "puppeteer";

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // Navigate to the webpage
//   try {
//     await page.goto("https://zoom.us/", {
//       waitUntil: "networkidle2",
//     });
//   } catch (error) {
//     console.error("Error while navigating:", error);
//     return await browser.close();
//   }

//   const frames = page.frames()
//   console.log(frames)})


 import puppeteer from "puppeteer";

 (async () => {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();

   // Navigate to the webpage
   await page.goto("http://127.0.0.1:5500/index.html");

  //  const frames = page.frames()
  //  console.log(frames);

   //search for frames on the webpage
   const firstIframe = await page.$("body > iframe > body");
  //  console.log(firstIframe);

   //create a container to hold the content of the frames
   const contentOfFrame = await firstIframe.contentFrame();
   //extracting the title of the content of the frame and printing it to the console
   const title = await contentOfFrame.$eval("h1", (el) => el.innerText);
  //  console.log(title);

   // extracting the text on the frame and printing it to the console
   const text = await contentOfFrame.$eval("p", (el) => el.innerText);
  //  console.log(text);

  //  const secondFrame = await page.$("body > iframe #loginForm")

  //  const seconFramecontent = await secondFrame.contentFrame()

   const details = await contentOfFrame.$eval("h1", (el) => el.innerText)
   console.log(details);

   await contentOfFrame.click("a:contains('More information...')");
   //closing the browser
  //  await browser.close();
 })();