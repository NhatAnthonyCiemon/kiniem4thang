
import { ReogridState, WorksheetLike } from '../types';

export default function initReoGrid({ worksheet, demo }: { worksheet: WorksheetLike; demo: ReogridState; }): void {
    worksheet.showGridLines = demo.showGridLines;
    worksheet.columns.setCount(demo.columnCount);
    worksheet.rows.setCount(demo.rowCount);

    Object.entries(demo.columnWidths).forEach(([column, width]) => {

        worksheet.column(Number(column)).width = width;
    });

    Object.entries(demo.rowHeights).forEach(([row, height]) => {
        worksheet.row(Number(row)).height = height;
    });

    demo.cells.forEach((cell) => {
        const cellHandle = worksheet.cell(cell.row, cell.column);
        if (cell.value !== undefined) {
            cellHandle.setValue(cell.value);
        }
        if (cell.style) {
            cellHandle.setStyle(cell.style);
        }
    });

    demo.merges.forEach((merge) => {
        worksheet
            .range(merge.topRow, merge.leftColumn, merge.bottomRow, merge.rightColumn)
            .merge();
    });

    demo.borders.forEach((entry) => {
        worksheet
            .range(
                entry.topRow,
                entry.leftColumn,
                entry.bottomRow,
                entry.rightColumn,
            )
            .border(entry.border, entry.sides);
    });
}