import type { GlobalConfig } from 'payload'

export const TeamPage: GlobalConfig = {
    slug: 'team-page',
    label: 'Team Page',
    fields: [
        {
            name: 'contributorsSettings',
            type: 'group',
            label: 'Contributors Section',
            fields: [
                {
                    name: 'visible',
                    type: 'checkbox',
                    label: 'Show Contributors Section',
                    defaultValue: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'Section Title',
                    defaultValue: 'Contributors',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Section Description',
                    defaultValue: 'People who have contributed to our open source repositories.',
                },
                {
                    name: 'repositories',
                    type: 'array',
                    label: 'GitHub Repositories',
                    fields: [
                        {
                            name: 'url',
                            type: 'text',
                            label: 'Repository (owner/repo)',
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
}
