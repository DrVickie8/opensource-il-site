import { Organization } from './../../../../types/index.type';
import { extractLastParamFromUrl } from '@/server/utils/extractParamFromUrl';
import { logger } from '@/server/utils/logger';
import getUuid from '@/server/utils/uuid';
import { NextRequest, NextResponse } from 'next/server';
import { fetchCompany } from '@/server/services/dataManager.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const uuid = getUuid();
  const companyId = extractLastParamFromUrl(req);
  if (!companyId) {
    logger.error('missing companyId', { companyId });
    return NextResponse.json({ error: 'no valid companyid' });
  }
  const company = await fetchCompany(companyId);
  const payload = {
    uuid,
    company: company || null,
    companyName: company?.organization?.name || '',
    success: !!company
  };
  logger.info('request company', payload.companyName);
  return NextResponse.json(payload);
}
