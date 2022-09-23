import { Outlet } from "@remix-run/react";

export default function PostsRoute() {
    return <Outlet></Outlet>
}

export function ErrorBoundary({error} : {error: unknown}) {
    if (error instanceof Error) {
        return <div className="text-red-500">Oh no, somthing went wrong!
        <pre>{error.message}</pre>
        </div> 
    }
    return <div className="text-red-500">Oh no, somthing went wrong!
    </div>
}