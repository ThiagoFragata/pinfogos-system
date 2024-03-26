import html2pdf from 'html2pdf.js'

export function PDFGenerator() {
  const input = document.getElementById('pdf-content')

  if (input) {
    const options = {
      margin: 16,
      filename: 'nota-download.pdf',
      jsPDF: {
        format: 'a4',
        orientation: 'portrait'
      }
    }

    html2pdf().set(options).from(input).save()
  }
}
