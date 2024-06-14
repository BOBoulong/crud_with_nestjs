export interface HttpResponse {
  statusCode: number;
  message: string;
  data?: any;
}

export function ok(message: string, data: any = null): HttpResponse {
  return {
    statusCode: 200,
    message,
    data,
  };
}

export function created(message: string, data: any = null): HttpResponse {
  return {
    statusCode: 201,
    message,
    data,
  };
}

export function badRequest(message: string, data: any = null): HttpResponse {
  return {
    statusCode: 400,
    message,
    data,
  };
}

export function unauthorized(message: string, data: any = null): HttpResponse {
  return {
    statusCode: 401,
    message,
    data,
  };
}

export function forbidden(message: string, data: any = null): HttpResponse {
  return {
    statusCode: 403,
    message,
    data,
  };
}

export function notFound(message: string, data: any = null): HttpResponse {
  return {
    statusCode: 404,
    message,
    data,
  };
}

export function internalServerError(
  message: string,
  data: any = null,
): HttpResponse {
  return {
    statusCode: 500,
    message,
    data,
  };
}
