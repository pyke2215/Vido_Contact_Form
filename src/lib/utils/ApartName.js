function getFirstLastName(fullname) {
    const arr = fullname.split(" ");
    return {
        fistname: arr[0],
        lastname: arr[fullname.length - 1]
    }
};

export default getFirstLastName;