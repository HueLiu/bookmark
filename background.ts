console.log("Welcom to FTab!");

// const updateBookmarksLogo = async (
//   bookmarks: chrome.bookmarks.BookmarkTreeNode[]
// ) => {
//   for (const bookmark of bookmarks) {
//     if (bookmark.children && bookmark.children.length > 0) {
//       updateBookmarksLogo(bookmark.children);
//     }
//     if (bookmark.url) {
//       const logoUrl = await getLogoUrl(bookmark.url);
//       if (logoUrl) {
//         await localForage.setItem(bookmark.id, logoUrl);
//       }
//     }
//   }
// };

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed");
//   chrome.bookmarks.getTree(async bookmarks => {
//     await updateBookmarksLogo(bookmarks);
//   });
// });

// chrome.bookmarks.onChanged.addListener((id: string, changeInfo: object) => {
//   console.log("bookmark onChanged", id, changeInfo);
// });
// chrome.bookmarks.onChildrenReordered.addListener(
//   (id: string, reorderInfo: object) => {
//     console.log("bookmark onChildrenReordered", id, reorderInfo);
//   }
// );
// chrome.bookmarks.onCreated.addListener(async (id: string, bookmark: any) => {
//   console.log("bookmark onCreated", id, bookmark);
// });
// chrome.bookmarks.onMoved.addListener((id: string, moveInfo: object) => {
//   console.log("bookmark onMoved", id, moveInfo);
// });
// chrome.bookmarks.onRemoved.addListener(
//   async (id: string, removeInfo: object) => {
//     if (id) {
//       await localForage.removeItem(id);
//     }
//   }
// );
