function loadScript(src) {
   return new Promise((resolve) => {
     const script = document.createElement('script');
     script.src = src;
     script.onload = () => {
       resolve(true);
     }
     script.onerror = () => {
       resolve(false);
     }
     document.body.appendChild(script);
   })
 }

async function testPdfGenerate(pdfVersion){
   await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js");
   console.log({pdfVersion});
   const doc = new window.jspdf.jsPDF();
    
    doc.text("Hello world!", 1, 1);
    doc.save("two-by-four.pdf");
    console.log("test");
}
