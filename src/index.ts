import axios from 'axios';
import { writeFile } from 'fs/promises';

const ProxyScrape = class {
    constructor() {
        this.initialize();
    }
    async initialize() {
        try {
            const proxyData = await this.getProxies();
            if (proxyData) {
                await writeFile('proxies.txt', proxyData);
                console.log('Proxies successfully written to proxies.txt');
            } else {
                console.log('No proxy data was retrieved.');
            }
        } catch (error) {
            console.error('Error initializing ProxyScrape:', error);
        }
    }
    async getProxies() {
        try {
            const response = await axios.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all');
            if (!response) {
                console.error('Failed to fetch proxies: No data received');
                return false;
            }
            const data = response.data;
            const proxies = data.split('\n').map((line: string) => line.replace('\r', '')).filter(Boolean).join('\n');
            return proxies;
        } catch (error) {
            console.error('Error fetching proxies:', error);
            return false;
        }
    }
}

new ProxyScrape();