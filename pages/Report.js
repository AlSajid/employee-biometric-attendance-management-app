import { Document, Page, View, Text, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const MyDoc = () => (

    <Document>
        <Page size="A4">
            <View>
                <Text>Section #1</Text>
            </View>
            <View>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>
);

export default function App() {
    const [pdf, setPdf] = useState(null)
    const [date, setDate] = useState(null)

    useEffect(() => {
        if(!date) return;

        fetch("http://localhost:3000/api/dailyReport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({date})
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        setPdf(
            <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download Report'
                }
            </PDFDownloadLink>
        )
    }, [date])

    return (
        <div className="flex w-10/12">
            <input type="date" className="w-1/2" onChange={(e) => setDate(e.target.value)} />
            <button>{pdf}</button>
            {/* <PDFViewer>
                <MyDoc />
            </PDFViewer> */}
        </div>
    );
}