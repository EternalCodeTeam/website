import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Authors } from './collections/author/Authors'
import { Media } from './collections/Media'
import { Posts } from './collections/posts/Posts'
import { Tags } from './collections/posts/Tags'
import { TeamMembers } from './collections/team/TeamMembers'
import { TeamRoles } from './collections/team/TeamRoles'
import { Users } from './collections/Users'
import { ContributePage } from './globals/ContributePage'
import { TeamPage } from './globals/TeamPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: 'users',
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [
        Users,
        Media,
        Tags,
        Authors,
        Posts,
        TeamMembers,
        TeamRoles,
    ],
    globals: [
        TeamPage,
        ContributePage,
    ],
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            // Ensure basic markdown-compatible features are enabled
            // (Most are in defaultFeatures, but being explicit can help if defaults are minimal in some versions)
            // Note: Markdown shortcuts (like # for Heading) are usually provided by these features' transformers.
            HTMLConverterFeature({}),
        ],
    }),
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key-that-is-very-long-and-secure',
    typescript: {
        outputFile: path.resolve(process.cwd(), "payload-types-generated.ts"),
    },
    db: process.env.DATABASE_URI?.startsWith('mongodb') ? mongooseAdapter({
        url: process.env.DATABASE_URI,
    }) : sqliteAdapter({
        client: {
            url: process.env.DATABASE_URI || 'file:./payload.db',
        },
    }),
    plugins: [
        ...(process.env.BLOB_READ_WRITE_TOKEN ? [
            vercelBlobStorage({
                collections: {
                    media: true,
                },
                token: process.env.BLOB_READ_WRITE_TOKEN,
            }),
        ] : []),
    ],
    sharp,
})
