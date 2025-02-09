// utils/getAllMarkdownFiles.ts

import * as fs from 'fs';
import * as path from 'path';

interface getAllMarkdownFilesOptions {
    /**
     * List of filenames (case-insensitive) to skip/ignore.
     * e.g. ['index.md']
     */
    ignoreFilenames?: string[]
}


export function getAllMarkdownFiles(
    dirPath: string,
    options: getAllMarkdownFilesOptions = {}
): string[] {

    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
        throw new Error(`Path "${dirPath}" is not a valid directory.`);
    }

    // `[]` is the default value if called without `ignoreFilenames`
    const { ignoreFilenames = [] } = options;

    const filePaths: string[] = [];

    function processDirectory(currPath: string) {
        const dirEntries = fs.readdirSync(currPath, { withFileTypes: true });

        for (const dirent of dirEntries) {
            const fullPath = path.join(currPath, dirent.name);

            if (dirent.isDirectory()) {
                processDirectory(fullPath);
            } else if (dirent.isFile() && dirent.name.toLowerCase().endsWith('.md')) {
                // Skip if it's in the ignore list
                if (ignoreFilenames.map(f => f.toLowerCase()).includes(dirent.name.toLowerCase())) {
                    continue;
                }

                filePaths.push(fullPath)
            }
        }

    }

    processDirectory(dirPath)
    return filePaths
}