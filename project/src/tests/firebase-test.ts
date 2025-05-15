import { auth } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    deleteUser,
    signOut
} from 'firebase/auth';

// Test email and password
const testEmail = `test${Date.now()}@example.com`;
const testPassword = 'TestPass123!';

async function testFirebaseAuth() {
    console.log('Starting Firebase Authentication Test...');
    console.log(`Test email: ${testEmail}`);

    try {
        // Test user creation
        console.log('\n1. Testing user creation...');
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('✓ User created successfully');

        // Get the user
        const user = userCredential.user;
        console.log('User ID:', user.uid);
        console.log('Email verified:', user.emailVerified);

        // Test email verification sending
        console.log('\n2. Testing email verification sending...');
        await sendEmailVerification(user);
        console.log('✓ Verification email sent successfully');

        // Test sign out
        console.log('\n3. Testing sign out...');
        await auth.signOut();
        console.log('✓ Signed out successfully');

        // Test sign in
        console.log('\n4. Testing sign in...');
        const signInResult = await signInWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('✓ Signed in successfully');

        // Clean up - delete test user
        console.log('\n5. Cleaning up - deleting test user...');
        await deleteUser(signInResult.user);
        console.log('✓ Test user deleted successfully');

        console.log('\nAll tests passed successfully! ✓');
    } catch (error) {
        console.error('\n❌ Test failed:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
    }
}

// Run the test
testFirebaseAuth();
