import getTime from "@/utilities/getTime";
import {
  Document,
  Page,
  View,
  Text,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  //596 x 842
  table: {
    display: "table",
    width: "548",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: "7px 0px",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  tableCol: {
    borderStyle: "solid",
    borderBottomWidth: 0.5,
    borderRightWidth: 1,
  },
  tableCellHeader: {
    margin: 3,
    fontSize: 10,
    fontWeight: 500,
    textAlign: "center",
  },
  tableCell: {
    margin: 1,
    fontSize: 10,
    textAlign: "center",
  },
});

const options = [
  {
    header: "Sl",
    width: 35,
  },
  {
    header: "Id",
    name: "id",
    width: 50,
  },
  {
    header: "Name",
    name: "name",
    width: 152,
  },
  {
    header: "Department",
    name: "department",
    width: 70,
  },
  {
    header: "Designation",
    name: "designation",
    width: 70,
  },
  {
    header: "In",
    name: "in",
    width: 60,
  },
  {
    header: "Out",
    name: "out",
    width: 60,
  },
  {
    header: "Signature",
    width: 51,
  },
];

const MyDoc = ({ company, users, date }) => (
  <Document>
    <Page size="A4" style={{ margin: 24 }}>
      <View style={{ width: "548" }}>
        <View style={{ margin: "3 0", textAlign: "center" }}>
          <Text style={{ fontSize: 12 }}>{company?.name}</Text>
          <Text style={{ fontSize: 10 }}>{company?.address}</Text>
        </View>

        <View style={{ margin: "3 0px" }}>
          <Text style={{ fontSize: 10 }}>Daily Present Report</Text>
          <Text style={{ fontSize: 10 }}>Date:{getTime(date, "date")}</Text>
        </View>

        {/* table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {options.map((data, index) => (
              <View
                style={{ ...styles.tableColHeader, width: data.width }}
                key={index}
              >
                <Text style={styles.tableCellHeader}>{data.header}</Text>
              </View>
            ))}
          </View>

          {users?.map((info, i) => (
            <View style={styles.tableRow} key={i}>
              {options.map((data, index) => (
                <View
                  style={{ ...styles.tableCol, width: data.width }}
                  key={index}
                >
                  <Text style={styles.tableCell}>
                    {index === 0
                      ? i + 1
                      : data.name === "in" || data.name === "out"
                      ? getTime(info[data.name], "time")
                      : info[data.name]}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default function Report({ users }) {
  const [pdfBtn, setPdfBtn] = useState(null);
  const [date, setDate] = useState(getTime(new Date(), "input"));

  useEffect(() => {
    if (!date) return;

    fetch("http://localhost:7777/api/dailyReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPdfBtn(
          <>
            <PDFDownloadLink
              document={
                <MyDoc company={data.company} users={data.users} date={date} />
              }
              fileName={`${getTime(date, "date")}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <button className="w-full h-5/6">Daily Report</button>
                )
              }
            </PDFDownloadLink>
          </>
        );
      })
      .catch((err) => console.log(err));
  }, [date, users]);

  return (
    <div className="flex">
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      {pdfBtn && <div>{pdfBtn}</div>}
    </div>
  );
}
