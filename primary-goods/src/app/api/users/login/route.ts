import { NextResponse } from 'next/server';
import { database } from '../../../../db/config'
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const usersCollection = database.collection('users');

  const user = await usersCollection.findOne({ email });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return NextResponse.json({ token });
}
