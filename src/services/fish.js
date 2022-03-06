const SteinStore = require("stein-js-client");

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

export const getData = async (limit = 0) => {
    try {
        const data = await store.read('list', { limit: limit })
        return data
    } catch (error) {
        throw error
    }
}