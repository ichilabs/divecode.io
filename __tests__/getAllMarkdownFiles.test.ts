// tests/getAllMarkdownFiles.test.ts

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { getAllMarkdownFiles } from '../utils/getAllMarkdownFiles';

describe('getAllMarkdownFiles', () => {
    let testDir: string;
    
    // Creates temporary directory before each test
    //  tmp/
    //      getAllMarkdownFiles-*/
    //          file1.md
    //          file2.txt
    //          README.MD
    //          subdir/
    //              file3.md
    //              index.md
    beforeEach(() => {
        testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'getAllMarkdownFiles-'));

        fs.writeFileSync(path.join(testDir, 'file1.md'), '# File 1');
        fs.writeFileSync(path.join(testDir, 'file2.txt'), 'This is not markdown.');
        fs.writeFileSync(path.join(testDir, 'README.md'), '# README (uppercase extension)');

        const subDir = path.join(testDir, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'file3.md'), '# File 3');
        fs.writeFileSync(path.join(subDir, 'index.md'), '# Index');
    });

    // Removes temporary directory after each test
    afterEach(() => {
        fs.rmSync(testDir, { recursive: true, force: true });
    });

    test('Return all markdown files by default', () => {
        const result = getAllMarkdownFiles(testDir);

        const expectedFiles = [
            path.join(testDir, 'file1.md'),
            path.join(testDir, 'README.md'),
            path.join(testDir, 'subdir', 'file3.md'),
            path.join(testDir, 'subdir', 'index.md'),
        ];

        // the order in which files are returned is not guaranteed
        expect(result.sort()).toEqual(expectedFiles.sort());
    });

    test('Ignore specified markdown files (case-insensitive)', () => {
        const result = getAllMarkdownFiles(
            testDir,
            { ignoreFilenames: ['index.md', 'readme.md']}
        );

        const expectedFiles = [
            path.join(testDir, 'file1.md'),
            path.join(testDir, 'subdir', 'file3.md'),
        ];

        // the order in which files are returned is not guaranteed
        expect(result.sort()).toEqual(expectedFiles.sort());
    });

    test('Work with an empty directory', () => {
        const emptyDir = path.join(testDir, 'empty');
        fs.mkdirSync(emptyDir);

        const result = getAllMarkdownFiles(emptyDir);
        expect(result).toEqual([]);
    });

});