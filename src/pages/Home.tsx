import React, { useEffect, useRef, useState } from 'react';
import { createReogrid } from '@reogrid/lite';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './home.css';
import initReoGrid from '../helper/initGrid';
import { upsertCellValue } from '../store/reogridSlice';
import type { ReogridState } from '../types';

const Home: React.FC = () => {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const worksheetRef = useRef<ReturnType<typeof createReogrid>['worksheet'] | null>(null);
    const [isExportingPdf, setIsExportingPdf] = useState(false);
    const dispatch = useAppDispatch();
    const demo = useAppSelector((state) => state.reogrid);

    const escapeHtml = (input: string): string =>
        input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    const buildPdfHtml = (state: ReogridState): string => {
        const mergeMap = new Map<string, { rowspan: number; colspan: number }>();
        const coveredCells = new Set<string>();

        state.merges.forEach((merge) => {
            const rowspan = merge.bottomRow - merge.topRow + 1;
            const colspan = merge.rightColumn - merge.leftColumn + 1;
            mergeMap.set(`${merge.topRow}:${merge.leftColumn}`, { rowspan, colspan });

            for (let row = merge.topRow; row <= merge.bottomRow; row += 1) {
                for (let column = merge.leftColumn; column <= merge.rightColumn; column += 1) {
                    if (row === merge.topRow && column === merge.leftColumn) {
                        continue;
                    }
                    coveredCells.add(`${row}:${column}`);
                }
            }
        });

        const cellMap = new Map<string, { value?: string; style?: ReogridState['cells'][number]['style'] }>();
        state.cells.forEach((cell) => {
            cellMap.set(`${cell.row}:${cell.column}`, { value: cell.value, style: cell.style });
        });

        const colgroup = Array.from({ length: state.columnCount }, (_, index) => {
            const width = state.columnWidths[index] ?? 90;
            return `<col style="width:${width}px" />`;
        }).join('');

        const rowsHtml = Array.from({ length: state.rowCount }, (_, rowIndex) => {
            const height = state.rowHeights[rowIndex] ?? 34;
            const cellsHtml = Array.from({ length: state.columnCount }, (_, colIndex) => {
                const key = `${rowIndex}:${colIndex}`;
                if (coveredCells.has(key)) {
                    return '';
                }

                const merge = mergeMap.get(key);
                const cell = cellMap.get(key);
                const inlineStyles: string[] = [
                    'padding:4px 6px',
                    'white-space:pre-wrap',
                    'word-break:break-word',
                    `font-size:${cell?.style?.fontSize ?? 12}px`,
                    `font-weight:${cell?.style?.bold ? '700' : '400'}`,
                    `font-style:${cell?.style?.italic ? 'italic' : 'normal'}`,
                    `text-align:${cell?.style?.textAlign === 'general' ? 'left' : (cell?.style?.textAlign ?? 'left')}`,
                    `vertical-align:${cell?.style?.verticalAlign === 'middle' ? 'middle' : (cell?.style?.verticalAlign ?? 'middle')}`,
                    `color:${cell?.style?.color ?? '#2b3138'}`,
                    `background:${cell?.style?.backgroundColor ?? 'transparent'}`,
                ];

                if (cell?.style?.underline) {
                    inlineStyles.push('text-decoration:underline');
                }

                // Build per-cell border styles — each side only applies to cells on the boundary edge of the range.
                // For merged cells, use their actual visual extent (colspan/rowspan) for right/bottom edge checks.
                const cellColspan = merge?.colspan ?? 1;
                const cellRowspan = merge?.rowspan ?? 1;
                const sideBorderMap: Record<string, string> = {};
                (state.borders ?? []).forEach((b) => {
                    if (
                        rowIndex >= b.topRow && rowIndex <= b.bottomRow &&
                        colIndex >= b.leftColumn && colIndex <= b.rightColumn
                    ) {
                        const css = `${b.border.width ?? 1}px ${b.border.style ?? 'solid'} ${b.border.color}`;
                        (b.sides ?? []).forEach((side) => {
                            if (side === 'top' && rowIndex === b.topRow) sideBorderMap['top'] = css;
                            if (side === 'bottom' && rowIndex + cellRowspan - 1 === b.bottomRow) sideBorderMap['bottom'] = css;
                            if (side === 'left' && colIndex === b.leftColumn) sideBorderMap['left'] = css;
                            if (side === 'right' && colIndex + cellColspan - 1 === b.rightColumn) sideBorderMap['right'] = css;
                        });
                    }
                });

                if (sideBorderMap['top']) inlineStyles.push(`border-top:${sideBorderMap['top']}`);
                if (sideBorderMap['bottom']) inlineStyles.push(`border-bottom:${sideBorderMap['bottom']}`);
                if (sideBorderMap['left']) inlineStyles.push(`border-left:${sideBorderMap['left']}`);
                if (sideBorderMap['right']) inlineStyles.push(`border-right:${sideBorderMap['right']}`);

                const rowspanAttr = merge ? ` rowspan="${merge.rowspan}"` : '';
                const colspanAttr = merge ? ` colspan="${merge.colspan}"` : '';

                return `<td${rowspanAttr}${colspanAttr} style="${inlineStyles.join(';')}">${escapeHtml(cell?.value ?? '')}</td>`;
            }).join('');

            return `<tr style="height:${height}px">${cellsHtml}</tr>`;
        }).join('');

        return `
            <div style="width:1122px;padding:24px;background:#ffffff;color:#2b3138;font-family:'Noto Sans JP',sans-serif;">
                <table style="border-collapse:collapse;table-layout:fixed;width:100%;">
                    <colgroup>${colgroup}</colgroup>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
        `;
    };

    const exportGridPDF = async () => {
        if (isExportingPdf) {
            return;
        }

        setIsExportingPdf(true);
        const printNode = document.createElement('div');
        printNode.style.position = 'fixed';
        printNode.style.left = '-99999px';
        printNode.style.top = '0';
        printNode.style.zIndex = '-1';
        printNode.innerHTML = buildPdfHtml(demo);
        document.body.appendChild(printNode);

        try {
            const canvas = await html2canvas(printNode.firstElementChild as HTMLElement, {
                scale: 2,
                backgroundColor: '#ffffff',
            });

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 8;
            const imgWidth = pageWidth - margin * 2;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imgData = canvas.toDataURL('image/png');

            let renderedHeight = 0;
            let pageIndex = 0;
            while (renderedHeight < imgHeight) {
                if (pageIndex > 0) {
                    pdf.addPage();
                }

                const yOffset = margin - renderedHeight;
                pdf.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);
                renderedHeight += pageHeight - margin * 2;
                pageIndex += 1;
            }

            pdf.save(`${demo.title || 'grid'}.pdf`);
        } catch (error) {
            console.error('Export PDF failed:', error);
        } finally {
            document.body.removeChild(printNode);
            setIsExportingPdf(false);
        }
    };

    useEffect(() => {
        if (!gridRef.current) {
            return;
        }

        const { worksheet, destroy } = createReogrid({ workspace: gridRef.current });
        worksheetRef.current = worksheet;

        initReoGrid({ worksheet, demo });
        const unsubscribeCellValueChange = worksheet.onCellValueChange(({ row, column, value }) => {
            dispatch(upsertCellValue({ row, column, value }));
        });

        return () => {
            unsubscribeCellValueChange();
            worksheetRef.current = null;
            destroy();
        };
        // Initialize once; subsequent user edits are captured by onCellValueChange.
    }, [dispatch]);

    return (
        <div className="demo-page">
            <header className="demo-header">
                <h1>{demo.title}</h1>
                <div className="demo-header-actions">
                    <button
                        type="button"
                        className="export-pdf-btn"
                        onClick={exportGridPDF}
                        disabled={isExportingPdf}
                    >
                        {isExportingPdf ? 'Dang xuat...' : 'Export PDF'}
                    </button>
                    <a href="https://web.reogrid.net" target="_blank" rel="noreferrer">
                        web.reogrid.net
                    </a>
                </div>
            </header>
            <div className="demo-hint">{demo.hint}</div>
            <div ref={gridRef} className="demo-grid" />
        </div>
    );
};

export default Home;
