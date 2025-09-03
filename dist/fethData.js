export default async function fetchDaa(url) {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error('Error:' + response.status);
        const json = await response.json();
        return json;
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=fethData.js.map