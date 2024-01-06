import React, {useRef} from 'react';
export default class PlayerReference {

    refVideo = useRef(null);

    static myInstance = null;
    /**
     * @returns {PlayerReference}
     */
    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new PlayerReference();            
        }
        return this.myInstance;
    }

    getRefVideo() {
        return this.refVideo;
    }

    setRefVideo(obj) {
        this.refVideo = obj;
    }
}