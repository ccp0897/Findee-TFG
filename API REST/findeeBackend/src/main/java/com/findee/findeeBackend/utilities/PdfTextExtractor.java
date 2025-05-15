package com.findee.findeeBackend.utilities;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.InputStream;

@Component
public class PdfTextExtractor {

    /**
     * Extrae texto de un archivo PDF
     * @param pdfStream InputStream del archivo PDF
     * @return Texto extraído del PDF
     * @throws IOException Si hay error leyendo el archivo
     */
    public String extractText(InputStream pdfStream) throws IOException {
        try (PDDocument document = PDDocument.load(pdfStream)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        }
    }
}