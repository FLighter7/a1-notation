/**
 * @fileOverview Constructor object options
 */
type options =
{
  colStart?:  string | number,// "A" | "1" | 1
  rowStart?:  string | number,// "1" | 1
  colEnd?:    string | number,// "B" | "2" | 2
  rowEnd?:    string | number,// "2" | 2
  a1Start?:   string,// "A1:B2" | "A1"
  a1End?:     string,// "B2"
  nCols?:     number,// how many cols in total (cols length)
  nRows?:     number,// how many rows in total (rows length)
  converter?: 1 | 2,
}

export default options;
