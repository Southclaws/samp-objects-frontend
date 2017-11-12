// named ObjectPackage to not collide with JavaScript type 'Object'
export interface ObjectPackage {
    id?: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    images?: string[];
    models?: string[];
    textures?: string[];
}
