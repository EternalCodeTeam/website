import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tags } from './collections/posts/Tags'
import { Authors } from './collections/author/Authors'
import { Posts } from './collections/posts/Posts'
import { TeamMembers } from './collections/team/TeamMembers'
import { TeamRoles } from './collections/team/TeamRoles'
import { TeamPage } from './globals/TeamPage'
import { ContributePage } from './globals/ContributePage'

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
    editor: lexicalEditor({}),
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
