import { db } from '../lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

async function testFirebase() {
  try {
    console.log('Attempting to connect to Firebase...');
    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Hello Firebase!',
      timestamp: new Date(),
    });
    console.log('✅ Firebase connected! Document ID:', docRef.id);
    console.log('Please check your Firestore `test` collection to confirm the document was created.');
  } catch (error) {
    console.error('❌ Firebase error:', error);
  }
}

testFirebase();
