import os
import django
from django.test import TestCase
from firebase_admin import auth
from .firebase_config import initialize_firebase

# Set up Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'skillswap_backend.settings')
django.setup()

# Initialize Firebase Admin SDK
initialize_firebase()

class FirebaseAuthTest(TestCase):
    def setUp(self):
        self.test_email = f'test{os.urandom(4).hex()}@example.com'
        self.test_password = 'TestPass123!'

    def test_firebase_admin_connection(self):
        """Test that Firebase Admin SDK can list users"""
        try:
            # Try to list users (limited to 1)
            page = auth.list_users().get_page(1)
            print('✓ Successfully connected to Firebase Admin SDK')
            print(f'✓ Found {len(list(page))} user(s)')
        except Exception as e:
            print('❌ Failed to connect to Firebase Admin SDK:', str(e))
            raise

    def test_verify_token(self):
        """Test token verification (this will fail without a valid token)"""
        print('\nNote: Token verification test requires a valid Firebase ID token.')
        print('This test is expected to fail if you don\'t provide a real token.')
        
        try:
            # This is an invalid token format, should raise an error
            fake_token = 'invalid_token'
            auth.verify_id_token(fake_token)
            print('❌ Test should have failed with invalid token')
        except auth.InvalidIdTokenError:
            print('✓ Successfully detected invalid token')
        except Exception as e:
            print('❌ Unexpected error:', str(e))
            raise

if __name__ == '__main__':
    print('Starting Firebase Admin SDK Tests...\n')
    
    test = FirebaseAuthTest()
    test.setUp()
    
    print('1. Testing Firebase Admin SDK Connection:')
    test.test_firebase_admin_connection()
    
    print('\n2. Testing Token Verification:')
    test.test_verify_token()
    
    print('\nTests completed!')
