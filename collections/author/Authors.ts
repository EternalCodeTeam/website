import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
    slug: 'authors',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'email',
            type: 'email',
        },
        {
            name: 'bio',
            type: 'textarea',
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
        },
    ],
}
