import jwt from 'jsonwebtoken';

export const getUserId = async (): Promise<string | null> => {
    const token = '';
    if (!token) return null;

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};
