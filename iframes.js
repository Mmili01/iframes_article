import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the webpage
  await page.goto("http://127.0.0.1:5500/index.html");


  //FIRST FRAME
  const firstIframe = await page.$("body iframe[name=example]");
  const contentOfFirstFrame = await firstIframe.contentFrame();

  //FIRST FRAME CONTENTS
  const title = await contentOfFirstFrame.$eval("h1", (el) => el.innerText);
  const text = await contentOfFirstFrame.$eval("p", (el) => el.innerText);

  console.log(title);
  console.log(text);

  //FIRST FRAME END

  //SECOND FRAME
  const secondFrame = await page.$("body iframe[name=form]");
  const contentOfSecondFrame = await secondFrame.contentFrame();

  //PROPAGATE DATA
  await contentOfSecondFrame.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    const dummyData = {
      'username': 'Dummy-User-',
      'password': "Dummy-Password-"
    }
    x = 0;
    inputs.forEach(input => {
      input.value = `${dummyData[input.name]}${x}`
    });
  });

  console.log(await contentOfSecondFrame.$eval('#loginMessage', (el) => el.innerText))

  //READ DATA
  const secondTitle = await contentOfSecondFrame.$eval("h1", (el) => el.innerText);
  const inputData = await contentOfSecondFrame.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    const data = {};
    inputs.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  });

  await contentOfSecondFrame.click('#thisButton');

  console.log(secondTitle);
  console.log("Form Data", inputData);
  console.log(await contentOfSecondFrame.$eval('#loginMessage', (el) => el.innerText ?? "Not data"))

  //SECOND FRAME END

  await browser.close();
})();
