const puppeteer = require('puppeteer');



const input = {

    name : 'SomeName'
    ,phone : '0587170171'
    ,mail : 'vovka.docs@gmail.com'
    ,company : 'SomeCompany'
    ,employees : '51-500'
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://contractorsinsurancereview.com/ExampleForm/');

  await page.click('#name');
  await page.keyboard.type(input.name);

  await page.click('#phone');
  await page.keyboard.type(input.phone);

  await page.click('#email');
  await page.keyboard.type(input.mail);

  await page.click('#company');
  await page.keyboard.type(input.company);


  const emp = await page.$$('#employees option');

  let empArr = []
  for(let i=0; i<emp.length; ++i)
  {
      empArr.push(await page.evaluate(e => e.textContent,emp[i]))
  }
  const empIndex = empArr.indexOf(input.employees);

  if(empIndex != -1)
  {
    await page.click('#employees');

    for(let i = 0; i < empIndex; ++i)
    {
        await page.keyboard.down('ArrowDown');
        await page.keyboard.up('ArrowDown');
    }

    await page.mouse.down();
    await page.mouse.up();
  }
  else
  {
      console.log('Option not found - keeping default')
  }

  

  await page.screenshot({path: 'input.png'});

 


  await page.click('button');
  
  try{
    res = await page.waitForNavigation({timeout : 8000});
  }
  catch(e){
    console.log('Taking too long - might be an error')
  }

const title = await page.title(); 

if(title == 'Thank You')
{
  console.log('Submitted successfully');
}

await page.screenshot({path: 'result.png'});

await browser.close();
})();
