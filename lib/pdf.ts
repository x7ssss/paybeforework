import PDFDocument from 'pdfkit';
import { Contract, AuditLog } from '@/db/schema';
import { STATUTORY_SECTIONS, PLATFORM_ROLE_DISCLAIMER } from '@/lib/legal';

export async function generateContractPdf(
  contract: Contract,
  auditLog?: AuditLog | null
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 40,
        size: 'A4',
        info: {
          Title: `Contract-${contract.id} - ${contract.title}`,
          Author: contract.freelancerName,
          Subject: 'Milestone Agreement and Upfront Deposit Invoice',
          Creator: 'PayBeforeWork Protocol',
        },
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const pageWidth = 595.28;
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;

      // ==========================================
      // PAGE 1: SCOPE, DELIVERABLES & FINANCIALS
      // ==========================================

      // Header Banner
      doc
        .rect(margin, margin, contentWidth, 52)
        .fill('#0f172a');

      doc
        .fontSize(16)
        .font('Helvetica-Bold')
        .fillColor('#ffffff')
        .text('PAYBEFOREWORK', margin + 16, margin + 14, {
          characterSpacing: 1.5,
        });

      doc
        .fontSize(8.5)
        .font('Helvetica')
        .fillColor('#94a3b8')
        .text('MILESTONE AGREEMENT & DEPOSIT INVOICE', margin + 16, margin + 33, {
          characterSpacing: 0.5,
        });

      // Status Badge on right of banner
      const isSigned = contract.status === 'signed';
      const badgeText = isSigned ? 'SIGNED & RATIFIED' : 'PENDING RATIFICATION';
      const badgeBg = isSigned ? '#059669' : '#d97706';

      const badgeWidth = 135;
      const badgeX = margin + contentWidth - badgeWidth - 14;
      doc
        .roundedRect(badgeX, margin + 14, badgeWidth, 24, 4)
        .fill(badgeBg);

      doc
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .fillColor('#ffffff')
        .text(badgeText, badgeX, margin + 21, {
          width: badgeWidth,
          align: 'center',
        });

      doc.y = margin + 64;

      // Document Meta Bar
      doc
        .rect(margin, doc.y, contentWidth, 34)
        .fill('#f8fafc');
      doc
        .rect(margin, doc.y, contentWidth, 34)
        .strokeColor('#e2e8f0')
        .stroke();

      const metaY = doc.y + 10;
      doc
        .fontSize(8)
        .font('Helvetica-Bold')
        .fillColor('#64748b')
        .text('CONTRACT ID:', margin + 12, metaY);
      doc
        .fontSize(8.5)
        .font('Courier-Bold')
        .fillColor('#0f172a')
        .text(contract.id, margin + 80, metaY);

      doc
        .fontSize(8)
        .font('Helvetica-Bold')
        .fillColor('#64748b')
        .text('ISSUED BY:', margin + 180, metaY);
      doc
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text(contract.freelancerName, margin + 235, metaY);

      if (contract.freelancerTaxId) {
        doc
          .fontSize(8)
          .font('Helvetica')
          .fillColor('#64748b')
          .text(`(Tax ID: ${contract.freelancerTaxId})`, margin + 340, metaY);
      }

      doc.y = metaY + 28;

      // Project Title & Scope Section
      doc.moveDown(0.4);
      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text(contract.title);

      doc.moveDown(0.2);
      doc
        .fontSize(8)
        .font('Helvetica-Bold')
        .fillColor('#2563eb')
        .text('EXHAUSTIVE SCOPE SUMMARY:');

      doc.moveDown(0.2);
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('#334155')
        .text(contract.scopeSummary, {
          lineGap: 2.5,
        });

      // Itemized Deliverables Checklist
      doc.moveDown(0.6);
      doc
        .fontSize(9.5)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text('Agreed Milestone Deliverables (Defined Scope):');

      let deliverables: string[] = [];
      try {
        deliverables = JSON.parse(contract.deliverables);
      } catch {
        deliverables = [contract.deliverables];
      }

      doc.moveDown(0.3);
      deliverables.forEach((item, index) => {
        const itemY = doc.y;
        doc
          .roundedRect(margin + 6, itemY + 1.5, 9, 9, 2)
          .fillAndStroke('#ecfdf5', '#10b981');

        doc
          .fontSize(7)
          .font('Helvetica-Bold')
          .fillColor('#059669')
          .text('✓', margin + 7.5, itemY + 2);

        doc
          .fontSize(8.5)
          .font('Helvetica')
          .fillColor('#1e293b')
          .text(`${index + 1}.  ${item}`, margin + 22, itemY, {
            width: contentWidth - 28,
            lineGap: 2,
          });
        doc.moveDown(0.2);
      });

      // Financial Breakdown Box
      doc.moveDown(0.6);
      doc
        .fontSize(9.5)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text('Financial Breakdown & Milestone Billing:');

      doc.moveDown(0.3);
      const financeY = doc.y;
      doc
        .rect(margin, financeY, contentWidth, 68)
        .fill('#f8fafc');
      doc
        .rect(margin, financeY, contentWidth, 68)
        .strokeColor('#cbd5e1')
        .stroke();

      const balanceRemaining = Math.max(0, contract.totalAmount - contract.depositAmount);

      // Row 1: Total Contract Value
      doc
        .fontSize(8.5)
        .font('Helvetica')
        .fillColor('#475569')
        .text('Total Contract Value:', margin + 16, financeY + 10);
      doc
        .fontSize(9)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text(
          `${Number(contract.totalAmount).toFixed(2)} ${contract.currency}`,
          margin + contentWidth - 160,
          financeY + 10,
          { width: 144, align: 'right' }
        );

      // Row 2: Upfront Deposit Due
      doc
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .fillColor('#059669')
        .text('Upfront Deposit Required (Work Commences Solely Upon Clearance):', margin + 16, financeY + 28);
      doc
        .fontSize(10.5)
        .font('Helvetica-Bold')
        .fillColor('#059669')
        .text(
          `${Number(contract.depositAmount).toFixed(2)} ${contract.currency}`,
          margin + contentWidth - 160,
          financeY + 27,
          { width: 144, align: 'right' }
        );

      // Row 3: Final Balance
      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#64748b')
        .text('Balance Due Upon Milestone Completion & Sign-off:', margin + 16, financeY + 48);
      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#64748b')
        .text(
          `${balanceRemaining.toFixed(2)} ${contract.currency}`,
          margin + contentWidth - 160,
          financeY + 48,
          { width: 144, align: 'right' }
        );

      doc.y = financeY + 76;

      // Page 1 Footer indicator
      doc.moveDown(0.8);
      doc
        .fontSize(8)
        .font('Helvetica-Oblique')
        .fillColor('#94a3b8')
        .text('Continues on Page 2 with Statutory Terms & Cryptographic Audit Trail →', margin, 780, {
          align: 'center',
          width: contentWidth,
        });

      // ========================================================
      // PAGE 2: STATUTORY BOILERPLATE SECTIONS & AUDIT TRAIL
      // ========================================================
      doc.addPage({ margin: 40, size: 'A4' });

      // Page 2 Header Banner
      doc
        .rect(margin, margin, contentWidth, 32)
        .fill('#0f172a');

      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#ffffff')
        .text('STATUTORY CONTRACT TERMS & PERFORMANCE CONDITIONS', margin + 12, margin + 10, {
          characterSpacing: 0.8,
        });

      doc.y = margin + 44;

      // Render All 4 Statutory Sections from LEGAL_REQUIREMENTS.md
      STATUTORY_SECTIONS.forEach((sec) => {
        const startY = doc.y;

        doc
          .fontSize(8.5)
          .font('Helvetica-Bold')
          .fillColor('#1e40af')
          .text(`${sec.code}: ${sec.title}`, margin, startY);

        doc.moveDown(0.2);
        doc
          .fontSize(8)
          .font('Helvetica')
          .fillColor('#334155')
          .text(sec.content, margin, doc.y, {
            width: contentWidth,
            lineGap: 2.5,
            align: 'justify',
          });

        doc.moveDown(0.5);
      });

      // Cryptographic Audit Trail Box
      doc.moveDown(0.4);
      const auditY = doc.y;
      const auditBoxHeight = isSigned ? 84 : 56;

      doc
        .rect(margin, auditY, contentWidth, auditBoxHeight)
        .fill('#f1f5f9');
      doc
        .rect(margin, auditY, contentWidth, auditBoxHeight)
        .strokeColor('#cbd5e1')
        .stroke();

      doc
        .fontSize(8)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text('CRYPTOGRAPHIC AUDIT TRAIL & EXECUTION VERIFICATION', margin + 12, auditY + 8);

      doc
        .fontSize(7)
        .font('Courier')
        .fillColor('#475569')
        .text(`SHA-256 HASH: ${contract.termsHash}`, margin + 12, auditY + 20);

      if (isSigned) {
        doc
          .fontSize(7.5)
          .font('Helvetica-Bold')
          .fillColor('#059669')
          .text(`RATIFIED & ELECTRONICALLY SIGNED UNDER ESIGN, UETA & eIDAS`, margin + 12, auditY + 32);

        doc
          .fontSize(7.5)
          .font('Helvetica')
          .fillColor('#334155')
          .text(
            `Signer: ${contract.signerName || 'N/A'} <${contract.signerEmail || 'N/A'}>\n` +
            `Timestamp: ${contract.signedAt || auditLog?.signedAt || 'N/A'} (UTC)\n` +
            `Network Audit: IP ${contract.signerIp || auditLog?.ipAddress || 'Verified'} | Agent: ${(contract.signerUserAgent || auditLog?.userAgent || 'Verified').slice(0, 75)}`,
            margin + 12,
            auditY + 44,
            { lineGap: 2 }
          );
      } else {
        doc
          .fontSize(7.5)
          .font('Helvetica-Bold')
          .fillColor('#d97706')
          .text('STATUS: PENDING CLIENT SIGNATURE & UPFRONT DEPOSIT CLEARANCE', margin + 12, auditY + 32);
        doc
          .fontSize(7)
          .font('Helvetica')
          .fillColor('#64748b')
          .text(
            'This contract has been cryptographically prepared with SHA-256 integrity protection and awaits execution.',
            margin + 12,
            auditY + 43
          );
      }

      // Mandatory Platform Role Disclaimer at footer of Page 2
      doc
        .fontSize(7)
        .font('Helvetica-Oblique')
        .fillColor('#64748b')
        .text(PLATFORM_ROLE_DISCLAIMER, margin, 785, {
          width: contentWidth,
          align: 'center',
          lineGap: 1.5,
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
