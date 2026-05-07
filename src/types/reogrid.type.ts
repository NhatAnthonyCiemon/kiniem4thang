import type { CellStyle } from './cell.type';

export type ReogridTextAlign = 'general' | 'left' | 'center' | 'right';
export type ReogridVerticalAlign = 'top' | 'middle' | 'bottom';
export type ReogridTextWrapMode = 'none' | 'wrap' | 'break-word';

export interface ReogridRichTextRun {
    text: string;
    fontFamily?: string;
    fontSize?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: string;
}

export interface ReogridCell {
    row: number;
    column: number;
    value?: string;
    formula?: string;
    displayValue?: string;
    numberFormat?: string;
    style?: Partial<CellStyle>;
    richText?: ReogridRichTextRun[];
    cachedValue?: string | number | boolean;
}

export interface ReogridMergedCellRange {
    topRow: number;
    leftColumn: number;
    bottomRow: number;
    rightColumn: number;
}

export type ReogridBorderLineStyle = 'solid' | 'dashed' | 'dotted';
export type ReogridRangeBorderSide =
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'outside'
    | 'inside'
    | 'insideV'
    | 'insideH'
    | 'all';

export interface ReogridBorderLine {
    style: ReogridBorderLineStyle;
    color: string;
    width: number;
    appliedAt?: number;
}



export interface ReogridBorderRange {
    topRow: number;
    leftColumn: number;
    bottomRow: number;
    rightColumn: number;
    border: {
        style: ReogridBorderLineStyle;
        color?: string;
        width?: number;
    };
    sides?: ReogridRangeBorderSide[];
}



export interface ReogridState {
    title: string;
    hint: string;
    showGridLines: boolean;
    columnCount: number;
    columnWidths: Record<number, number>;
    rowHeights: Record<number, number>;
    cells: ReogridCell[];
    merges: ReogridMergedCellRange[];
    borders: ReogridBorderRange[];
    rowCount: number;
}
import type { ReogridInstance } from '@reogrid/lite';
export type WorksheetLike = ReogridInstance['worksheet'];


// export interface ReogridCellBorderDefinition {
//     top?: ReogridBorderLine;
//     right?: ReogridBorderLine;
//     bottom?: ReogridBorderLine;
//     left?: ReogridBorderLine;
// }

// export interface ReogridConditionalFormatEntry {
//     id?: string;
//     range: {
//         topRow: number;
//         leftColumn: number;
//         bottomRow: number;
//         rightColumn: number;
//     };
//     rule: Record<string, unknown>;
//     style: Partial<CellStyle>;
// }

// export interface ReogridWorksheetSnapshot {
//     cells: ReogridCell[];
//     merges: ReogridMergedCellRange[];
//     borders: Record<string, ReogridCellBorderDefinition>;
//     columnWidths: number[];
//     rowHeights: number[];
//     rowCount: number;
//     columnCount: number;
//     frozenRows: number;
//     frozenColumns: number;
//     conditionalFormats?: ReogridConditionalFormatEntry[];
// }
// export interface ReogridLiteOptions {
//     workspace?: string | HTMLElement;
//     workspaceId?: string;
//     canvasId?: string;
//     injectStyles?: boolean;
//     undoCapacity?: number;
//     animation?: boolean;
//     animationDuration?: number;
//     animationEasing?: string;
// }

// export interface ReogridWorksheetUIState {
//     showGridLines?: boolean;
//     alternateRowColors?: {
//         odd: string;
//         even: string;
//     } | null;
// }

// export interface ReogridDocument {
//     version: '1.0';
//     library: '@reogrid/lite';
//     options?: Partial<ReogridLiteOptions>;
//     uiState?: ReogridWorksheetUIState;
//     worksheet: ReogridWorksheetSnapshot;
//     metadata?: Record<string, unknown>;
// }

// export interface ReogridInstanceLike {
//     worksheet: {
//         getExportSnapshot: () => {
//             cells: ReogridCell[];
//             merges: ReogridMergedCellRange[];
//             borders: Map<string, ReogridCellBorderDefinition>;
//             columnWidths: number[];
//             rowHeights: number[];
//             rowCount: number;
//             columnCount: number;
//             frozenRows: number;
//             frozenColumns: number;
//             conditionalFormats?: ReogridConditionalFormatEntry[];
//         };
//         getShowGridLines?: () => boolean;
//     };
// }

// export function mapSnapshotBordersToRecord(
//     borders: Map<string, ReogridCellBorderDefinition>,
// ): Record<string, ReogridCellBorderDefinition> {
//     const result: Record<string, ReogridCellBorderDefinition> = {};
//     for (const [key, value] of borders.entries()) {
//         result[key] = value;
//     }
//     return result;
// }

// export function toReogridDocument(
//     instance: ReogridInstanceLike,
//     extras?: {
//         options?: Partial<ReogridLiteOptions>;
//         metadata?: Record<string, unknown>;
//     },
// ): ReogridDocument {
//     const snapshot = instance.worksheet.getExportSnapshot();

//     return {
//         version: '1.0',
//         library: '@reogrid/lite',
//         options: extras?.options,
//         metadata: extras?.metadata,
//         uiState: {
//             showGridLines: instance.worksheet.getShowGridLines?.(),
//         },
//         worksheet: {
//             ...snapshot,
//             borders: mapSnapshotBordersToRecord(snapshot.borders),
//         },
//     };
// }
