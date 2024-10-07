import { test, expect, Locator } from '@playwright/test';

const file_path = "/home/nasir/Documents/projects/toolsQA/tests/upload.png";

test("Practice Form", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form/", {waitUntil: "domcontentloaded"});

  // locators
  const firstName = page.locator("#firstName");
  const lastName = page.locator("#lastName");
  const email = page.locator("#userEmail");
  const genderMale = page.locator("#gender-radio-1");
  const genderFemale = page.locator("#gender-radio-2");
  const genderOther = page.locator("#gender-radio-3");
  const mobile = page.locator("#userNumber");
  const dateOfBirth = page.locator("#subjectsInput");
  const subject_input_field = page.locator("#subjectsInput");
  const subject_list = page.locator(
    "//div[contains(@class,'subjects-auto-complete__menu-list')]/div"
  );
  const sportsHobbies = page.locator("#hobbies-checkbox-1");
  const readingHobbies = page.locator("#hobbies-checkbox-2");
  const musicHobbies = page.locator("#hobbies-checkbox-3");
  const picture = page.locator("#uploadPicture");
  const currentAddress = page.locator("#currentAddress");
  const state_input_field = page.locator(
    "//div[text()='Select State']/following-sibling::div//input"
  );
  const state_list = page.locator("//div[@id='state']/div[contains(@class,'menu')]/div/div")
  const city_input_field = page.locator(
    "//div[text()='Select City']/following-sibling::div//input"
  );
  const city_list = page.locator("//div[@id='city']/div[contains(@class,'menu')]/div/div")
  const submit = page.locator("#submit");
  const thanksModal = page.locator("//div[contains(text(),'Thanks for submitting')]")
  const closeThanksModal = page.locator("#closeLargeModal")

  // function to handle any list
  async function handleList(list: Locator, inputField: Locator, value: string) {
    if (inputField == subject_input_field) {
      await inputField.fill(value);
      await list.waitFor({state: 'visible'});
      const listOfSubjects = await subject_list.all();
      for (const subject of listOfSubjects) {
        if (await subject.textContent() === value) {
          await subject.click();
          break;
        }
      }
    }else if (inputField == state_input_field) {
      await inputField.fill(value);
      await list.waitFor({state: 'visible'});
      const listOfStates = await state_list.all();
      for (const state of listOfStates) {
        if (await state.textContent() === value) {
          await state.click();
          break;
        }
      }
    }else if (inputField == city_input_field) {
      await inputField.fill(value);
      await list.waitFor({state: 'visible'});
      const listOfCities = await city_list.all();
      for (const city of listOfCities) {
        if (await city.textContent() === value) {
          await city.click();
          break;
        }
      }
    }
  }

  // Fill the form
  await firstName.fill("John");
  await lastName.fill("Doe");
  await email.fill("john.doe@example.com");
  await genderMale.click({force: true});
  await mobile.fill("1234567890");
  await handleList(subject_list, subject_input_field, "Maths");
  await sportsHobbies.click({force: true});
  await readingHobbies.click({force: true});
  await musicHobbies.click({force: true});
  await picture.setInputFiles(file_path);
  await currentAddress.fill("1234 Main St, Anytown, USA");
  await handleList(state_list, state_input_field, "NCR");
  await handleList(city_list, city_input_field, "Delhi");
  await submit.click();

  // Assertions
  await thanksModal.waitFor({state: 'visible'});
  await closeThanksModal.click();
});

