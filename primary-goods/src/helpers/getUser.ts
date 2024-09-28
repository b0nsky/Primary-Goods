import jwt, { JwtPayload } from 'jsonwebtoken';

export const getUserId = async (): Promise<string | null> => {
    const token = '';
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload | string;

        if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
            return (decoded as JwtPayload).userId as string;
        }

        return null;
    } catch {
        return null;
    }
};
