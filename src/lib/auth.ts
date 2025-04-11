import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "object" && decoded !== null) {
      return decoded as JwtPayload;
    }
    return null;
  } catch {
    return null;
  }
}

export async function authMiddleware(req: NextRequest): Promise<NextResponse> {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId || !decoded.role) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId as string);
    requestHeaders.set("x-user-role", decoded.role as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    console.error("Auth middleware error:", err);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}

export async function adminMiddleware(): Promise<NextResponse> {
  try {
    // Allow all authenticated users for now
    return NextResponse.next();

    // Future logic (uncomment when needed):
    /*
    const userRole = req.headers.get("x-user-role");

    if (userRole !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    return NextResponse.next();
    */
  } catch (err) {
    console.error("Admin middleware error:", err);
    return NextResponse.json(
      { error: "Authorization failed" },
      { status: 403 }
    );
  }
}
