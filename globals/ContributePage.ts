import type { GlobalConfig } from 'payload'

export const ContributePage: GlobalConfig = {
    slug: 'contribute-page',
    label: 'Contribute Page',
    fields: [
        {
            name: 'cards',
            type: 'array',
            label: 'Contribution Cards',
            minRows: 1,
            labels: {
                singular: 'Card',
                plural: 'Cards',
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Title',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                    label: 'Description',
                },
                {
                    name: 'icon',
                    type: 'text',
                    label: 'Icon',
                    admin: {
                        components: {
                            Field: '/components/payload/icon-picker-field#IconPickerField',
                        },
                    },
                },
                {
                    name: 'actionText',
                    type: 'text',
                    required: true,
                    label: 'Button Text',
                },
                {
                    name: 'href',
                    type: 'text',
                    required: true,
                    label: 'Link URL',
                },
                {
                    name: 'color',
                    type: 'text',
                    label: 'Color Theme',
                    required: true,
                    defaultValue: '#3b82f6',
                    admin: {
                        components: {
                            Field: '/components/payload/color-picker-field#ColorPickerField',
                        },
                    },
                },
            ],
        },
    ],
}
