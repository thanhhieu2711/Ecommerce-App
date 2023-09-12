// import NextAuth from 'next-auth';
// // import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// import Credentials from 'next-auth/providers/credentials';
// import prisma from '@/services/prisma/prismaDB';
// import toast from 'react-hot-toast';
// import bcrypt from 'bcrypt';
// export default NextAuth({
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         // GoogleProvider({
//         //   clientId: process.env.GOOGLE_CLIENT_ID,
//         //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         // }),
//         Credentials({
//             name: 'credentials',
//             credentials: {
//                 email: {
//                     label: 'email',
//                     type: 'text',
//                 },
//                 password: {
//                     label: 'password',
//                     type: 'password',
//                 },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials.password) {
//                     throw new Error('Invalid account');
//                 }

//                 const user = await prisma.user.findUnique({
//                     where: {
//                         email: credentials?.email,
//                     },
//                 });

//                 if (!user) {
//                     throw new Error('Invalid account');
//                 }

//                 const isCorrectPassword = bcrypt.compareSync(
//                     credentials.password,
//                     user.password
//                 );

//                 if (!isCorrectPassword) {
//                     throw new Error('Invalid password');
//                 }
//                 return user;
//             },
//         }),
//     ],
//     pages: {
//         signIn: '/login',
//     },
//     debug: process.env.NODE_ENV === 'development',
//     session: {
//         strategy: 'jwt',
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// });
