import React, { useState, useEffect } from "react";
// import { db } from "../services/Firebase/firebase";
import { Table } from "antd";
import { User } from "../types/primaryTypes";
import { columns } from "../helpers/tableColumns";

type Users = User[];

const rowSelection: Object = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`);
  },

  getCheckboxProps: (record: any) => ({
    name: record.id
  })
};

export const UsersList: React.FC<{}> = (props: any) => {
  const [users, setUsers] = useState<Users | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination] = useState({ current: 1, pageSize: 10 });

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
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection
        }}
        onChange={handleTableChange}
        loading={loading}
        columns={columns}
        dataSource={users}
        bordered
        pagination={pagination}
        scroll={{ x: "max-content" }}
      ></Table>
    </div>
  );
};
