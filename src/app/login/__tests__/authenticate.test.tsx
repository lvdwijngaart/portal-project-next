import { authenticate } from '../services/authenticate';
import { signIn } from '@/features/auth/auth';

// Mock the auth module
jest.mock('@/features/auth/auth', () => ({
  signIn: jest.fn(),
}));

// Use a factory function pattern for next-auth mock
jest.mock('next-auth', () => {
  return {
    AuthError: class AuthError extends Error {
      type: string;
      
      constructor(type: string) {
        super(`AuthError: ${type}`);
        this.name = 'AuthError';
        this.type = type;
      }
    }
  };
});

// Get the mocked AuthError for use in tests
const { AuthError } = jest.requireMock('next-auth');

describe('authenticate', () => {
  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call signIn with the correct parameters', async () => {
    // Setup
    const mockFormData = new FormData();
    mockFormData.append('email', 'test@example.com');
    mockFormData.append('password', 'password123');
    
    // Mock successful signIn
    (signIn as jest.Mock).mockResolvedValue(undefined);
    
    // Execute
    const result = await authenticate(undefined, mockFormData);
    
    // Verify
    expect(signIn).toHaveBeenCalledWith('credentials', mockFormData);
    expect(result).toBeUndefined();
  });

  it('should return "Invalid credentials" when CredentialsSignin error occurs', async () => {
    // Setup
    const mockFormData = new FormData();
    const credentialsError = new AuthError('CredentialsSignin');
    
    // Mock AuthError for invalid credentials
    (signIn as jest.Mock).mockRejectedValue(credentialsError);
    
    // Execute
    const result = await authenticate(undefined, mockFormData);
    
    // Verify
    expect(result).toBe('Invalid credentials');
  });

  it('should return "Something went wrong" when other AuthError occurs', async () => {
    // Setup
    const mockFormData = new FormData();
    const otherAuthError = new AuthError('OAuthAccountNotLinked');
    
    // Mock some other AuthError
    (signIn as jest.Mock).mockRejectedValue(otherAuthError);
    
    // Execute
    const result = await authenticate(undefined, mockFormData);
    
    // Verify
    expect(result).toBe('Something went wrong');
  });

  it('should rethrow non-AuthError exceptions', async () => {
    // Setup
    const mockFormData = new FormData();
    const generalError = new Error('Network error');
    
    // Mock a general error
    (signIn as jest.Mock).mockRejectedValue(generalError);
    
    // Execute & Verify
    await expect(authenticate(undefined, mockFormData)).rejects.toThrow('Network error');
  });
});