const SteinStore = require("stein-js-client");

const store = new SteinStore(
    "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

export const getData = async () => {
    try {
        const data = await store.read('list')
        return data
    } catch (error) {
        throw error
    }
}

export const createData = async (payload) => {
    try {
        const data = await store.append('list', [payload])
        return data
    } catch (error) {
        throw error
    }
}

export const updateData = async (payload) => {
    try {
        const data = await store.edit('list', {
            search: { uuid: payload.uuid },
            set: { ...payload }
        })
        return data
    } catch (error) {
        throw error
    }
}

export const deleteData = async (payload) => {
    try {
        const data = await store.delete('list', {
            search: { uuid: payload.uuid }
        })
        return data
    } catch (error) {
        throw error
    }
}

export const getDataArea = async () => {
    try {
        const data = await store.read('option_area')
        return data
    } catch (error) {
        throw error
    }
}

export const getDataSize = async () => {
    try {
        const data = await store.read('option_size')
        return data
    } catch (error) {
        throw error
    }
}