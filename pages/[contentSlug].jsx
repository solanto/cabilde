import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"
import path from "path"
import { contentPaths, CONTENT_PATH } from "../lib/content-paths"
import fs from "fs"
import Link from "../components/link"
import matter from "gray-matter"

const components = {
    a: props => <Link href={props.href}>{props.children}</Link>
}

components.a.displayName = "a"

export async function getStaticPaths() {
    const paths = contentPaths
        // remove file extensions for page paths
        .map(path => path.replace(/\.mdx?$/, ""))
        // map the path into the static paths object required by Next.js
        .map(contentSlug => ({ params: { contentSlug } }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const contentPathMd = path.join(CONTENT_PATH, `${params.contentSlug}.md`)
    const contentPathMdx = path.join(CONTENT_PATH, `${params.contentSlug}.mdx`)

    const source = fs.existsSync(contentPathMd)
        ? fs.readFileSync(contentPathMd)
        : fs.readFileSync(contentPathMdx)

    const { content, data } = matter(source)

    const contentSource = await serialize(content, {
        // optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    })

    return {
        props: {
            source: contentSource,
            frontMatter: data
        }
    }
}

const Content = ({ source, frontMatter }) =>
    <main className="usa-prose grid-container">
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...source} components={components} />
    </main>


export default Content
