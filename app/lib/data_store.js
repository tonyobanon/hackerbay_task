'use strict';
const errors = require('../errors');

/**
 An in-memory data store, that is used to store documents. This tries to mock a NoSQL key value store
 **/

const DELIM = '___$$';

class DataStore {

    /**
     *
     * @constructor
     */
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.store = DataStore.kvStore;
    }

    /**
     * Simply stores a value
     * @param bucket The bucket to store this entry
     * @param key The key
     * @param value The value to associate the key with
     */
    save(bucket, key, value) {

        if (!this.__validate(bucket, key)) {
            throw errors.InvalidStringFormat(`A bucket and key should not contain ${DELIM}`);
        }

        return this.store.put(`${bucket}${DELIM}${key}`, value);
    }

    /**
     * Updates a value
     * @param bucket The bucket to store this entry
     * @param key The key
     * @param value The value to associate the key with
     */
    update(bucket, key, value) {

        var existingValue = this.get(bucket, key);

        if (existingValue instanceof String) {

            return this.save(bucket, key, value);
        } else if (existingValue instanceof Object) {

            //value is a JSON Object, add attributes to existingValue
            for (let k in value) {
                existingValue[k] = value[k];
            }

            return this.save(bucket, key, existingValue);
        }
    }

    /**
     * Get the value set in store
     * @param bucket The bucket from which this entry should be retrieved from
     * @param key The key
     */
    get(bucket, key) {
        return this.store.get(`${bucket}${DELIM}${key}`);
    }

    /**
     * Delete the value set in the store
     * @param bucket The bucket from which this entry should be removed from
     * @param key
     */
    remove(bucket, key) {
        return this.store.del(`${bucket}${DELIM}${key}`);
    }

    /**
     * Clears the database
     */
    clear() {
        this.store.clear();
    }

    /**
     * Delete the value set in the store
     * @param bucket The bucket whose keys we want to list
     */
    listKeys(bucket) {

        let allKeys = this.store.keys();
        let bucketKeys = [];

        for (let i in allKeys) {

            if (allKeys[i].startsWith(`${bucket}${DELIM}`)) {
                bucketKeys.push(allKeys[i]);
            }
        }

        return bucketKeys;
    }

    /**
     * This helper function verifies that the bucket and key names don't contain the delimiter
     * */
    __validate(bucket, key) {
        return (!bucket.includes(DELIM)) && (!key.toString().includes(DELIM));
    }

}

DataStore.kvStore = require('memory-cache');
module.exports = DataStore;
