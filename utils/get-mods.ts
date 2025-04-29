import { IModBitwise, type TModKey } from "~/types/IModBitwise"

/**
 * @param rawMods Bitwise value of mods combination
 * @returns An array of selected mods. Example: ["HD", "DT"]
 */
export default (rawMods: number | string): TModKey[] => {
  const activeMods: TModKey[] = [] // Active mods array

  for (const modKey in IModBitwise) {
    const modValue = IModBitwise[modKey as TModKey]

    if ((Number(rawMods) & modValue) > 0) {
      activeMods.push(modKey as TModKey)
    }
  }

  if (activeMods.length < 1) {
    activeMods.push("NM")
  }

  return activeMods
}
