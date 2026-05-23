import { create } from "zustand";

import { Vehicle } from "../types/vehicle";

interface VehicleStore {
  selectedVehicles: Vehicle[];

  favoriteVehicles: Vehicle[];

  selectedAttributes: string[];

  addVehicle: (vehicle: Vehicle) => void;

  removeVehicle: (id: string) => void;

  clearVehicles: () => void;

  toggleFavorite: (
    vehicle: Vehicle
  ) => void;

  toggleAttribute: (
    attribute: string
  ) => void;
}

export const useVehicleStore =
  create<VehicleStore>((set) => ({
    selectedVehicles: [],

    favoriteVehicles: [],

    selectedAttributes: [
      "power",
      "price",
      "consumption",
    ],

    addVehicle: (vehicle) =>
      set((state) => {
        const alreadyExists =
          state.selectedVehicles.find(
            (item) =>
              item.id === vehicle.id
          );

        if (alreadyExists) {
          return state;
        }

        if (
          state.selectedVehicles.length >=
          2
        ) {
          return state;
        }

        return {
          selectedVehicles: [
            ...state.selectedVehicles,
            vehicle,
          ],
        };
      }),

    removeVehicle: (id) =>
      set((state) => ({
        selectedVehicles:
          state.selectedVehicles.filter(
            (item) =>
              item.id !== id
          ),
      })),

    clearVehicles: () =>
      set({
        selectedVehicles: [],
      }),

    toggleFavorite: (vehicle) =>
      set((state) => {
        const alreadyExists =
          state.favoriteVehicles.find(
            (item) =>
              item.id === vehicle.id
          );

        if (alreadyExists) {
          return {
            favoriteVehicles:
              state.favoriteVehicles.filter(
                (item) =>
                  item.id !==
                  vehicle.id
              ),
          };
        }

        return {
          favoriteVehicles: [
            ...state.favoriteVehicles,
            vehicle,
          ],
        };
      }),

    toggleAttribute: (
      attribute
    ) =>
      set((state) => {
        const exists =
          state.selectedAttributes.includes(
            attribute
          );

        if (exists) {
          return {
            selectedAttributes:
              state.selectedAttributes.filter(
                (item) =>
                  item !== attribute
              ),
          };
        }

        return {
          selectedAttributes: [
            ...state.selectedAttributes,
            attribute,
          ],
        };
      }),
  }));