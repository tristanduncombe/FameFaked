export const getFetcher = async (url: string, cookie?: string) => {
  const resp = await fetch(
    `${process.env.API_URL || process.env.REACT_APP_BASE_URL}${url}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie || "",
      },
      credentials: "include",
    }
  );

  const respJSON = await resp.json();

  return respJSON;
};

export async function getVideos(): Promise<any> {
  return await getFetcher("/famevideo/random");
}

export async function getVideosByRegion(region: string): Promise<any> {
  return await getFetcher(`/famevideo/region/${region}`);
}

export async function getRegions(): Promise<any> {
  return await getFetcher("/famevideo/regions");
}
