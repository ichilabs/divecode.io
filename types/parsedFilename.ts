// types/parsedFilename.ts

export interface ParsedFilename {
    /**
     * Date in the filename.
     */
    date: Date;

    /**
     * Title in the filename.
     * Contains only lowercase letters, digits, and hyphens.
     */
    title: string;
}