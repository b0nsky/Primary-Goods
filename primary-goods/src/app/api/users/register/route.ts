import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { User } from '../../../../models/User';

export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json();

    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 });
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
    return NextResponse.json({ success: false, message: 'Error registering user', error }, { status: 500 });
  }
}
