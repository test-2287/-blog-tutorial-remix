import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

// import { getPosts } from "~/models/post.server"
import { getPostListings } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils"

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPostListings>>
}

export const loader = async () => {
    // throw new Error('blah!')
    return json<LoaderData>({
        posts: await getPostListings()
    })
}

export default function Posts() {
    const { posts } = useLoaderData() as unknown as LoaderData;
    const adminUser = useOptionalAdminUser()

    return (
        <main>
            <h1>Posts</h1>
            { adminUser ? <Link to="admin" className="text-red-600 underline">
                Admin
            </Link> : null }
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            prefetch="intent"
                            to={post.slug}
                            className="text-blue-600 underline">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}
