import CustomSelect from "components/CustomSelect/CustomSelect";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getTableDataAction } from "store/actions";
import { tableSelector } from "store/selectors";
import { setTableEventType, setTableLoading } from "store/slices/tableSlice";
import "./Table.css";
import styles from "./Table.module.scss";

const Table = () => {
  const { tableData, tableEventType, tableLoading } =
    useSelector(tableSelector);

  const dispatch = useDispatch();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      dispatch(getTableDataAction({ eventType: tableEventType }));
      dispatch(setTableLoading(true));
    } else {
      isFirstRender.current = false;
    }
  }, [tableEventType, dispatch]);

  const clickFuncForSelect = (e: any) => {
    dispatch(setTableEventType(e.target.getAttribute("data-name")));
  };

  const tableDataArray = Object.keys(tableData).map((key) => ({
    key,
    ...tableData[key],
  }));

  const [globalFilter, setGlobalFilter] = useState("");

  const header = (
    <div className="table-header">
      <CustomSelect
        defaultText="mm_dma"
        optionsList={["mm_dma", "site_id"]}
        clickFunctionality={clickFuncForSelect}
      />
      <div className="seatchAndInput">
        <InputText
          value={globalFilter}
          onChange={(e: any) => setGlobalFilter(e.target.value)}
          placeholder="Global Search"
        />
      </div>
    </div>
  );

  return (
    <section className={styles.Table} id="table">
      {tableLoading && (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#0ef"
          secondaryColor="#0ef"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass={styles.loadingWrapper}
        />
      )}
      <DataTable
        value={tableDataArray}
        paginator
        sortField="key"
        sortOrder={1}
        globalFilterFields={["key", "imp_count", "ctr", "evpm"]}
        rows={20}
        rowsPerPageOptions={[5, 10, 20, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        header={header}
        globalFilter={globalFilter}
      >
        <Column field="key" sortable header={tableEventType}></Column>
        <Column field="imp_count" sortable header="Impressions"></Column>
        <Column field="ctr" sortable header="CTR %"></Column>
        <Column field="evpm" sortable header="EvPM ‰"></Column>
      </DataTable>
    </section>
  );
};

export default Table;
