const fetch = require('node-fetch');

async function testRecyclers() {
  try {
    const response = await fetch('http://localhost:3000/api/recyclers');
    const result = await response.json();
    console.log('Recyclers result:', result);

    if (result.success) {
      console.log('Found', result.recyclers.length, 'recyclers');
      result.recyclers.forEach(recycler => {
        console.log('Recycler:', recycler.business_name, 'Pincode:', recycler.pincode);
      });
    } else {
      console.log('Failed to get recyclers:', result.error);
    }
  } catch (error) {
    console.error('Error testing recyclers:', error);
  }
}

testRecyclers();
