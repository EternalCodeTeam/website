export interface CommandData {
    name: string;
    permission: string;
    description: string;
    arguments: string;
}

export interface EternalCoreData {
    commands?: Array<{
        name: string;
        permissions?: string[];
        descriptions?: string[];
        arguments?: string[];
    }>;
    permissions?: Array<{
        name: string;
        permissions?: string[];
        descriptions?: string[];
    }>;
}
