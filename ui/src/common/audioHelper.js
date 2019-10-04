import axios from 'axios';
class AudioHelper {
    constructor(ctx) {
        this.ctx = ctx
    }
    async load(path, token) {
        const options = {responseType: 'arraybuffer', headers: {authorization: `bearer ${token}`, contentType: 'audio/wav'}}
        const res = await axios.get(path, options).catch(err => {
            console.log(err);
            throw err;
        });
        return await this.ctx.decodeAudioData(res.data).catch(err => {
            console.log(err);
        });
    }

    createSource(buffer) {
        const src = new AudioBufferSourceNode(this.ctx, {buffer: buffer});
        src.connect(this.ctx.destination);
        return src;
    }

    toArrayBuffer(buffer) {
        var arrayBuffer = new ArrayBuffer(buffer.length);
        var view = new Uint8Array(arrayBuffer);
        for (var i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
        }
        return arrayBuffer;
    }
}

export default AudioHelper;