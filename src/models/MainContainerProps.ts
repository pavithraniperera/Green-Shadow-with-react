export default class MainContainerProps {
    dataArray: any[];
    renderItem: (item: any, index: number) => JSX.Element;
    noDataMessage: string;
    displayType: "card" | "table"; // Either "card" or "table"
    tableHeaders?: string[];

    constructor(dataArray: any[],renderItem: (item: any, index: number) => JSX.Element, noDataMessage: string,displayType: "card" | "table",tableHeaders?: string[]) {
        this.dataArray = dataArray;
        this.renderItem = renderItem;
        this.noDataMessage = noDataMessage;
        this.displayType = displayType;
        this.tableHeaders = tableHeaders;


    }
}