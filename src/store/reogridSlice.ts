import { createSlice } from '@reduxjs/toolkit';
import initialState from '../data/constants';

const reogridDemoSlice = createSlice({
    name: 'reogrid',
    initialState,
    reducers: {
        resetMockData: () => initialState,
        upsertCellValue: (state, action: { payload: { row: number; column: number; value: string } }) => {
            const { row, column, value } = action.payload;
            const targetCell = state.cells.find((cell) => cell.row === row && cell.column === column);

            if (targetCell) {
                targetCell.value = value;
                return;
            }

            state.cells.push({ row, column, value });
        },
    },
});

export const { resetMockData, upsertCellValue } = reogridDemoSlice.actions;
export default reogridDemoSlice.reducer;
