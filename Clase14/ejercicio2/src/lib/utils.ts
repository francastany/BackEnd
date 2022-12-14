export default getTime = () => {
    return {
        fyh: new Date().toLocaleString(),
        timestamp: Date.now()
    };
};