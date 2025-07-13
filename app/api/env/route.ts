export async function GET() {
  return Response.json({ env: process.env });
}
