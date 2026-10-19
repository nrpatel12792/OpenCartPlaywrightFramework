// import fs from "fs";
// import { parse } from 'csv-parse/sync';

// export class CsvHelper {

//     static readCsv(filePath: string): Record<string, string>[] {
//         return parse(fs.readFileSync(filePath, "utf-8"), {
//             columns: true, //first row as headers
//             skip_empty_lines: true,
//             trim: true, //trim spaces
//         }) as Record<string, string>[];
//     }
// }

import * as fs from "fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

export class CsvHelper {

    static readCsv(filePath: string): Record<string, string>[] {

        const absolutePath = path.resolve(filePath);

        console.log("Reading CSV from:", absolutePath);

        const fileContent = fs.readFileSync(absolutePath, "utf-8");

        return parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            bom: true,
            relax_column_count: true,
            relax_column_count_less: true
        }) as Record<string, string>[];
    }
}