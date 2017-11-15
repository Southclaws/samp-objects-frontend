export const isValidName = (name: string): boolean => {
    let match = name.match(/^[a-zA-Z0-9-]*$/);
    if (match === null) {
        return false;
    }
    if (name.startsWith("-") || name.endsWith("-")) {
        return false;
    }
    return true;
};
