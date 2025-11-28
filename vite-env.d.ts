// Removed reference to vite/client to resolve missing type definition error
export { };

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}