import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../../../models/User';

export async function POST(request: Request) {
  const { emailOrUsername, password } = await request.json();

  const user = await User.findOne(emailOrUsername);

  if (!user) {
    return NextResponse.json({ error: 'Invalid Email / Password' }, { status: 404 })
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid Email / Password' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return NextResponse.json({ token });
}
