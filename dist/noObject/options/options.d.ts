/**
 *	@fileOverview Constructor object options
 *
 *	Can be used:
    1. a1Start
    2. a1Start,  a1End
    3. colStart, rowStart
    4. colStart, rowStart, nRows
    5. colStart, rowStart, nCols
    6. colStart, rowStart, nCols,  nRows
    7. colStart, rowStart, colEnd
    8. colStart, rowStart, rowEnd
    9. colStart, rowStart, colEnd, rowEnd
 */
declare type options = {
    colStart?: string | number;
    rowStart?: string | number;
    colEnd?: string | number;
    rowEnd?: string | number;
    a1Start?: string;
    a1End?: string;
    nCols?: number;
    nRows?: number;
    converter?: 1 | 2;
};
export default options;
