class StorageService{
  storage:Storage;

  constructor(store:Storage) {
    this.storage = store;
  }

  setItem(key:string, data:string){
    return this.storage.setItem(key, data)
  }

  deleteItem(key:string){
    return this.storage.removeItem(key);
  }

  getItem(key:string): string | null{
    return this.storage.getItem(key)
  }

}

const StorageServiceInstance = new StorageService(localStorage);

export {StorageServiceInstance}

