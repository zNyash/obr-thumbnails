import type {IBeatmapInfo} from "~/types/IBeatmapInfo";

/**
 * @param md5 The beatmap md5 hash. Example: "73e414af70392b8451127381669959a4"
 * @returns An object containing all information about the beatmap.
 */
export default async (md5: string): Promise<IBeatmapInfo> => {
	const data = await $fetch(`/api/beatmap-by-hash?md5=${md5}`);
	if (!data) console.error("Failed to fetch backend api for 'beatmap-by-hash'");
	const beatmapInfoData: IBeatmapInfo = await data;
	return beatmapInfoData;
};
