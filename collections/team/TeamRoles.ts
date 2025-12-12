import type { CollectionConfig } from 'payload'

export const TeamRoles: CollectionConfig = {
    slug: 'team-roles',
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
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'priority',
            type: 'number',
            defaultValue: 10,
        },
        {
            name: 'description',
            type: 'textarea',
        }
    ],
}
