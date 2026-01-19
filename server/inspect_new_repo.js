import axios from 'axios';

const BASE_URL = 'https://api.github.com/repos/GFGSC-RTU/All-DSA-Sheets/contents';

async function listDir(path = '') {
    console.log(`\n--- Listing: ${path || 'ROOT'} ---`);
    const val = path ? encodeURI(path) : '';
    const url = val ? `${BASE_URL}/${val}` : BASE_URL;

    try {
        const { data } = await axios.get(url);
        if (Array.isArray(data)) {
            data.forEach(item => console.log(`[${item.type}] ${item.name}`));
            // recursing into first directory to see depth
            const firstDir = data.find(item => item.type === 'dir');
            if (path === '' && firstDir) {
                await listDir(firstDir.path);
            }
        }
    } catch (err) {
        console.log("Error:", err.message);
    }
}

// listDir(process.argv[2] || ''); // support cmd arg
const target = process.argv[2] || '';
if (target) {
    // If quote wrapped in shell, it might be clean, but verify
    listDir(target.replace(/"/g, ''));
} else {
    listDir();
}
