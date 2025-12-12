import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
    slug: 'team-members',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'roles', 'github'],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'roles',
            type: 'relationship',
            relationTo: 'team-roles',
            hasMany: true,
            required: true,
        },
        {
            name: 'avatar',
            type: 'text',
            required: true,
            label: 'Avatar URL',
        },
        {
            name: 'github',
            type: 'text',
            label: 'GitHub URL',
        },
        {
            name: 'linkedin',
            type: 'text',
            label: 'LinkedIn URL',
        },
    ],
}
