const fs = require('fs');
const path = require('path');

// Helper to escape PDF text string parentheses
function escapePDFText(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

// Heuristic to estimate text width in Helvetica
function getEstimateWidth(text, size) {
  // Average width of Helvetica char is ~0.55 of font size
  return text.length * size * 0.52;
}

const lines = [
  { text: "Kushal Tripathi", font: "bold", size: 18, center: true, spaceBefore: 0 },
  { text: "Mathura, Uttar Pradesh, India | kushal.tripathi2006@gmail.com | LinkedIn", font: "regular", size: 9, center: true, spaceBefore: 12 },
  
  { text: "Summary", font: "bold", size: 11, spaceBefore: 16, drawLine: true },
  { text: "Computer Science undergraduate with strong foundations in Java, JavaScript, Python, HTML, CSS and Data Structures & Algorithms. Experienced in developing responsive web applications, debugging software and applying object-oriented programming through academic projects and software engineering simulations. Passionate about software development and eager to contribute to collaborative engineering teams.", font: "regular", size: 8.5, spaceBefore: 8, isParagraph: true },
  
  { text: "Education", font: "bold", size: 11, spaceBefore: 15, drawLine: true },
  { text: "GL Bajaj Group of Institutions", rightText: "2024–2028", font: "bold", size: 9, spaceBefore: 8 },
  { text: "Bachelor of Technology in Computer Science & Engineering (AI & ML)", font: "regular-italic", size: 8.5, spaceBefore: 4 },
  { text: "City Montessori School", rightText: "Graduated 2024", font: "bold", size: 9, spaceBefore: 6 },
  
  { text: "Technical Skills", font: "bold", size: 11, spaceBefore: 15, drawLine: true },
  { text: "Programming Languages: Java, JavaScript, Python, C", font: "regular", size: 8.5, spaceBefore: 8 },
  { text: "Web Development: HTML5, CSS3, JavaScript, React, Responsive Web Design", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "Software Development: Data Structures & Algorithms, OOP, SDLC, Debugging, Code Review, Problem Solving", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "Tools: Git, GitHub, IntelliJ IDEA, VS Code, AWS Elastic Beanstalk, UML, ER Diagrams", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Projects", font: "bold", size: 11, spaceBefore: 15, drawLine: true },
  { text: "CivicAI – AI-Powered Digital Governance Platform", rightText: "GitHub | Live Demo", font: "bold", size: 9, spaceBefore: 8 },
  { text: "• Built a production-ready Generative AI platform that simplifies citizen access to government services.", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Enabled citizens to report civic issues and receive personalized assistance through an intelligent AI companion.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Student Management System", font: "bold", size: 9, spaceBefore: 6 },
  { text: "• Developed a responsive Student Management System using HTML, CSS and JavaScript.", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Implemented CRUD functionality, search, Local Storage, DOM manipulation, event handling and form validation.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Cyborg Landing Page (IIT Bombay Campus Ambassador Program)", rightText: "Live Demo", font: "bold", size: 9, spaceBefore: 6 },
  { text: "• Developed a responsive promotional landing page using HTML, CSS and JavaScript.", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Designed engaging UI sections, responsive navigation and interactive frontend components.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Nike Shoes Landing Page", rightText: "Live Demo", font: "bold", size: 9, spaceBefore: 6 },
  { text: "• Developed a responsive e-commerce landing page using HTML, CSS and JavaScript.", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Implemented mobile-first responsive layouts and interactive UI components.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Personal Portfolio Website", rightText: "Live Demo", font: "bold", size: 9, spaceBefore: 6 },
  { text: "• Designed and deployed a responsive portfolio website showcasing projects, certifications and skills.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Professional Experience", font: "bold", size: 11, spaceBefore: 15, drawLine: true },
  { text: "Walmart Global Tech", rightText: "November 2025", font: "bold", size: 9, spaceBefore: 8 },
  { text: "Advanced Software Engineering Job Simulation", font: "regular-italic", size: 8.5, spaceBefore: 3 },
  { text: "• Developed a custom heap data structure in Java to optimize shipping operations.", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Designed UML class diagrams and Entity Relationship diagrams for scalable software systems.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Datacom", rightText: "October 2025", font: "bold", size: 9, spaceBefore: 6 },
  { text: "Software Development Job Simulation", font: "regular-italic", size: 8.5, spaceBefore: 3 },
  { text: "• Performed code reviews to identify software defects and improve application quality.", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Debugged web application issues and suggested improvements for maintainability and performance.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Amazon Web Services", rightText: "October 2025", font: "bold", size: 9, spaceBefore: 6 },
  { text: "Solutions Architecture Job Simulation", font: "regular-italic", size: 8.5, spaceBefore: 3 },
  { text: "• Designed scalable cloud architecture using AWS Elastic Beanstalk.", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Prepared technical documentation explaining architecture and optimization decisions.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Tata Group", rightText: "April 2026", font: "bold", size: 9, spaceBefore: 6 },
  { text: "GenAI Powered Data Analytics", font: "regular-italic", size: 8.5, spaceBefore: 3 },
  { text: "• Applied Generative AI tools to analyze datasets and generate actionable insights.", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Achievements", font: "bold", size: 11, spaceBefore: 15, drawLine: true },
  { text: "• 2nd Runner Up – N8N Hackathon 2025", font: "regular", size: 8.5, spaceBefore: 8 },
  { text: "• Most Innovative Solution Award – HackAura Hackathon 2025", font: "regular", size: 8.5, spaceBefore: 4 },
  
  { text: "Certifications", font: "bold", size: 11, spaceBefore: 15, drawLine: true },
  { text: "• Walmart USA – Advanced Software Engineering Job Simulation", font: "regular", size: 8.5, spaceBefore: 8 },
  { text: "• Datacom – Software Development Job Simulation", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• AWS – Solutions Architecture Job Simulation", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Python Essentials 1", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• Tata – GenAI Powered Data Analytics Job Simulation", font: "regular", size: 8.5, spaceBefore: 4 },
  { text: "• AI Tools Workshop", font: "regular", size: 8.5, spaceBefore: 4 }
];

// Page layout constants
const pageHeight = 792;
const pageWidth = 612;
const topMargin = 30; // Closer margins to fit cleanly on a single page
const bottomMargin = 30;

const pagesData = [];
let currentPageTextStreams = [];
let currentY = pageHeight - topMargin; // 762

for (const line of lines) {
  if (line.isParagraph) {
    const words = line.text.split(' ');
    let currentLineText = '';
    const wrappedLines = [];
    
    // Fit text width perfectly
    for (const word of words) {
      if ((currentLineText + word).length > 105) {
        wrappedLines.push(currentLineText.trim());
        currentLineText = word + ' ';
      } else {
        currentLineText += word + ' ';
      }
    }
    if (currentLineText) {
      wrappedLines.push(currentLineText.trim());
    }

    let firstParaLine = true;
    for (const wLine of wrappedLines) {
      const space = firstParaLine ? line.spaceBefore : 11;
      firstParaLine = false;
      if (currentY - space < bottomMargin) {
        pagesData.push(currentPageTextStreams);
        currentPageTextStreams = [];
        currentY = pageHeight - topMargin;
      }
      currentY -= space;
      currentPageTextStreams.push({
        text: wLine,
        font: line.font,
        size: line.size,
        y: currentY
      });
    }
  } else {
    if (currentY - line.spaceBefore < bottomMargin) {
      pagesData.push(currentPageTextStreams);
      currentPageTextStreams = [];
      currentY = pageHeight - topMargin;
    }
    currentY -= line.spaceBefore;
    currentPageTextStreams.push({
      text: line.text,
      rightText: line.rightText,
      font: line.font,
      size: line.size,
      center: line.center,
      drawLine: line.drawLine,
      y: currentY
    });
  }
}
if (currentPageTextStreams.length > 0) {
  pagesData.push(currentPageTextStreams);
}

// Generate PDF binary structure
// Font resources:
// /F1: Helvetica
// /F2: Helvetica-Bold
// /F3: Helvetica-Oblique
let objectIndex = 7;
const pageObjects = [];
const contentStreamObjects = [];

for (let p = 0; p < pagesData.length; p++) {
  const pageIdx = objectIndex;
  const streamIdx = objectIndex + 1;
  objectIndex += 2;
  pageObjects.push(pageIdx);
  
  // Build stream content using relative coordinate changes
  let streamText = "";
  let prevY = pageHeight;
  let inText = false;
  
  for (const item of pagesData[p]) {
    // If we need to draw a horizontal line, we close the text object, draw it, and open text object again
    if (item.drawLine) {
      if (inText) {
        streamText += "ET\n";
        inText = false;
      }
      // Draw horizontal line slightly below the heading
      const lineY = item.y - 3;
      streamText += `0.5 w\n54 ${lineY} m\n558 ${lineY} l\nS\n`;
      prevY = lineY; // update previous Y position
    }
    
    if (!inText) {
      streamText += "BT\n";
      inText = true;
    }

    // Determine font family
    let fontRef = "/F1";
    if (item.font === "bold") fontRef = "/F2";
    else if (item.font === "regular-italic") fontRef = "/F3";

    // X offsets for center, right, and standard alignments
    let startX = 54;
    if (item.center) {
      startX = Math.floor((pageWidth - getEstimateWidth(item.text, item.size)) / 2);
    }
    
    // Relative coordinates calculation
    const dy = item.y - prevY;
    const dx = startX; // Note: We start new text layouts using Td relative to previous position or origin.
    // In PDF, to do absolute coordinates inside BT/ET we can use Td relative to preceding Td.
    // However, it's easier to write `1 0 0 1 X Y Tm` (Text Matrix) to set absolute X, Y coordinates!
    // `X Y Tm` sets the text position absolutely on the page, independent of any previous Td offsets!
    // This is 100% clean, robust, and avoids complex relative calculations!
    streamText += `${fontRef} ${item.size} Tf\n`;
    streamText += `1 0 0 1 ${startX} ${item.y} Tm\n`;
    streamText += `(${escapePDFText(item.text)}) Tj\n`;
    
    // If there is right-aligned text (e.g. dates or links)
    if (item.rightText) {
      const rightX = Math.floor(558 - getEstimateWidth(item.rightText, item.size));
      streamText += `1 0 0 1 ${rightX} ${item.y} Tm\n`;
      streamText += `(${escapePDFText(item.rightText)}) Tj\n`;
    }
    
    prevY = item.y;
  }
  
  if (inText) {
    streamText += "ET";
  }
  
  contentStreamObjects.push({
    index: streamIdx,
    content: streamText
  });
}

// Write the PDF file
const pdfFile = path.join(__dirname, '../public/assets/resume.pdf');
const wStream = fs.createWriteStream(pdfFile);

wStream.write("%PDF-1.4\n");

const offsets = [];

function writeObject(num, body) {
  offsets[num] = wStream.bytesWritten;
  wStream.write(`${num} 0 obj\n${body}\nendobj\n`);
}

writeObject(1, "<< /Type /Catalog /Pages 3 0 R /Outlines 2 0 R >>");
writeObject(2, "<< /Type /Outlines /Count 0 >>");

const kidsStr = pageObjects.map(idx => `${idx} 0 R`).join(' ');
writeObject(3, `<< /Type /Pages /Kids [ ${kidsStr} ] /Count ${pageObjects.length} >>`);

writeObject(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
writeObject(5, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
writeObject(6, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>");

for (let p = 0; p < pagesData.length; p++) {
  const pageIdx = pageObjects[p];
  const streamIdx = contentStreamObjects[p].index;
  const streamBody = contentStreamObjects[p].content;
  
  writeObject(pageIdx, `<< /Type /Page /Parent 3 0 R /MediaBox [ 0 0 612 792 ] /Contents ${streamIdx} 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> >>`);
  writeObject(streamIdx, `<< /Length ${Buffer.byteLength(streamBody)} >>\nstream\n${streamBody}\nendstream`);
}

const startXref = wStream.bytesWritten;
wStream.write("xref\n");
wStream.write(`0 ${objectIndex}\n`);
wStream.write("0000000000 65535 f \n");
for (let i = 1; i < objectIndex; i++) {
  const offset = offsets[i] || 0;
  const offsetStr = String(offset).padStart(10, '0');
  wStream.write(`${offsetStr} 00000 n \n`);
}

wStream.write("trailer\n");
wStream.write(`<< /Size ${objectIndex} /Root 1 0 R >>\n`);
wStream.write("startxref\n");
wStream.write(`${startXref}\n`);
wStream.write("%%EOF\n");

wStream.end();
console.log("Professional PDF Resume successfully updated!");
