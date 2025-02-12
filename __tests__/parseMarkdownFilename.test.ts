// __tests__/parseMarkdownFilename.test.ts

import { parseMarkdownFilename } from "../utils/parseMarkdownFilename";

describe('parseMarkdownFilename', () => {
    const formatErrorRegex = /^Filename must be in the format: YYYY-MM-DD-title\.md, got ".*"$/;
    const dateErrorRegex = /^Invalid date in the filename: ".*"$/;

    test('Parses valid markdown filename with full path', () => {
        const filePath = '/some/path/2025-02-12-sample-title.md';
        const result = parseMarkdownFilename(filePath);

        expect(result.date).toEqual(new Date('2025-02-12'));
        expect(result.title).toEqual('sample-title');
    });

    test('Parses valid markdown filename with numbers in title', () => {
        const filePath = '2025-02-12-sample-title-2.md';
        const result = parseMarkdownFilename(filePath);

        expect(result.date).toEqual(new Date('2025-02-12'));
        expect(result.title).toEqual('sample-title-2');
    });

    test('Throws an error if missing title', () => {
        const filePath = '/some/path/2025-02-12.md';
        expect(() => parseMarkdownFilename(filePath)).toThrow(
            // using regex to make the test more flexible
            /^Filename must be in the format: YYYY-MM-DD-title\.md, got ".*"$/
        );
    });

    test('Throws an error if missing date parts', () => {
        const filePath = '/some/path/2025-02-some-title.md';
        expect(() => parseMarkdownFilename(filePath)).toThrow(formatErrorRegex);
    });

    test('Throws an error if missing .md extension', () => {
        const filePath = '/some/path/2025-02-12-some-title';
        expect(() => parseMarkdownFilename(filePath)).toThrow(formatErrorRegex);
    });

    test('Throws an error if invalid characters in title', () => {
        const filePath = '/some/path/2025-02-12-SOME-TITLE.md';
        expect(() => parseMarkdownFilename(filePath)).toThrow(formatErrorRegex);
    });

    test('Throws an error if invalid date', () => {
        const filePath = '/some/path/2025-02-45-some-title.md';
        expect(() => parseMarkdownFilename(filePath)).toThrow(dateErrorRegex);
    });

});
