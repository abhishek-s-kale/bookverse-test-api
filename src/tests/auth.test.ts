import { registerSchema } from '../routes/auth.ts';


describe('registerSchema', () => {
    it('should validate a correct payload', () => {
        const payload = {
            userName: 'validUser',
            email: 'user@example.com',
            password: 'strongpassword'
        };
        const result = registerSchema.safeParse(payload);
        expect(result.success).toBe(true);
    });

    it('should fail if userName is too short', () => {
        const payload = {
            userName: 'ab',
            email: 'user@example.com',
            password: 'strongpassword'
        };
        const result = registerSchema.safeParse(payload);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].path).toContain('userName');
    });

    it('should fail if email is invalid', () => {
        const payload = {
            userName: 'validUser',
            email: 'not-an-email',
            password: 'strongpassword'
        };
        const result = registerSchema.safeParse(payload);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].path).toContain('email');
    });

    it('should fail if password is too short', () => {
        const payload = {
            userName: 'validUser',
            email: 'user@example.com',
            password: 'short'
        };
        const result = registerSchema.safeParse(payload);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].path).toContain('password');
    });
});