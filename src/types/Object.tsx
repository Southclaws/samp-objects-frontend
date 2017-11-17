// named ObjectPackage to not collide with JavaScript type 'Object'
export interface ObjectPackage {
    id?: string;
    name: string;
    owner_id: string;
    owner_name: string;
    description: string;
    category: string;
    tags: string[];
    rate_count: number;
    rate_value: number;
    rate_average: number;
    images?: string[];
    models?: string[];
    textures?: string[];
}
