import { ResourceItem } from '../types';

export function triggerResourceDownload(resource: ResourceItem) {
  const fileContent = `================================================================================
${resource.cardHeadline.toUpperCase()}
Resource #${resource.resourceNumber} | Framework: ${resource.category}
================================================================================

${resource.cardBody}

${resource.covers ? `COVERS: ${resource.covers}\n` : ''}
${resource.includes ? `INCLUDES: ${resource.includes}\n` : ''}
${resource.footerNote ? `NOTE: ${resource.footerNote}\n` : ''}

KEY HIGHLIGHTS:
${resource.fullContent.keyTakeaways.map((k) => `• ${k}`).join('\n')}

================================================================================
DOCUMENT FULL TEXT & PROTOCOL
================================================================================

${resource.fullContent.documentContent}

================================================================================
Delivered via The Playbook Resources Program.
Three-Gap Rotation Nurture Sequence Active (Desire / Ability / Context).
After you download, you'll hear from us with more resources like this. Useful frameworks, not sales pressure.
================================================================================
`;

  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const sanitizedTitle = resource.cardHeadline
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
  link.download = `${resource.id}-${sanitizedTitle}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
