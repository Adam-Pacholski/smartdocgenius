
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { DocumentTemplate } from '@/lib/templates';

// Register fonts
Font.register({
  family: 'Arial',
  src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkw.ttf',
});

// This component is no longer used - PDF generation is handled by DocumentPreview component
// It's kept for reference only
interface DocumentPdfGeneratorProps {
  template: DocumentTemplate;
  formData: Record<string, string>;
  config?: Record<string, any>;
}

const DocumentPdfGenerator: React.FC<DocumentPdfGeneratorProps> = ({ template, formData, config }) => {
  // Generate PDF document based on the template
  const generatePdfDocument = () => {
    const PdfDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.pdfContent}>
            <Text>{template.name}</Text>
            {/* We can't use dangerouslySetInnerHTML with react-pdf */}
            {/* Instead, we'd need to convert the HTML to react-pdf compatible components */}
            <Text>This is a simplified version of the document. HTML conversion would require custom parsing.</Text>
          </View>
        </Page>
      </Document>
    );

    return PdfDocument;
  };

  const fileName = `${formData.firstName || 'Document'}_${formData.lastName || ''}_${new Date().toISOString().slice(0, 10)}.pdf`;
  const PdfDoc = generatePdfDocument();

  return (
    <PDFDownloadLink
      document={<PdfDoc />}
      fileName={fileName}
      style={{
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {({ loading }) => (loading ? 'Generowanie PDF...' : 'Pobierz PDF')}
    </PDFDownloadLink>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  pdfContent: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default DocumentPdfGenerator;
