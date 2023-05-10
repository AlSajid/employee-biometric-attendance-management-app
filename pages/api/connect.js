import ZKLib from './node_zklib/zklib.js';

export default async function connect(ips) {
    const connected = []

    for (let index = 0; index < ips.length; index++) {
        const ip = ips[index];

        var zkInstance = new ZKLib(ip, 4370, 1000, 4000, 0);

        try {
            const socket = await zkInstance.createSocket()
            if (socket == "success") {
                connected.push(ip)
            }
        }
        catch (e) {
            // console.log("Connection error", e);
        }
    }

    return { connected, zkInstance };
}

