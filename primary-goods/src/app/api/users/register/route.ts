import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { User } from '../../../../models/User';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().nonempty("Nama wajib diisi"),
  username: z.string().nonempty("Username wajib diisi"),
  email: z.string().email("Format email tidak valid").nonempty("Email wajib diisi"),
  password: z.string().min(5, "Password minimal 5 karakter")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ success: false, message: result.error.errors.map(e => e.message) }, { status: 400 });
    }

    const { name, username, email, password } = result.data;

    const { isEmailUnique, isUsernameUnique } = await User.isEmailOrUsernameUnique(email, username);
    
    if (!isEmailUnique) {
      return NextResponse.json({ success: false, message: ['Email sudah digunakan'] }, { status: 400 });
    }

    if (!isUsernameUnique) {
      return NextResponse.json({ success: false, message: ['Username sudah digunakan'] }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = {
      name,
      username,
      email,
      password: hashedPassword,
    };

    const userId = await User.createUser(newUser);

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan saat registrasi', error }, { status: 500 });
  }
}
