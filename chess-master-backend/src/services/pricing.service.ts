import { AppDataSource } from "../database/datasource";
import { MasterPricing } from "../database/entity/master-pricing";
import { User } from "../database/entity/user";

export interface PricingData {
  price5min?: number | null;
  price10min?: number | null;
  price15min?: number | null;
  price30min?: number | null;
  price45min?: number | null;
  price60min?: number | null;
}

export interface SafePricing {
  price5min: number | null;
  price10min: number | null;
  price15min: number | null;
  price30min: number | null;
  price45min: number | null;
  price60min: number | null;
}

/**
 * Format pricing to exclude sensitive data
 */
export function formatPricing(pricing: MasterPricing | null): SafePricing | null {
  if (!pricing) return null;
  
  return {
    price5min: pricing.price5min,
    price10min: pricing.price10min,
    price15min: pricing.price15min,
    price30min: pricing.price30min,
    price45min: pricing.price45min,
    price60min: pricing.price60min,
  };
}

/**
 * Get or create pricing for a master
 */
export async function getOrCreatePricing(
  masterId: number
): Promise<MasterPricing> {
  const pricingRepo = AppDataSource.getRepository(MasterPricing);
  
  let pricing = await pricingRepo.findOne({
    where: { masterId },
  });

  if (!pricing) {
    pricing = pricingRepo.create({
      masterId,
      price5min: null,
      price10min: null,
      price15min: null,
      price30min: null,
      price45min: null,
      price60min: null,
    });
    await pricingRepo.save(pricing);
  }

  return pricing;
}

/**
 * Update pricing for a master
 */
export async function updatePricing(
  masterId: number,
  data: PricingData
): Promise<MasterPricing> {
  const pricingRepo = AppDataSource.getRepository(MasterPricing);
  
  let pricing = await pricingRepo.findOne({
    where: { masterId },
  });

  if (!pricing) {
    pricing = pricingRepo.create({
      masterId,
      ...data,
    });
  } else {
    if (data.price5min !== undefined) pricing.price5min = data.price5min;
    if (data.price10min !== undefined) pricing.price10min = data.price10min;
    if (data.price15min !== undefined) pricing.price15min = data.price15min;
    if (data.price30min !== undefined) pricing.price30min = data.price30min;
    if (data.price45min !== undefined) pricing.price45min = data.price45min;
    if (data.price60min !== undefined) pricing.price60min = data.price60min;
  }

  return await pricingRepo.save(pricing);
}

/**
 * Get pricing for a master
 */
export async function getPricingByMaster(
  masterId: number
): Promise<MasterPricing | null> {
  const pricingRepo = AppDataSource.getRepository(MasterPricing);
  return await pricingRepo.findOne({
    where: { masterId },
  });
}

