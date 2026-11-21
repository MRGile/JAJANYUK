export function notImplemented() {
  return Response.json(
    {
      error:
        'Authentication required. This endpoint will be enabled after auth is implemented.',
    },
    { status: 501 }
  );
}

export function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

export function notFound(message = 'Not found') {
  return Response.json({ error: message }, { status: 404 });
}

export function serverError(message = 'Internal server error') {
  return Response.json({ error: message }, { status: 500 });
}

export function ok<T>(data: T, status = 200) {
  return Response.json({ data }, { status });
}
