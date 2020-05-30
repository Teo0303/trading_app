import React from "react";

import { modifyTime } from "./helperFunctions";

export const columns = [
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
    key: "price"
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
      let datetime = new Date(date.seconds * 1000).toDateString();

      return <span>{datetime}</span>;
    }
  },
  {
    title: "Ads Count",
    dataIndex: "adsCount",
    key: "adsCount"
  }
];
