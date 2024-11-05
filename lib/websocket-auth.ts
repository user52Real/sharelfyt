import { verify } from 'jsonwebtoken'
import { Socket } from 'socket.io'

export interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export async function authenticateSocket(
  socket: AuthenticatedSocket,
  next: (err?: Error) => void
) {
  try {
    const token = socket.handshake.auth.token || socket.handshake.query.token;

    if (!token) {
      throw new Error('Authentication required')
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured')
    }   

    const decoded = verify(token, process.env.JWT_SECRET)
    socket.userId = (decoded as AuthenticatedSocket).userId

    next()
  } catch (error) {
    next(new Error('Authentication failed'))
  }
}