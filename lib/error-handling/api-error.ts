export class APIError extends Error {
    constructor(
      public message: string,
      public statusCode: number,
      public code: string,
      public errors?: Record<string, string[]>
    ) {
      super(message);
      this.name = 'APIError';
    }
  
    static BadRequest(message: string, errors?: Record<string, string[]>) {
      return new APIError(message, 400, 'BAD_REQUEST', errors);
    }
  
    static Unauthorized(message = 'Unauthorized') {
      return new APIError(message, 401, 'UNAUTHORIZED');
    }
  
    static NotFound(message = 'Resource not found') {
      return new APIError(message, 404, 'NOT_FOUND');
    }
  
    static TooManyRequests(message = 'Rate limit exceeded') {
      return new APIError(message, 429, 'TOO_MANY_REQUESTS');
    }
  
    static Internal(message = 'Internal server error') {
      return new APIError(message, 500, 'INTERNAL_SERVER_ERROR');
    }
}