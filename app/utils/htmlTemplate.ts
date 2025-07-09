interface SaleDeedData {
  name: string;
  father_name: string;
  sale_amount: string;
  property_size: string;
  date: string;
}

export const generateHTML = (data: SaleDeedData) => {
  return `
    <html>
      <head>
        <style>
          body { font-family: 'Georgia', serif; line-height: 1.6; padding: 40px; color: #333; }
          h2 { text-align: center; }
          p { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h2>Sale Deed Agreement</h2>
        <p>
          This Sale Deed is made and entered into on <strong>${data.date}</strong>, by and between
          <strong>${data.name}</strong>, son of <strong>${data.father_name}</strong>, hereinafter referred to as "the Seller".
        </p>
        <p>
          The Seller affirms that he is the lawful owner of the property measuring <strong>${data.property_size}</strong> sq.ft.
          and has agreed to sell the said property for a total consideration of ₹<strong>${data.sale_amount}</strong>.
        </p>
        <p>
          Both parties hereby agree to abide by the terms and conditions laid out in this deed and acknowledge
          the transfer of ownership upon full and final payment.
        </p>
        <p>
          In witness whereof, both parties have set their hands to this Sale Deed on the date mentioned above.
        </p>
      </body>
    </html>
  `;
};