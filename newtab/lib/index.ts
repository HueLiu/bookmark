import imageToBase64 from "image-to-base64/browser";

export type TreeDataNode = chrome.bookmarks.BookmarkTreeNode;

export const getCopyYear = () => {
  const currentYear = new Date().getFullYear();
  const year = currentYear === 2024 ? "2024" : `2024 - ${currentYear}`;
  return year;
};

type FetchOptions = {
  method?: string;
  headers?: { [key: string]: string };
  body?: any;
};

const fetchWrapper = async (url: string, options: FetchOptions = {}) => {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: options.headers,
    body: options.body
  });

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }

  return response;
};

// icon.horse API 获取 logo URL
const getIconHorseUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname;
  return `https://icon.horse/icon/${domain}`;
};

// Clearbit API 获取 logo URL
const getClearbitLogoUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname;
  return `https://logo.clearbit.com/${domain}`;
};

// Logo dev API 获取 logo URL
const getLogoDevUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname;
  return `https://img.logo.dev/${domain}?token=pk_AHdWjL1KTrSdo9LmnZMeYQ`;
};

// 获取网站的 logo 或 favicon，并进行容错处理
export const getLogoUrl = async (url: string) => {
  try {
    // 尝试使用 icon.horse 获取 logo
    const iconHorseLogoUrl = getIconHorseUrl(url);
    await fetchWrapper(iconHorseLogoUrl); // 检查是否能成功获取
    return iconHorseLogoUrl;
  } catch (error) {
    console.warn(`Icon.horse logo not found for ${url}.`);
    try {
      // 尝试使用 Clearbit 获取 logo
      const clearbitLogoUrl = getClearbitLogoUrl(url);
      await fetchWrapper(clearbitLogoUrl); // 检查是否能成功获取
      return clearbitLogoUrl;
    } catch (error) {
      console.warn(`Clearbit logo not found for ${url}.`);
      try {
        // 尝试使用 Logo.dev 获取 logo
        const logoDevLogoUrl = getLogoDevUrl(url);
        await fetchWrapper(logoDevLogoUrl); // 检查是否能成功获取
        return logoDevLogoUrl;
      } catch (error) {
        console.warn(`Logo.dev logo not found for ${url}.`);
        // 返回默认的 favicon
        return undefined;
      }
    }
  }
};

// 将 Logo 图标转换为 base64 编码
export const logoToBase64 = async (url: string) => {
  try {
    const logoUrl = await getLogoUrl(url);
    if (logoUrl) {
      const image = await imageToBase64(logoUrl);
      return `data:image/png;base64,${image}`;
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to convert logo to base64: ${error}`);
  }
};

const getChromeBookmarks = async () => {
  try {
    const bookmarks: TreeDataNode[] = await new Promise((resolve, reject) => {
      chrome.bookmarks.getTree(bookmarks => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(bookmarks);
        }
      });
    });
    return bookmarks;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
};

const recursiveChange = async <T, U>(
  target: T[],
  transform: (item: T, index: number) => Promise<U>,
  childName: string = "children"
) => {
  return Promise.all(
    target.map(async (item, index) => {
      // Apply the transform function and await its result
      const transformedItem = await transform(item, index);

      // If the transformed item is not an object, return it directly
      if (typeof transformedItem !== "object" || transformedItem === null) {
        return transformedItem;
      }

      // Create a new object only with the transformed item
      let newItem = { ...transformedItem } as unknown as U;

      // Check if a subarray exists in the original item and recurse
      if ((item as any)[childName] && Array.isArray((item as any)[childName])) {
        // Await the result of the recursive call to ensure it's properly resolved
        (newItem as any)[childName] = await recursiveChange(
          (item as any)[childName],
          transform,
          childName
        );
      }

      return newItem;
    })
  );
};

export const getBookmarks = async () => {
  try {
    const result = await getChromeBookmarks();
    if (!result[0].children) return [];

    const bookmarks = await recursiveChange<TreeDataNode, TreeDataNode>(
      [result[0].children[0]],
      async (item, _index: number) => ({
        ...item
      })
    );
    return bookmarks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
