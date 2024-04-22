export interface IGraphData {
  [key: string]: {
    rate: number;
  };
}
export interface IGraphInitialState {
  graphData: IGraphData;
  eventType: string;
  graphLoading: boolean;
}

export interface ITableData {
  [key: string]: {
    ctr: number;
    evpm: number;
    imp_count: number;
  };
}

export interface ITableInitialState {
  tableData: ITableData;
  tableEventType: string;
  tableLoading: boolean;
}
