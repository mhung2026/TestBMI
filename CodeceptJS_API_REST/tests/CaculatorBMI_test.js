Feature('BMI Calculation API');


Scenario('Valid Input for an Adult', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 70,
    height: 175,
    age: 25,
    gender: true
  });
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    message: 'BMI calculation successful',
    weight: 70,
    height: 175,
    gender: 'Male',
    age: 25,
    bmiValue: 22.86,
    category: 'Normal'
  });
  console.log(response.statusText)
});

Scenario('Valid Input for a Child', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 20,
    height: 110,
    age: 5,
    gender: false
  });
  
  I.seeResponseCodeIs(200);
  I.seeResponseContainsJson({
    message: 'BMI calculation successful',
    weight: 20,
    height: 110,
    gender: 'Female',
    age: 5,
    bmiValue: 16.53,
    category: 'Healthy weight'
  });
  console.log(response.statusText)
});

Scenario('Missing Age', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 70,
    height: 175,
    gender: true
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Please provide an age between 2 and 120'
  });
  console.log(response.statusText)
});

Scenario('Age Out of Range (Too Young)', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 10,
    height: 85,
    age: 1,
    gender: false
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Input data for Age is out of range!'
  });
  console.log(response.statusText)

});

Scenario('Age Out of Range (Too Old)', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 50,
    height: 160,
    age: 125,
    gender: true
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Input data for Age is out of range!'
  });
  console.log(response.statusText)

});

Scenario('Invalid Input (Negative Weight)', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: -70,
    height: 175,
    age: 30,
    gender: true
  });
  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Weight and height must be greater than 0.'
  });
  console.log(response.statusText)

});

Scenario('Invalid Input (Zero Height)', async ({ I }) => {
  const response = await I.sendPostRequest('/calculateBMI', {
    weight: 70,
    height: 0,
    age: 30,
    gender: true 
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    error: 'Weight and height must be greater than 0.'
  });
  console.log(response.statusText)
});

// Scenario('Null BMI DTO', async ({ I }) => {
//   const response = await I.sendPostRequest('/calculateBMI', null);
//   I.seeResponseCodeIs(400);
//   I.seeResponseContainsJson({
//     error: 'BMI DTO cannot be null.'
//   });
// });
