function isRFC3339DateTime(value: string) {
    if (!value) {
        return false;
    }
    try {
        const d = new Date(value);
        d.toISOString();
        return true;
    } catch {
        return false;
    }
}

export {
    isRFC3339DateTime
}
