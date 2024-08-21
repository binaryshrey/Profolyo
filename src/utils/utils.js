export const splitName = (input) => {
    let fName = '';
    let lName = '';
    const parts = input.split(' ');
    if (parts.length === 1) {
        fName = parts[0];
        lName = '';
    } else if (parts.length === 2) {
        fName = parts[0];
        lName = parts[1];
    }
    return { fName, lName };
};
