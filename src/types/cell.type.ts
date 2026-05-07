export type CellAddress = `${string}:${number}`;

export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double';
export type BorderSide = 'top' | 'bottom' | 'left' | 'right';

export interface BorderSpec {
    style: BorderStyle;
    color?: string;
    width?: number;
}

export interface Cell {
    value?: string;

    style?: CellStyle;
}
export interface CellStyle {
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    italic?: boolean;
    bold?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    textWrap?: 'overflow' | 'clip' | 'word-break' | 'break-all';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    textAlign?: 'left' | 'center' | 'right' | 'general';
    border?: Partial<Record<BorderSide, BorderSpec>>;
}