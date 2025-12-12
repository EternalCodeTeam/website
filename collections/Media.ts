import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
    },
    upload: {
        staticDir: "public/media",
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
            },
            {
                name: "card",
                width: 768,
                height: 1024,
                position: "centre",
            },
            {
                name: "tablet",
                width: 1024,
                height: undefined,
                position: "centre",
            },
        ],
        adminThumbnail: "thumbnail",
        mimeTypes: ["image/*"],
    },
    fields: [
        {
            name: "alt",
            type: "text",
        },
    ],
}
