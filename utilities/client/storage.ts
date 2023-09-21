export const addItemToLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event("storage"));
};

export const removeItemFromLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
  window.dispatchEvent(new Event("storage"));
};

export const localStorageRefresher = (
  key: string,
  cb: (...args: any) => any
) => {
  console.log("localStorageRefresher", "key", key, "cb", cb);
  const token = localStorage.getItem(key);
  if (token) {
    cb(token);
  }
  // Respond to the `storage` event
  function storageEventHandler(event: StorageEvent) {
    console.log("storageEventHandler", event);
    if (event.type === "storage") {
      const newValue = localStorage.getItem(key);
      cb(newValue || "");
    }
  }
  // Hook up the event handler
  window.addEventListener("storage", storageEventHandler);
  return () => {
    // Remove the handler when the component unmounts
    window.removeEventListener("storage", storageEventHandler);
  };
};
