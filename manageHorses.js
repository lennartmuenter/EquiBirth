import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageManager {
    data = [];
    template = [];
    static instance;

    static getInstance() {
        if (!this.instance) {
            this.instance = new StorageManager()
        }

        return this.instance
    }

    async init() {
        try {
            let response = await AsyncStorage.getItem('horseApp');
            if (response === null || response.length === 0) {
                response = this.template
            }
            let dataR = JSON.parse(response)
            
            dataR.sort((a,b) => a.name.localeCompare(b.name))

            this.data = dataR

            return { loadingState: false, errorState: null }
        } catch (err) {
            return { loadingState: false, errorState: err }
        }
    }

    async addHorse(horse) {
        horse.id = this.data.length;
        this.data.push(horse)
        await this.save()
    }

    async deleteHorse(horse) {
        this.data = this.data.filter(el => el.id != horse.id)
        await this.save()
    }

    async saveHorse(horse) {
        this.data[this.data.findIndex(el => el.id == horse.id)] = horse
        await this.save()
    }

    async reset() {
        this.data = this.template
        await this.save()
    }

    async save() {
        await AsyncStorage.setItem('horseApp', JSON.stringify(this.data))
        window.location.reload();
    }
}