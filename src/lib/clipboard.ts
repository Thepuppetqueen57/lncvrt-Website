export const copyToClipboard = async (text: string | undefined) => {
    if (text == undefined) {
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        alert(`Copied "${text}" to clipboard!`);
    } catch (err) {
        console.error("Failed to copy to clipboard: " + err);
        alert("Failed to copy to clipboard: " + err);
    }
};
