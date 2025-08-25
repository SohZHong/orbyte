export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function jsonResponse<T>(
  body: ApiResponse<T>,
  status: number = 200
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function success<T>(data: T, status = 200) {
  return jsonResponse({ success: true, data }, status);
}

export function fail(error: string, status = 400) {
  return jsonResponse({ success: false, error }, status);
}
