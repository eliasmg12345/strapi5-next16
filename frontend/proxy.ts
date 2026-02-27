import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { STRAPI_BASE_URL } from "./lib/strapi"

const protectedRoutes = ['/dashboard']
function checkIsProtectedRoute(path: string) {
    return protectedRoutes.includes(path)
}

export async function proxy(request: NextRequest) {
    const currentPath = request.nextUrl.pathname
    const isProtectedRoute = checkIsProtectedRoute(currentPath)

    if (!isProtectedRoute) return NextResponse.next()

    //la ruta es una ruta ptotegida, verificamos si el usuario esta autenticado
    try {

        //1. validar si el usuario tiene el token
        //2. si el usuario existe en la db
        //3. si el usuario esta activo

        const cookieStore = await cookies()
        const jwt = cookieStore.get('jwt')?.value

        if (!jwt) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }

        const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        })

        const userResponse = await response.json()

        if (!userResponse) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }

        return NextResponse.next()

    } catch (error) {
        console.error('Error in proxy middleware: ', error);
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|favicon.ico|_next/image).*)",
        "/dashboard",
        "/dashboard/:path*",
    ]
}

