import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ namespace: string; name: string }> },
) {
  const { namespace, name } = await params;
  return NextResponse.json({
    namespace,
    name,
    files: [],
    dependencies: [],
  });
}
