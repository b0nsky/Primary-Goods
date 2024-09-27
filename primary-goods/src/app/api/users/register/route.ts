import { NextResponse } from 'next/server';
import { database } from '../../../../db/config'
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  const { name, username, email, password } = await request.json();

  const hashedPassword = await hash(password, 10);

  const usersCollection = database.collection('users');
  
  const result = await usersCollection.insertOne({
    name,
    username,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ success: true, userId: result.insertedId });
}
