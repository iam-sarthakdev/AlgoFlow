import axios from 'axios';

const BASE_URL = 'https://api.github.com/repos/AkashSingh3031/The-Complete-FAANG-Preparation/contents';

// Mimic the service logic
function encode(path) {
    return encodeURI(path);
}

async function listDir(path) {
    console.log(`\n--- Listing: ${path} ---`);
    const url = `${BASE_URL}/${encode(path)}`;
    console.log("URL:", url);
    try {
        const { data } = await axios.get(url);
        console.log("Status: 200 OK");
        if (Array.isArray(data)) {
            data.forEach(item => console.log(`[${item.type}] ${item.name}`));
        } else {
            console.log("Not a directory (was expecting array).");
        }
    } catch (err) {
        console.log("Error:", err.message);
        if (err.response) console.log("Status:", err.response.status);
    }
}

async function getFile(path) {
    console.log(`\n--- Content: ${path} ---`);
    const url = `${BASE_URL}/${encode(path)}`;
    try {
        const { data } = await axios.get(url);
        console.log("Data keys:", Object.keys(data));
        if (data.content) console.log("Has content payload");
        else console.log("No content payload");
    } catch (err) {
        console.log("Error:", err.message);
        if (err.response) console.log("Status:", err.response.status);
    }
}

async function main() {
    // 1. SQL
    await listDir('2]. Technical Subjects/3]. Structured Query Language (SQL)');

    // 2. LLD
    await listDir('3]. System Design/01]. Low Level Design');

    // 3. LLD File
    await getFile('3]. System Design/01]. Low Level Design/Add Contents.txt');
}

main();
