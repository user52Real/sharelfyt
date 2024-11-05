import { Server } from "socket.io";
import { NextResponse } from "next/server";
//import { authenticateSocket } from "@/lib/auth";
import { cors } from '@/lib/cors'
import { authenticateSocket, AuthenticatedSocket } from '@/lib/websocket-auth'
import { APIError } from "@/lib/error-handling/api-error";

let io: Server | null = null;

export async function GET(request: Request) {
    try {
      // Apply CORS
      const corsResponse  = await cors(
        request,
        new NextResponse(),
        ['GET', 'POST'],
        process.env.ALLOWED_ORIGINS?.split(',') ?? []
      )
      
      if (corsResponse ) return corsResponse
  
      if (!io) {
        io = new Server({
          cors: {
            origin: process.env.ALLOWED_ORIGINS?.split(','),
            methods: ['GET', 'POST'],
            credentials: true,
          },
          path: '/api/socket',
          addTrailingSlash: false,
          transports: ['websocket'],
          pingTimeout: 60000,
          pingInterval: 25000,
        })
  
        // Add authentication middleware
        io.use(authenticateSocket)
  
        io.on('connection', (socket: AuthenticatedSocket) => {
          console.log('Authenticated client connected:', socket.userId)
  
          socket.on('message', (message: string) => {
            io?.emit('message', {
              userId: socket.userId,
              message,
              timestamp: new Date().toISOString()
            })
          })
  
          socket.on('error', (error) => {
            console.error('Socket error:', error)
          })
  
          socket.on('disconnect', (reason) => {
            console.log('Client disconnected:', socket.userId, 'Reason:', reason)
          })
        })
      }
  
      return new NextResponse('WebSocket server is running', { status: 200 })
    } catch (error) {
      console.error('WebSocket initialization error:', error)
      return new NextResponse('Failed to start WebSocket server', { status: 500 })
    }
}

export async function POST(request: Request) {
  try {
    if (!io) {
      throw APIError.Internal('Socket server not initialized');
    }

    const data = await request.json();
    io.emit("message", data.message);

    return new NextResponse("Message sent", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error processing message", {
      status: 500,
    });
  }
}


export const runtime = 'edge';