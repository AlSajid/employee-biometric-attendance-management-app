import { Document, Page, Text, BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const MyDocument = () => (
    <Document>
        <Page>
            <Text>Hello World!</Text>
        </Page>
    </Document>
);


export default function Pdf() {
    const [pdf, setPdf] = useState(null);
    useEffect(() => {
        setPdf(
            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>)
    }, []);

    return (
        <div>
            {pdf}
        </div>
    )
};

