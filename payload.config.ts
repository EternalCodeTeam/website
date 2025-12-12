import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
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
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key-that-is-very-long-and-secure',
    typescript: {
        outputFile: path.resolve(process.cwd(), "payload-types.ts"),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || 'mongodb://127.0.0.1/eternalcode',
    }),
    plugins: [
        vercelBlobStorage({
            collections: {
                media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
    ],
    sharp,
})
