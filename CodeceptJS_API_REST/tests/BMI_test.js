Feature('BMI Calculator');

// Test Case 1: Validate BMI Calculation with Valid Inputs
Scenario('Valid Input for an Adult', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    height: 180,
    age: 25,
    gender: true
  });
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    message: 'BMI calculation successful',
    weight: 75,
    height: 180,
    gender: 'Male',
    age: 25,
    bmiValue: 23.15,
    category: 'Normal'
  });
  console.log(response.statusText, response.data);
});

// Test Case 2: Test the Age Field at the Upper Threshold
Scenario('Age Field Upper Threshold', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    height: 180,
    age: 120,
    gender: true
  });
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    message: 'BMI calculation successful',
    weight: 75,
    height: 180,
    gender: 'Male',
    age: 120,
    bmiValue: 23.15,
    category: 'Normal'
  });
  console.log(response.statusText, response.data);
});

// Test Case 3: Test the Age Field at the Lower Threshold
Scenario('Age Field Lower Threshold', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    height: 180,
    age: 20,
    gender: true
  });
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    message: 'BMI calculation successful',
    weight: 75,
    height: 180,
    gender: 'Male',
    age: 20,
    bmiValue: 23.15,
    category: 'Normal'
  });
  console.log(response.statusText, response.data);
});

// Test Case 4: Test with the Age Field Left Blank
Scenario('Age Field Left Blank', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    height: 180,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Please provide an age between 2 and 120'
  });
  console.log(response.statusText, response.data);
});

// Test Case 5: Test Age Value Above the Acceptable Range
Scenario('Age Above Acceptable Range', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    height: 180,
    age: 150,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Input data for Age is out of range!'
  });
  console.log(response.statusText, response.data);
});

// // Test Case 6: Test Age Value Below the Acceptable Range
Scenario('Age Below Acceptable Range', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    height: 180,
    age: 1,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Input data for Age is out of range!'
  });
  console.log(response.statusText, response.data);
});

// Test Case 7: Test with the Height Field Left Blank
Scenario('Height Field Left Blank', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    age: 25,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Please provide height'
  });
  console.log(response.statusText, response.data);
});

// Test Case 8: Test Height Value Set to Zero
Scenario('Height Value Zero', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    height: 0,
    age: 25,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Weight and height must be greater than 0.'
  });
  console.log(response.statusText, response.data);
});

// Test Case 9: Test Height Value Set to a Negative Number
Scenario('Negative Height Value', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 75,
    height: -10,
    age: 25,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Weight and height must be greater than 0.'
  });
  console.log(response.statusText, response.data);
});

// Test Case 10: Test with the Weight Field Left Blank
Scenario('Weight Field Left Blank', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    height: 180,
    age: 25,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Please provide weight'
  });
  console.log(response.statusText, response.data);
});

// Test Case 11: Test Weight Value Set to Zero
Scenario('Weight Value Zero', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 0,
    height: 180,
    age: 25,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Weight and height must be greater than 0.'
  });
  console.log(response.statusText, response.data);
});

// Test Case 12: Test Weight Value Set to a Negative Number
Scenario('Negative Weight Value', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: -10,
    height: 180,
    age: 25,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Weight and height must be greater than 0.'
  });
  console.log(response.statusText, response.data);
});

// Test Case 13: Validate "Clear" Button Functionality
// Scenario('Clear Button Functionality', async ({ I }) => {
//   I.fillField('age', '25');
//   I.fillField('height', '180');
//   I.fillField('weight', '75');
//   I.click('Clear');
//   I.seeInField('age', '');
//   I.seeInField('height', '');
//   I.seeInField('weight', '');
//   console.log('Clear button functionality validated');
// });

// Test Case 14: Validate BMI Calculation for Adults
Scenario('BMI Calculation for Adults', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 70,
    height: 165,
    age: 30,
    gender: false // Assuming false represents 'Female'
  });
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    message: 'BMI calculation successful',
    weight: 70,
    height: 165,
    gender: 'Female',
    age: 30,
    bmiValue: 25.71,
    category: 'Overweight'
  });
  console.log(response.statusText, response.data);
});

// Test Case 15: Validate BMI Calculation for Children
Scenario('BMI Calculation for Children', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 40,
    height: 140,
    age: 10,
    gender: true
  });
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    message: 'BMI calculation successful',
    weight: 40,
    height: 140,
    gender: 'Male',
    age: 10,
    bmiValue: 20.41,
    category: 'At risk of overweight'
  });
  console.log(response.statusText, response.data);
});
