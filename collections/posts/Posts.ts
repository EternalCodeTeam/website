import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
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
            name: 'excerpt',
            type: 'textarea',
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'markdownImport',
            type: 'textarea',
            admin: {
                description: 'Paste Markdown here to overwrite the Content field.',
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [
                    async ({ siblingData, data, req }) => {
                        const markdown = siblingData?.markdownImport || data?.markdownImport;

                        if (markdown && typeof markdown === 'string') {
                            const { convertMarkdownToLexical, editorConfigFactory } = await import('@payloadcms/richtext-lexical');

                            try {
                                // @ts-ignore
                                const config = req.payload.config;

                                const editorConfig = await editorConfigFactory.default({
                                    config,
                                });

                                const lexicalData = convertMarkdownToLexical({
                                    markdown,
                                    editorConfig,
                                });

                                // Overwrite the content field with the converted data
                                if (siblingData) {
                                    siblingData.content = lexicalData;
                                }

                                return null; // Clear the markdown import field
                            } catch (e) {
                                console.error("Error converting markdown", e);
                            }
                        }
                        return null;
                    }
                ]
            }
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'authors',
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
        }
    ],
}
