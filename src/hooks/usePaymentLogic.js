import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; 

export const usePaymentLogic = () => {
  const [loading, setLoading] = useState(false);

  const generatePDF = (orderData) => {
    try {
      
      const doc = new jsPDF();

     
      doc.setFontSize(18);
      doc.setTextColor(45, 90, 67); 
      doc.text("NOTA PESANAN - UD BAROKAH", 14, 20);

      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Kepada Yth : ${orderData?.customerName || 'Pelanggan'}`, 14, 30);
      doc.text(`Metode     : ${orderData?.method || '-'}`, 14, 35);
      doc.text(`Alamat     : ${orderData?.address || '-'}`, 14, 40);
      doc.text(`Tanggal    : ${new Date().toLocaleDateString('id-ID')}`, 14, 45);

      
      const items = Array.isArray(orderData?.items) ? orderData.items : [];
      const tableRows = items.map((item, index) => [
        index + 1,
        item.name || 'Produk Tanpa Nama',
        `${item.quantity || 1}x`,
        item.price || '-'
      ]);

     
      autoTable(doc, {
        head: [['No', 'Deskripsi Barang', 'Qty', 'Subtotal']],
        body: tableRows,
        startY: 55,
        theme: 'grid',
        headStyles: { fillColor: [45, 90, 67], halign: 'center' },
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          2: { cellWidth: 20, halign: 'center' },
        }
      });

      
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`TOTAL TAGIHAN : ${orderData?.total || '0'}`, 14, finalY);
      
      doc.setFontSize(8);
      doc.setFont(undefined, 'italic');
      doc.text("*Nota ini adalah bukti pesanan sah dari UD BAROKAH.", 14, finalY + 10);

     
      const fileName = `Nota_${(orderData?.customerName || 'Order').replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
      
      return true;
    } catch (err) {
      console.error("CRITICAL ERROR PDF:", err);
      return false;
    }
  };

  const processOrder = async (orderData) => {
    setLoading(true);
    

    const pdfStatus = generatePDF(orderData);

  
    try {
      const message = `Halo Admin UD Barokah, saya *${orderData.customerName}*.\nBaru saja membuat pesanan dengan total *${orderData.total}*.\n\nNota PDF telah disimpan di perangkat saya. Mohon segera dicek!`;
      const whatsappURL = `https://wa.me/6281806192283?text=${encodeURIComponent(message)}`;
      
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        setLoading(false);
      }, 1200);

    } catch (error) {
      console.error("WA Error:", error);
      setLoading(false);
    }
  };

  return { processOrder, loading };
};