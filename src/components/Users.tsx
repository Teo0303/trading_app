import React, { useState, useEffect, useRef } from "react";
// import { db } from "../services/Firebase/firebase";
import {
  Table,
  Button,
  Space,
  Input,
  InputNumber,
  Modal,
  Alert,
  Select
} from "antd";
import { User } from "../types/primaryTypes";
import { modifyTime } from "../helpers/helperFunctions";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ColumnProps } from "antd/lib/table";

const { Option } = Select;

type Users = User[];

interface FilterProps {
  setSelectedKeys: any;
  selectedKeys: any;
  confirm: any;
  clearFilters: any;
}

interface RangeProps {
  data: {
    searchRangeFrom: number | string;
    searchRangeTo: number | string;
  };
}

export const UsersList: React.FC<{}> = (props: any) => {
  const [users, setUsers] = useState<Users | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  const [pagination] = useState({ current: 1, pageSize: 10 });

  const [selectedUsers, setSelectedUsers] = useState<[] | [{}]>();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<any>("");
  const [searchRangeFrom, setSearchRangeFrom] = useState<any>();
  const [searchRangeTo, setSearchRangeTo] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  let searchInput = useRef<Input | null>();
  let searchRangeInputFrom = useRef<any>();
  let searchRangeInputTo = useRef<any>();

  const rowSelection: Object = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedUsers(selectedRows);
    },

    getCheckboxProps: (record: any) => ({
      name: record.id
    })
  };

  const getColumnRangeSearchProps = (dataIndex: string) => ({
    filterDropdown: (filterProps: FilterProps) => (
      <div style={{ padding: 8 }}>
        <div>
          <InputNumber
            ref={(node) => {
              searchRangeInputFrom.current = node;
            }}
            placeholder={`From`}
            value={filterProps.selectedKeys[0]}
            onChange={(value) =>
              filterProps.setSelectedKeys(value ? [value] : [])
            }
            // onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              width: 80,
              marginBottom: 8,
              marginRight: 8,
              display: "inline-block"
            }}
          />

          <InputNumber
            ref={(node) => {
              searchRangeInputTo.current = node;
            }}
            placeholder={`To`}
            value={filterProps.selectedKeys[1]}
            onChange={(value) =>
              filterProps.setSelectedKeys(value ? [value] : [])
            }
            // onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 80, marginBottom: 8, display: "inline-block" }}
          />
        </div>
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(
                filterProps.selectedKeys,
                filterProps.confirm,
                dataIndex
              )
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90, display: "block" }}
          >
            Search
          </Button>
        </Space>
      </div>
    )
  });

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: (filterProps: FilterProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={filterProps.selectedKeys[0]}
          onChange={(e) =>
            filterProps.setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(
              filterProps.selectedKeys,
              filterProps.confirm,
              dataIndex
            )
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(
                filterProps.selectedKeys,
                filterProps.confirm,
                dataIndex
              )
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(filterProps.clearFilters)}
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

    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),

    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        console.log("heyy");
      }
    },

    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();

    setSearchText("");
  };

  const tableColumns: ColumnProps<User>[] = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key"
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id")
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
      ...getColumnRangeSearchProps("price")
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
      key: "status",
      render: (text: any, record: any) =>
        text ? (
          <span>
            <span style={{ marginRight: 8 }}>{text}</span>
            <SettingOutlined
              onClick={() => showModal(record)}
            ></SettingOutlined>
          </span>
        ) : (
          "--"
        )
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

  const fetchUsers = (params = {}) => {
    props.firebase.db
      .collection("users")
      .orderBy("platform", "desc")
      .onSnapshot((snapshot: any) => {
        const allUsers = snapshot.docs.map((doc: any, i: number) => ({
          key: i + 1,
          id: doc.id,
          ...doc.data()
        }));
        setUsers(allUsers);
        setLoading(false);
      });
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    fetchUsers({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters
    });
  };

  const showModal = (record: any) => {
    if (record) {
      setSelectedUsers([record]);
    }
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleStatusChange = () => {};

  useEffect(() => {
    setLoading(true);
    fetchUsers({});
    return () => {
      fetchUsers({});
    };
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Modal
        title='Change Status'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedUsers && selectedUsers.length >= 1 ? (
          <>
            <p>
              Selected <strong>{selectedUsers.length}</strong> users
            </p>
            <strong>Set Status: </strong>{" "}
            <Select
              defaultValue='ban'
              style={{ width: 120 }}
              onChange={handleStatusChange}
            >
              <Option value='ban'>Ban</Option>
              <Option value='premium'>Premium</Option>
              <Option value='vip'>VIP</Option>
            </Select>
          </>
        ) : (
          <Alert
            message='Warning'
            type='warning'
            description='Selected 0 users. Please select one or more users to perform action'
          ></Alert>
        )}
      </Modal>
      <div className='buttons' style={{ marginBottom: 12 }}>
        <Button type='primary' style={{ marginRight: 8 }}>
          Send notifications
        </Button>
        <Button type='primary' onClick={() => showModal(null)}>
          Change status
        </Button>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection
        }}
        onChange={handleTableChange}
        loading={loading}
        columns={tableColumns}
        dataSource={users}
        bordered
        pagination={pagination}
        scroll={{ x: "max-content" }}
      ></Table>
    </div>
  );
};
