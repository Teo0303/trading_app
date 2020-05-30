import React, { useRef } from "react";
import { Button, Space, Input } from "antd";
import { modifyTime } from "./helperFunctions";
import { SearchOutlined } from "@ant-design/icons";

// export const tableColumns = () => {
//   const getColumnRangeSearchProps = (dataIndex) => ({
//     filterDropdown: () => {},
//     filterIcon: () => {},
//     onFilter: () => {},
//     onFilterDropdwonVisibleChange: () => {},
//     render: () => {}
//   });

//   return columns;
// };
let searchInput = useRef<any>();

interface Props {
  setSelectedKeys: any;
  selectedKeys: any;
  confirm: any;
  clearFilters: any;
}

const getColumnRangeSearchProps = (dataIndex: any) => ({
  filterDropdown: (props: Props) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={(node) => {
          searchInput.current = node;
        }}
        placeholder={`Search ${dataIndex}`}
        value={props.selectedKeys[0]}
        onChange={(e) =>
          props.setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        // onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type='primary'
          // onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          // onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: any) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: () => {},
  onFilterDropdwonVisibleChange: () => {},
  render: () => {}
});

export const tableColumns = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Platform",
    dataIndex: "platform",
    key: "platform",
    sorter: true
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source"
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    ...getColumnRangeSearchProps
  },
  {
    title: "Total time",
    dataIndex: "totalUsageTime",
    key: "totalUsageTime",
    render: (time: number) => {
      if (time) {
        const { seconds, minutes, hours } = modifyTime(time);

        return (
          <span>
            {hours} : {minutes} : {seconds}
          </span>
        );
      } else return <span>--</span>;
    }
  },
  {
    title: "Installed At",
    dataIndex: "installedAt",
    key: "installedAt",
    render: (date: { seconds: number; milliseconds: number }) => {
      if (date) {
        let datetime = new Date(date.seconds * 1000).toDateString();

        return <span>{datetime}</span>;
      } else return <span>--</span>;
    }
  },
  {
    title: "Ads Count",
    dataIndex: "adsCount",
    key: "adsCount"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "LTV",
    dataIndex: "ltv",
    key: "ltv"
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country"
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country"
  },
  {
    title: "Date uninstall",
    dataIndex: "uninstalledAt",
    key: "uninstalledAt",
    render: (date: { seconds: number; milliseconds: number }) => {
      if (date) {
        let datetime = new Date(date.seconds * 1000).toDateString();

        return <span>{datetime}</span>;
      } else return <span>--</span>;
    }
  }
];
