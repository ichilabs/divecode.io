// utils/parseMarkdownFilename.ts

import * as path from 'path';
import { ParsedFilename } from "../types/parsedFilename";

/**
 * Parse a markdown filename in the format YYYY-MM-DD-title.md.
 * 
 * The title must contain only lowercase letters, digits, and hyphens.
 * 
 * @param filePath The path of the Markdown file.
 * @returns Object containing `date` (as `Date` object) and `title`
 * (as found in filename) properties.
 * @throws Error if the filename is invalid or the date is not a
 * valid date.
 */
export function parseMarkdownFilename(filePath: string): ParsedFilename {
    const filename = path.basename(filePath);

    const regex = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.md$/;
    const match = filename.match(regex);

    if (!match) {
        throw new Error(`Filename must be in the format: YYYY-MM-DD-title.md, got "${filename}"`);
    }

    const [, dateString, title] = match;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date in the filename: "${filename}"`)
    }

    return {
        date,
        title
    }
}