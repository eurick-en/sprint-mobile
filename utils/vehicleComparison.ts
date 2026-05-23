import { Vehicle } from "../types/vehicle";

export function getBestPower(
  vehicles: Vehicle[]
) {
  return vehicles.reduce((best, current) =>
    parseInt(current.power) >
    parseInt(best.power)
      ? current
      : best
  );
}

export function getLowestPrice(
  vehicles: Vehicle[]
) {
  return vehicles.reduce((best, current) =>
    current.price < best.price
      ? current
      : best
  );
}

export function getBestConsumption(
  vehicles: Vehicle[]
) {
  return vehicles.reduce((best, current) =>
    parseInt(current.consumption) >
    parseInt(best.consumption)
      ? current
      : best
  );
}